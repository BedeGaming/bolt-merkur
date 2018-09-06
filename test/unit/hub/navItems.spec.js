describe('navItems', function () {
  beforeEach(function () {
    this.AuthService = {
      player: stub().returns(123)
    };

    this.navItems = proxyquire('widgets/hub/navItems.js', {
      'services/auth/index.js': this.AuthService
    });
  });

  describe('when the user is authenticated', function () {
    it('should contain logout and profile links', function () {
      const expected = [
        {
          route: '/games',
          displayName: 'games'
        },
        {
          route: '/promotions',
          displayName: 'promotions'
        },
        {
          route: '/support',
          displayName: 'support',
          className: 'support'
        },
        {
          displayName: 'showUsername',
          route: '/account/profile',
          linkClassName: 'account-link',
          className: 'account',
          icon: {
            id: 'arrow-down',
            viewbox: '0 0 9 6'
          },
          children: [
            {
              route: '/account/profile',
              displayName: 'my_account'
            },
            {
              route: '/account/inbox',
              linkClassName: 'inbox-badge inbox-link',
              displayName: 'inbox'
            },
            {
              displayName: 'logout',
              userAction: 'logout'
            }
          ]
        },
        {
          route: '/account/inbox',
          linkClassName: 'inbox-badge inbox-link',
          icon: {
            id: 'inbox',
            viewbox: '0 0 29.4 20.6'
          },
          className: 'desktop-only inbox-container'
        }
      ];
      expect(this.navItems()).to.eql(expected);
    });
  });

  describe('when the user is not authenticated', function () {
    beforeEach(function () {
      this.AuthService = {
        player: stub().returns(false)
      };

      this.navItems = proxyquire('widgets/hub/navItems.js', {
        'services/auth/index.js': this.AuthService
      });
    });

    it('should not contain logout and profile links', function () {
      const expected = [
        {
          route: '/games',
          displayName: 'games'
        },
        {
          route: '/promotions',
          displayName: 'promotions'
        },
        {
          route: '/support',
          displayName: 'support',
          className: 'support'
        }
      ];
      expect(this.navItems()).to.eql(expected);
    });
  });
});
