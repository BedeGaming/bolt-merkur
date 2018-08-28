if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // TODO: Show toast notification to indicate a refresh to get new update
    // navigator.serviceWorker.register('./service-worker.js').then(reg => {
    //   reg.onupdatefound = () => {
    //     const installingWorker = reg.installing;
    //
    //     installingWorker.onstatechange = () => {
    //       switch (installingWorker.state) {
    //         case 'installed':
    //           if (navigator.serviceWorker.controller) {
    //             // insert notification here
    //           }
    //           break;
    //       }
    //     };
    //   };
    // });

    navigator.serviceWorker.register('./service-worker.js').catch(e => {
      console.error('Error during service worker registration:', e); // eslint-disable-line no-console
    });
  });
}
