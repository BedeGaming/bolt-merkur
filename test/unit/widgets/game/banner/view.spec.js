describe('game/banner view', function () {
  beforeEach(function () {
    this.AuthService = {
      player: stub().returns(1)
    };

    this.UserService = {
      request: stub()
    };

    this.GameService = {
      request: stub(),
      getImages: stub()
    };

    this.CommonView = stub();
    this.PlayButtons = stub();

    this.View = proxyquire('widgets/game/banner/view.js', {
      'widgets/game/banner/view.js': this.CommonView,
      'services/game/index.js': this.GameService,
      'services/user/index.js': this.UserService,
      'services/auth/index.js': this.AuthService,
      'widgets/game/play-buttons/view.js': this.PlayButtons
    });

    this.view = new this.View({
      model: new Orchestra.Model({ friendlyUrlName: 1 })
    });
  });

  it('tagName should be game-banner', function () {
    expect(this.View.prototype.tagName).to.eql('game-banner');
  });

  describe('#initialize', function () {
    it('should create a model property', function () {
      expect(this.view).to.have.property('model');
    });
  });

  describe('#onAttach', function () {
    beforeEach(function () {
      this.view.showChildView = stub();
      this.view.hasPromo = false;
    });
  });

  describe('#navigate', function () {
    beforeEach(function () {
      const target = document.createElement('a');
      target.setAttribute('href', '/home');

      this.event = { currentTarget: target, preventDefault: stub() };

      spy(Orchestra.history, 'navigate');

      this.view.navigate(this.event);
    });

    it('should preventDefault on the anchor tag', function () {
      expect(this.event.preventDefault).to.be.calledOnce();
    });
  });

  describe('#templateContext', function () {
    beforeEach(function () {
      window.config.games.promoted = {
        'medieval-money': {
          imgPath: '/assets/images/promos/landing-promo.jpg'
        }
      };
    });

    afterEach(function () {
      window.config.games.promoted = {};
      this.view.hasPromo = false;
    });

    it('should return the expected payload', function () {
      this.view = new this.View({
        model: new Orchestra.Model({
          displayName: 'Jungle Jackpots',
          isAvailableForDemoPlay: true,
          friendlyUrlName: 'medieval-money'
        }),
        hasPromo: true
      });

      const result = this.view.templateContext();
      const expected = {
        name: 'Jungle Jackpots',
        path: '/assets/images/promos/landing-promo.jpg',
        hasPromo: true
      };
      expect(result).to.eql(expected);
    });

    it('should return the expected payload', function () {
      this.view = new this.View({
        model: new Orchestra.Model({
          displayName: 'Jungle Jackpots',
          isAvailableForDemoPlay: false
        })
      });

      const result = this.view.templateContext();
      const expected = {
        name: 'Jungle Jackpots',
        path: '',
        hasPromo: undefined
      };
      expect(result).to.eql(expected);
    });

    it('should return the expected payload', function () {
      this.view = new this.View({
        model: new Orchestra.Model({
          displayName: 'Jungle Jackpots'
        })
      });

      const result = this.view.templateContext();
      const expected = {
        name: 'Jungle Jackpots',
        path: '',
        hasPromo: undefined
      };
      expect(result).to.eql(expected);
    });
  });
});
