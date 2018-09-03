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
          className: 'control-group',
          isContainer: true,
          children: [
            {
              displayName: 'search',
              className: 'search-item',
              linkClassName: 'search',
              isButton: true,
              icon: {
                id: 'search',
                viewbox: '0 0 32 32'
              }
            }
          ]
        },
        {
          displayName: 'showUsername',
          route: '/account/profile',
          linkClassName: 'account-link',
          className: 'account',
          icon: {
            id: 'arrow',
            viewbox: '0 0 15 8'
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
        },
        {
          className: 'control-group',
          isContainer: true,
          children: [
            {
              displayName: 'search',
              className: 'search-item',
              linkClassName: 'search',
              isButton: true,
              icon: {
                id: 'search',
                viewbox: '0 0 32 32'
              }
            }
          ]
        },
        {
          isContainer: true,
          children: [
            {
              displayName: 'log_in',
              linkClassName: 'login-modal desktop-only',
              isButton: true,
              userAction: 'deposit'
            },
            {
              displayName: 'join_now',
              linkClassName: 'register desktop-only',
              isButton: true,
              userAction: 'register'
            }
          ]
        }
      ];
      expect(this.navItems()).to.eql(expected);
    });
  });
});
