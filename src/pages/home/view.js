import View from '@bedegaming/bolt/src/pages/home/view.js';
import GamesView from 'widgets/game/view.js';

export default View.extend({
  addGames() {
    const gameCategories = [...this.categories];

    if (window.config.games.appendAllCategory) {
      this.appendAllCategory(gameCategories);
    }

    this.showChildView(
      'featured',
      new GamesView({
        collection: this.collection,
        category: this.category,
        showExtraInfo: window.config.features.homeListExtraData,
        categories: gameCategories,
        tags: this.tags,
        superFilter:
          window.config.features.superFilter &&
          window.config.games.superFilterOnHome,
        categoryFilter: true,
        filterCurrentRoute: true
      }),
      { replaceElement: true }
    );
  }
});
