import View from '@bedegaming/bolt/src/pages/account/view.js';

export default View.extend({
  setupNavigation() {
    const navRoutes = [
      {
        displayName: 'my_profile',
        route: '/account/profile'
      },
      {
        displayName: 'inbox',
        route: '/account/inbox',
        className: 'inbox-tab inbox-badge'
      },
      {
        displayName: 'history',
        route: '/account/history'
      },
      {
        displayName: 'withdraw',
        route: '/withdraw?direct=false',
        navigate: false
      }
    ];

    if (window.config.features.playsafe) {
      navRoutes.push({
        displayName: 'play_safe_title',
        route: '/account/play-safe'
      });
    }

    return navRoutes;
  }
});
