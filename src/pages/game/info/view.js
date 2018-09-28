import View from '@bedegaming/bolt/src/pages/game/info/view.js';
import PlayButtons from '@bedegaming/bolt/src/widgets/game/play-buttons/view.js';
import InfoView from '@bedegaming/bolt/src/widgets/game/info/view.js';
import RelatedView from '@bedegaming/bolt/src/widgets/game/related/view.js';
import GameOverview from '@bedegaming/bolt/src/widgets/game/overview/view.js';

export default View.extend({

  regions: {
    overview: '.game-overview-region',
    playButtons: '.play-buttons-region',
    banner: 'game-banner',
    info: 'game-info',
    related: 'game-related'
  },

  onAttach() {
    const model = this.model;

    if (!this.hasPromo) this.showChildView('playButtons', new PlayButtons({ model }), { replaceElement: true });

    this.showChildView('info', new InfoView({
      model: this.currentGame,
      related: this.relatedGames
    }), { replaceElement: true });

    this.showChildView('overview', new GameOverview({ model }), { replaceElement: true });

    this.showChildView('banner', this.getBannerComponent(), { replaceElement: true });

    this.showChildView('related', new RelatedView({ model }), { replaceElement: true });
  }
});
