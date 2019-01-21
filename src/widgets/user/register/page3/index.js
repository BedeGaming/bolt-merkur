import { View, Translator, _ } from 'orchestra';
import { isElementVisible } from 'utilities/dom.js';
import AddressService from 'services/address/index.js';
import template from 'widgets/user/register/page3/template.hbs';
import AddressList from 'widgets/user/register/page3/address-list';
import countryHelper from 'utilities/countryHelper.js';

export default View.extend({
  tagName: 'form',

  validationName: 'register-address',

  attributes: {
    novalidate: true
  },

  template,

  initialize() {
    this.triggerSearch = _.debounce(_.bind(this.addressSearch, this), 300);
  },

  ui: {
    country: 'select[name=countryCode]',
    fullAddress: '.full-address',
    addressLine1: 'input[name=addressLine1]',
    addressLine2: 'input[name=addressLine2]',
    addressLine2label: '.address-line2',
    town: 'input[name=town]',
    postcode: 'input[name=postCode]',
    addressSearch: 'input[name=addressSearch]',
    addressSearchContainer: '.address-search',
    inputBtn: '.switch-input-mode'
  },

  regions: {
    addressList: '.address-list'
  },

  childViewEvents: {
    'select:address': 'selectAddress'
  },

  events: {
    'keyup @ui.addressSearch': 'onEnterAddress',
    'click @ui.inputBtn': 'toggleFullAddress',
    'change select[name=countryCode]': 'changeCountry'
  },

  onDomRefresh() {
    const expanded = this.model.get('expanded');
    if (expanded) this.showFilledAddress();
  },

  changeCountry(e) {
    this.onEnterAddress(e);
    this.validatePostcode();
  },

  validatePostcode() {
    this.model.set({ countryCode: this.ui.country.val() });
    if (this.ui.postcode.val().length)
      this.model.validate({ postCode: this.ui.postcode.val() });
  },

  templateContext() {
    const {
      marketing,
      regSuccess,
      telephoneEnabled
    } = window.config.registration;
    const countryConfig = countryHelper.getConfig();
    const registrationCountries = countryHelper.getRegCountries(countryConfig);
    const countries = registrationCountries.filter(
      country => !country.featured
    );
    let topCountries = null;

    if (registrationCountries.length) {
      topCountries = countryHelper.getFeaturedCountries(registrationCountries);
    }

    return {
      countries,
      marketing,
      regSuccess,
      telephoneEnabled,
      topCountries
    };
  },

  emptyAddress() {
    this.ui.addressLine1.val('');
    this.ui.addressLine2.val('');
    this.ui.town.val('');
    this.ui.postcode.val('');
    this.ui.addressSearch.val('');
    this.model.unset('addressLine1');
    this.model.unset('addressLine2');
    this.model.unset('town');
    this.model.unset('postCode');
    this.ui.addressLine2label.show();
  },

  toggleRegions() {
    this.getRegion('addressList').reset();
    this.ui.fullAddress.toggle();
    this.ui.addressSearchContainer.toggle();
  },

  showFilledAddress() {
    this.toggleRegions();
    this.setButtonText();
  },

  toggleFullAddress() {
    const expanded = this.model.get('expanded');

    if (window.config.features.isolatedRoutes) window.scrollTo(0, 0);
    if (expanded) this.emptyAddress();

    this.toggleRegions();
    this.setButtonText();
  },

  setButtonText() {
    const showFullAddress = this.ui.fullAddress.filter(isElementVisible).length;
    this.model.set('expanded', showFullAddress);

    let buttonText = Translator.translate('enter_manually');
    if (showFullAddress) {
      buttonText = Translator.translate('show_address_search');
    }

    this.ui.inputBtn.html(buttonText);
  },

  populateFullAddress(fullAddress) {
    const address = fullAddress.get('address');
    const addressParts = address.split(':');

    this.toggleFullAddress();

    const building = addressParts[1] || addressParts[0];
    this.ui.addressLine1.val(`${building} ${addressParts[2]}`);
    this.ui.addressLine2.val(addressParts[3]);
    this.ui.town.val(addressParts[4]);
    this.ui.postcode.val(addressParts[6]);

    if (!addressParts[3]) {
      this.ui.addressLine2label.css('display', 'none');
    } else {
      this.ui.addressLine2label.css('display', 'block');
    }

    this.model.set({
      addressLine1: this.ui.addressLine1.val(),
      addressLine2: this.ui.addressLine2.val(),
      town: this.ui.town.val(),
      postCode: this.ui.postcode.val()
    });

    this.ui.addressLine1.parent().removeClass('invalid valid');
    this.ui.town.parent().removeClass('invalid valid');
    this.ui.postcode.parent().removeClass('invalid valid');
  },

  updateAddressList(collection, clicked) {
    if (clicked && collection.length === 1) {
      this.selectAddress(collection.at(0));
      return;
    }

    if (!this.getRegion('addressList').currentView) {
      this.showChildView(
        'addressList',
        new AddressList({
          collection
        }),
        { replaceElement: true }
      );
    } else {
      const addressList = this.getRegion('addressList').currentView.collection;
      addressList.reset(collection.toJSON());
    }
  },

  selectAddress(address) {
    const addressParts = address.get('address').split(':');

    if (addressParts.length > 1) {
      this.populateFullAddress(address);
    } else {
      this.addressSearch(this.formatAddress(address), true, true);
    }
  },

  formatAddress(address) {
    let formatted = address.get('address').replace(/ /g, '+');
    formatted = formatted.replace(/,/g, '');

    return formatted;
  },

  addressSearch(address, clicked, format = false) {
    const searchTerm = address || this.ui.addressSearch.val();
    const country = this.$('select[name=countryCode]').val();

    if (!searchTerm) {
      return Promise.resolve();
    }

    return AddressService.request(
      'addresses',
      searchTerm,
      country,
      format
    ).then(addressList => {
      this.ui.addressSearch.parent().removeClass('waiting');
      this.updateAddressList(addressList, clicked);
    });
  },

  onEnterAddress(e) {
    const isFolded = this.ui.fullAddress.hasClass('folded');
    const ignoredKeys = [20, 16, 13];

    // if its the caps key or the shift key, ignore

    if (_.includes(ignoredKeys, e.keyCode) || !isFolded) {
      return Promise.resolve();
    }

    this.ui.addressSearch.parent().addClass('waiting');
    return this.triggerSearch();
  }
});
