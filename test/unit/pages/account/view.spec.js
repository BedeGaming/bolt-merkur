describe('user/account view', function () {
  beforeEach(function () {
    this.AccountView = Orchestra.View;

    this.View = proxyquire('pages/account/view.js', {
      '@bedegaming/bolt/src/pages/account/view.js': this.AccountView
    });

    this.view = new this.View();
  });

  describe('#setupNavigation', function () {
    it('should return the navigation', function () {
      const expected = [
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
          navigate: false,
          route: '/withdraw?direct=false'
        },
        {
          displayName: 'play_safe_title',
          route: '/account/play-safe'
        }
      ];

      const result = this.view.setupNavigation();
      expect(result).to.be.eql(expected);
    });
  });
});
