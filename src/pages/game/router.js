import { history } from 'orchestra';
import Router from '@bedegaming/bolt/src/pages/game/router.js';
import GamesRoute from '@bedegaming/bolt/src/pages/game/games/route.js';
import GamesHelpers from 'utilities/games/helpers.js';

export default Router.extend({
  routes: {
    'game/not-found': 'notFound',
    'game/:game': 'info',
    'game/:game/play': 'play',
    'game/:game/demo': 'demo',
    'games(?category=:urlCat)': 'games',
    'games/:category(/)?category=:urlCat': 'redirectCategory',
    'games/:category': 'gamesCategory',
    'home/:category': 'homeCategory',
    'games-a-to-z': 'gamesAZ'
  },

  games(activeCategory = false) {
    const category = window.config.games.defaultGamesPageCategory || 'featured';
    return this.showGames(category, activeCategory, true, {
      categories: window.config.games.categoriesGames,
      filterCurrentRoute: true,
      separate: false,
      showSlider: true
    });
  },

  gamesCategory(category, activeCategory = false) {
    return this.showCategory(
      category,
      activeCategory,
      window.config.games.categoriesGames
    );
  },

  homeCategory(category, activeCategory = false) {
    return this.showCategory(
      category,
      activeCategory,
      window.config.games.categoriesHome
    );
  },

  showCategory(category, activeCategory, categories) {
    const hasCategory = GamesHelpers.isCategoryAvailable(category, categories);

    if (hasCategory) {
      return this.showGames(category, activeCategory, false, {
        categories,
        showSlider: true,
        separate: false,
        filterCurrentRoute: true
      });
    }

    return history.navigate('/lost', {
      trigger: true,
      replace: true
    });
  },

  showGames(
    category,
    activeCategory = false,
    isRoot = false,
    pageConfig = { showSlider: true, separate: false }
  ) {
    this.displayGamesLayout();

    return new GamesRoute(
      {
        container: this.contentContainer,
        category,
        activeCategory,
        pageConfig,
        categoryFilter: pageConfig.categoryFilter
      },
      isRoot
    );
  }
});
