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
    }
  ];

  if (AuthService.player()) {
    navItems.push(
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
  }

  return navItems;
};


export default nav;
