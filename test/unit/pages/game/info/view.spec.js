describe('game info view', function () {
  beforeEach(function () {
    this.BannerView = stub();
    this.InfoView = stub();
    this.RelatedView = stub();
    this.PlayButtons = stub();
    this.GameOverview = stub();
    const View = proxyquire('pages/game/info/view.js', {
      '@bedegaming/bolt/src/widgets/game/banner/view.js': this.BannerView,
      '@bedegaming/bolt/src/widgets/game/info/view.js': this.InfoView,
      '@bedegaming/bolt/src/widgets/game/overview/view.js': this.GameOverview,
      '@bedegaming/bolt/src/widgets/game/play-buttons/view.js': this.PlayButtons,
      '@bedegaming/bolt/src/widgets/game/related/view.js': this.RelatedView
    });
    this.view = new View();
  });

  describe('regions', function () {
    it('should create the regions', function () {
      expect(this.view.regions).to.eql({
        banner: 'game-banner',
        info: 'game-info',
        overview: '.game-overview-region',
        playButtons: '.play-buttons-region',
        related: 'game-related'
      });
    });
  });
});
