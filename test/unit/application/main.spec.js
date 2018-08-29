describe('index', function () {
  beforeEach(function () {
    this.Application = stub();
    this.index = proxyquire('../../main', {
      'application/app.js': this.Application
    });
  });

  describe('#startup', function () {
    it('should create the application', function () {
      expect(this.Application).to.have.been.calledWithNew();
    });
  });
});
