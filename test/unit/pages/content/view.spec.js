describe('content page view', function () {
  beforeEach(function () {
    this.ContentView = stub();
    this.TitleView = stub();
    this.AuthService = {
      request: stub().resolves(),
      player: stub().returns(true)
    };
    this.UserService = {
      request: stub().resolves(),
      user: new Orchestra.Model({
        email: 'testmail@bedegaming.com',
        username: 'testuser1',
        firstname: 'Name',
        lastname: 'Lastname',
        registrationDate: 1234566771,
        kycStatus: 'OKEYDOKE',
        idStatus: 'ok'
      })
    };

    this.View = proxyquire('pages/content/view.js', {
      'widgets/content/view.js': this.TitleView,
      'widgets/content/view.js': this.ContentView,
      'services/auth/index.js': this.AuthService,
      'services/user/index.js': this.UserService
    });

    this.view = new this.View();
  });

  describe('init', function () {
    it('should have a title region linked to title-header tag', function () {
      expect(this.View.prototype.regions).to.be.eql({ title: 'title-header' });
    });

    it('should have a section region linked to content tag', function () {
      expect(this.View.prototype.regions).to.be.eql({ section: 'content' });
    });
  });
});
