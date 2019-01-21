import { View, Translator } from 'orchestra';
import template from 'widgets/user/register/register-end/template.hbs';

export default View.extend({
  template,

  tagName: 'form',

  ui: {
    terms: '.terms',
    privacy: '.privacy'
  },

  getPrivacyHref() {
    return '/privacy-policy';
  },

  getTermsHref() {
    return '/terms-and-conditions';
  },

  getPrivacyLink(text) {
    const privacyHref = this.getPrivacyHref();
    return `<a href="${privacyHref}" target="_blank">${text}</a>`;
  },

  getTermsLink(text) {
    const termsHref = this.getTermsHref();
    return `<a href="${termsHref}" target="_blank">${text}</a>`;
  },

  templateContext() {
    const marketing = this.model.get('marketing') === 'opt-in';
    const regButtonLabel = marketing ? 'register' : 'register_marketing_opt_in';
    console.log('this is Bede Casino');
    const privacyLink = this.getPrivacyLink(
      Translator.translate('compliance_link_privacy')
    );
    const termsLink = this.getTermsLink(
      Translator.translate('compliance_link_terms')
    );
    let isChecked = '';

    if (this.model.get('termsAgreement')) {
      isChecked = 'checked';
    }

    return {
      marketing,
      regButtonLabel,
      isChecked,
      privacyLink,
      termsLink
    };
  }
});
