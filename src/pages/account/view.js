import View from '@bedegaming/bolt/src/pages/account/view.js';

export default View.extend({
  setupNavigation() {
    return [
      { displayName: 'my_profile', route: '/account/profile' },
      {
        displayName: 'inbox',
        route: '/account/inbox',
        className: 'inbox-tab inbox-badge'
      },
      { displayName: 'history', route: '/account/history' },
      {
        displayName: 'withdraw',
        route: '/withdraw?direct=false',
        navigate: false
      },
      { displayName: 'play_safe_title', route: '/account/play-safe' },
    ];
  }
});
