import AuthService from 'services/auth/index.js';

const nav = () => {
  const navItems = [
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
      isContainer: true,
      children: [
        {
          displayName: 'log_in',
          linkClassName: 'btn login-modal desktop-only',
          isButton: true,
          userAction: 'deposit'
        },
        {
          displayName: 'join_now',
          linkClassName: 'btn btn-primary register desktop-only',
          isButton: true,
          userAction: 'register'
        }
      ]
    }
  ];

  if (AuthService.player()) {
    const authNavItems = navItems.slice(0, 4);

    authNavItems.push(
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
    );

    return authNavItems;
  }

  return navItems;
};


export default nav;
