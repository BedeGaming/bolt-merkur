import View from '@bedegaming/bolt/src/widgets/balance/view';
import Cookies from 'cookies-js';
import template from 'widgets/balance/template.hbs';

export default View.extend({
  tagName: 'total-balance',

  template,

  events: {
    'click @ui.refresh': 'refresh',
    'click @ui.toggleWallets': 'toggleWallets',
    'click @ui.hideBalance': 'toggleHideBalance'
  },

  initialize() {
    const secretBalance = Cookies.get('isBalanceSecret') || false;
    this.model.set('isBalanceSecret', (secretBalance === 'true'));
  },

  ui: {
    refresh: '.refresh',
    toggleWallets: '.balance-list',
    balanceList: '.balance-list',
    hideBalance: '.hide-balance',
    mainBalance: 'main-balance'
  },

  toggleHideBalance() {
    if (this.model.get('isBalanceOpen')) {
      this.toggleWallets();
    }

    const isSecret = this.model.get('isBalanceSecret');
    Cookies.set('isBalanceSecret', !isSecret);
    this.model.set('isBalanceSecret', !isSecret);
    this.toggleSecretClass();

    if (isSecret) this.refresh();
  },

  toggleSecretClass() {
    const secret = this.model.get('isBalanceSecret');
    if (secret) {
      this.ui.toggleWallets.addClass('secret');
    } else {
      this.ui.toggleWallets.removeClass('secret');
    }
  },

  onDomRefresh() {
    const isSecret = this.model.get('isBalanceSecret');
    this.$('.toggle-wallets').prop('disabled', isSecret);
    this.toggleSecretClass();
  },

  toggleWallets(e) {
    const target = e && e.target.className === ('hide-balance');
    const secretBalance = this.model.get('isBalanceSecret');
    if (target || secretBalance) {
      return;
    }

    const isBalanceOpen = this.model.get('isBalanceOpen');
    this.model.set('isBalanceOpen', !isBalanceOpen);
    if (!isBalanceOpen) this.refresh();
  }
});
