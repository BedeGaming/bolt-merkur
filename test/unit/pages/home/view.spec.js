describe('view', function () {
  beforeEach(function () {
    this.HomeView = Orchestra.View;
    this.GamesView = stub();

    this.View = proxyquire('pages/home/view.js', {
      '@bedegaming/bolt/src/pages/home/view.js': this.HomeView,
      'widgets/game/view.js': this.GamesView
    });

    this.view = new this.View();
  });

  describe('#addGames', function () {
    beforeEach('', function () {
      this.view.categories = ['categories'];
      this.view.appendAllCategory = stub();
      this.view.showChildView = stub();
      this.appendAllCategoryTemp = window.config.games.appendAllCategory;
      this.superFilterTemp = window.config.features.superFilter;
      this.superFilterOnHomeTemp = window.config.games.superFilterOnHome;
    });

    afterEach(function () {
      window.config.games.appendAllCategory = this.appendAllCategoryTemp;
    });

    describe('When the `appendAllCategory` option is truthy', function () {
      beforeEach(function () {
        window.config.games.appendAllCategory = true;
        this.view.addGames();
      });

      it('Should call `appendAllCategory` correctly', function () {
        expect(this.view.appendAllCategory).to.be.calledWith(['categories']);
      });
    });

    describe('When the `appendAllCategory` option is falsey', function () {
      beforeEach(function () {
        window.config.games.appendAllCategory = false;
        this.view.addGames();
      });

      it('Should call `appendAllCategory` correctly', function () {
        expect(this.view.appendAllCategory).to.not.be.called();
      });
    });

    describe('When the `superFilter` feature and `superFilterOnHome` option are truthy', function () {
      beforeEach(function () {
        window.config.features.superFilter = true;
        window.config.games.superFilterOnHome = true;

        this.GamesView.withArgs({
          collection: this.view.collection,
          category: this.view.category,
          showExtraInfo: true,
          categories: ['categories'],
          tags: this.view.tags,
          superFilter: true,
          categoryFilter: true,
          filterCurrentRoute: true
        }).returns({ new: 'gamesView' });

        this.view.addGames();
      });

      it('Should call `showChildView` correctly', function () {
        expect(this.view.showChildView).to.not.be.calledWith({ new: 'gamesView' }, { replaceElement: true });
      });
    });

    describe('When the `superFilter` feature is true and `superFilterOnHome` option are false', function () {
      beforeEach(function () {
        window.config.features.superFilter = true;
        window.config.games.superFilterOnHome = false;

        this.GamesView.withArgs({
          collection: this.view.collection,
          category: this.view.category,
          showExtraInfo: true,
          categories: ['categories'],
          tags: this.view.tags,
          superFilter: false,
          categoryFilter: true,
          filterCurrentRoute: true
        }).returns({ new: 'gamesView' });

        this.view.addGames();
      });

      it('Should call `showChildView` correctly', function () {
        expect(this.view.showChildView).to.not.be.calledWith({ new: 'gamesView' }, { replaceElement: true });
      });
    });
  });
});
