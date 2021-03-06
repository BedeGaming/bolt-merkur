describe('widgets/user/register/register-end/index', function () {
  beforeEach(function () {
    const View = proxyquire('widgets/user/register/register-end/index.js', {});
    this.model = new Orchestra.Model();
    this.view = new View({
      model: this.model
    });
  });

  describe('#tagName', function () {
    it('should set the tagName', function () {
      expect(this.view.tagName).to.eql('form');
    });
  });

  describe('UI Cache', function () {
    it('should create the ui hash', function () {
      expect(this.view.ui.terms).to.eql('.terms');
      expect(this.view.ui.privacy).to.eql('.privacy');
    });
  });

  describe('#templateContext', function () {
    it('should return isChecked if termsAgreement is set', function () {
      this.view.model = new Orchestra.Model({ termsAgreement: true });
      const result = this.view.templateContext();
      expect(result.isChecked).to.eql('checked');
    });

    it('should not return isChecked if termsAgreement is not set', function () {
      this.view.model = new Orchestra.Model({ termsAgreement: false });
      const result = this.view.templateContext();
      expect(result.isChecked).to.not.eql('checked');
    });
  });
});
