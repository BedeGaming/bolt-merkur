import GameService from 'services/game/index.js';
import ContextService from 'services/context/index.js';
import HubService from 'services/hub/index.js';
import Cookies from 'utilities/cookies/index.js';
import RouterHelpers from 'utilities/router/helpers.js';
import { Model, history } from 'orchestra';
import ModalService from 'utilities/modal/index.js';

export default {
  playClickHandler(e, model, disableCategoryNavigate) {
    e.preventDefault();
    const customGameSearch = window.config.features.customGameSearch;
    const gameAuthMobilePreview = window.config.features.gameAuthMobilePreview;
    const channel = ContextService.getChannel();
    const authed = ContextService.isAuthenticated();
    const isMobilePreview = authed && gameAuthMobilePreview;
    this.setCategoryQueryString(model, disableCategoryNavigate);
    const resolve = customGameSearch ? ModalService.request('closeDialog', { animated: true }) : Promise.resolve();

    return resolve
    .then(() => {
      if (channel === 'mobile' && isMobilePreview || !authed) {
        GameService.request('preview', new Model(model));
        HubService.request('closeMobileMenu');
      } else {
        GameService.request('launch', new Model(model));
      }
    });
  },

  fullItemHandler(e, model, disableCategoryNavigate) {
    e.preventDefault();
    const gamesContainer = document.getElementsByTagName('games-container');
    const hasGamesContainer = gamesContainer.length;
    const listView = hasGamesContainer && gamesContainer[0].classList.contains('list-style');
    const targetClasses = e.target.classList;
    const excludedClasses = ['info', 'more', 'display-name'];
    const isExcludedClass = !!excludedClasses.find(item => targetClasses.contains(item));

    if (listView && !isExcludedClass) {
      this.playClickHandler(e, model, disableCategoryNavigate);
    }
  },

  setCategoryQueryString(model, disableCategoryNavigate) {
    const urlLocation = this.getLocationHref();
    const url = urlLocation.href;
    const disableCatNav = !!(disableCategoryNavigate);
    const onBlacklistedPage = url.includes('/game') || url.includes('?category=');
    const setQuery = !(disableCatNav || onBlacklistedPage);
    const urlCat = model.categories.currentCategory;
    const path = urlLocation.pathname === '/' ? '' : urlLocation.pathname;
    let urlCookie = `${path}?category=${urlCat}`;
    const locale = RouterHelpers.getLocale() ? RouterHelpers.getLocale().name : '';

    if (locale) {
      urlCookie = urlCookie.split(locale)[1];
    }

    Cookies.setItem('previousCategory', urlCookie);

    // If you're on a game page or category page, you should not append query string
    if (setQuery && urlCat) {
      history.navigate(`?category=${urlCat}`, { trigger: false, replace: true });
    }
  },

  getLocationHref() {
    return window.location;
  }
};
