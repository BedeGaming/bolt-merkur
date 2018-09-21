describe('widgets/user/register/marketing-opt/index', function () {
  beforeEach(function () {
    const View = proxyquire('widgets/user/register/marketing-opt/index.js', {});
    this.view = new View();
  });

  describe('#tagName', function () {
    it('should set the tagName', function () {
      expect(this.view.tagName).to.eql('form');
    });
  });

  describe('#validationName', function () {
    it('should set the validationName', function () {
      expect(this.view.validationName).to.eql('register-marketing');
    });
  });

  describe('#attributes', function () {
    it('should set the attributes', function () {
      expect(this.view.attributes.novalidate).to.eql(true);
    });
  });

  describe('#templateContext', function () {
    it('Should return the siteName', function () {
      expect(this.view.templateContext().siteName).to.eql('Bede Casino');
    });
  });
});
