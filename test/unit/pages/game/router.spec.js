describe('router', function () {
  beforeEach(function () {
    this.RouterStub = Orchestra.Router;
    this.GamesHelpers = {
      isCategoryAvailable: stub()
    };
    this.RouteStub = stub();
    this.Router = proxyquire('pages/game/router.js', {
      '@bedegaming/bolt/src/pages/game/router.js': this.RouterStub,
      '@bedegaming/bolt/src/pages/game/games/route.js': this.RouteStub,
      'utilities/games/helpers.js': this.GamesHelpers
    });
    this.router = new this.Router();
    this.router.displayGamesLayout = stub();
  });

  it('should have expected routes', function () {
    expect(this.router.routes).to.eql({
      'game/not-found': 'notFound',
      'game/:game': 'info',
      'game/:game/play': 'play',
      'game/:game/demo': 'demo',
      'games(?category=:urlCat)': 'games',
      'games/:category(/)?category=:urlCat': 'redirectCategory',
      'games/:category': 'gamesCategory',
      'home/:category': 'homeCategory',
      'games-a-to-z': 'gamesAZ'
    });
  });

  describe('#games', function () {
    beforeEach(function () {
      this.tempDefaultGamesPageCategory = window.config.games.defaultGamesPageCategory;
      this.tempCategoriesGames = window.config.games.categoriesGames;
      window.config.games.categoriesGames = 'testCategories';
      this.router.showGames = stub();
    });

    afterEach(function () {
      window.config.games.defaultGamesPageCategory = this.tempDefaultGamesPageCategory;
      window.config.games.categoriesGames = this.tempCategoriesGames;
    });

    describe('When the default category is set', function () {
      beforeEach(function () {
        window.config.games.defaultGamesPageCategory = 'test';
      });

      it('should call showGames with expected params', function () {
        this.router.games();
        expect(this.router.showGames).to.be.calledWith('test', false, true, {
          categories: 'testCategories',
          filterCurrentRoute: true,
          separate: false,
          showSlider: true
        });
      });
    });

    describe('When the default category is not set', function () {
      beforeEach(function () {
        window.config.games.defaultGamesPageCategory = false;
      });

      it('should call showGames with expected params', function () {
        this.router.games();
        expect(this.router.showGames).to.be.calledWith('featured', false, true, {
          categories: 'testCategories',
          filterCurrentRoute: true,
          separate: false,
          showSlider: true
        });
      });
    });

    describe('When the default category is not set and the activeCategory is passed in', function () {
      beforeEach(function () {
        window.config.games.defaultGamesPageCategory = false;
      });

      it('should call showGames with expected params', function () {
        this.router.games('activeCategory');
        expect(this.router.showGames).to.be.calledWith('featured', 'activeCategory', true, {
          categories: 'testCategories',
          filterCurrentRoute: true,
          separate: false,
          showSlider: true
        });
      });
    });
  });

  describe('#gamesCategory', function () {
    beforeEach(function () {
      this.tempCategoriesGames = window.config.games.categoriesGames;
      window.config.games.categoriesGames = 'test';
      this.router.showCategory = stub();
    });

    afterEach(function () {
      window.config.games.categoriesGames = this.tempCategoriesGames;
    });

    it('should call showCategory correctly when called with one arg', function () {
      this.router.gamesCategory('testCategory');
      expect(this.router.showCategory).to.be.calledWith('testCategory', false, 'test');
    });

    it('should call showCategory correctly when called with two args', function () {
      this.router.gamesCategory('testCategory', 'activeCategory');
      expect(this.router.showCategory).to.be.calledWith('testCategory', 'activeCategory', 'test');
    });
  });

  describe('#homeCategory', function () {
    beforeEach(function () {
      this.tempCategoriesHome = window.config.games.categoriesHome;
      window.config.games.categoriesHome = 'test';
      this.router.showCategory = stub();
    });

    afterEach(function () {
      window.config.games.categoriesHome = this.tempCategoriesHome;
    });

    it('should call showCategory correctly when called with one arg', function () {
      this.router.homeCategory('testCategory');
      expect(this.router.showCategory).to.be.calledWith('testCategory', false, 'test');
    });

    it('should call showCategory correctly when called with two args', function () {
      this.router.homeCategory('testCategory', 'activeCategory');
      expect(this.router.showCategory).to.be.calledWith('testCategory', 'activeCategory', 'test');
    });
  });

  describe('#showCategory', function () {
    beforeEach(function () {
      this.GamesHelpers.isCategoryAvailable.withArgs('test', 'categories').returns(true);

      spy(Orchestra.history, 'navigate');
      spy(this.router, 'showGames');
    });

    it('should call showGames with the category and activeCategory', function () {
      this.router.showCategory('test', false, 'categories');
      expect(this.router.showGames).to.have.been.calledWith('test', false, false, {
        categories: 'categories',
        showSlider: true,
        separate: false,
        filterCurrentRoute: true
      });
    });

    it('should call showGames with the category and activeCategory', function () {
      this.router.showCategory('test', 'featured', 'categories');
      expect(this.router.showGames).to.have.been.calledWith('test', 'featured', false, {
        categories: 'categories',
        showSlider: true,
        separate: false,
        filterCurrentRoute: true
      });
    });

    it('should redirect to lost page if category does not exist', function () {
      this.router.showCategory('notfound', 'notfound');
      expect(Orchestra.history.navigate).to.be.called();
    });
  });

  describe('#showGames', function () {
    it('should call RouteStub', function () {
      this.router.showGames('category');
      expect(this.RouteStub).to.be.calledWithNew();
    });

    it('should call RouteStub', function () {
      this.router.showGames('category', 'something', true, {
        showImage: true,
        separate: true
      });
      expect(this.RouteStub).to.be.calledWithNew();
    });
  });
});
