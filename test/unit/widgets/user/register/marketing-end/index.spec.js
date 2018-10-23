describe('widgets/user/register/marketing-end/index', function () {
  beforeEach(function () {
    const View = proxyquire('widgets/user/register/marketing-end/index.js', {});
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

  describe('#templateContext', function () {
    describe('#if marketing is not opt-in', function () {
      it('should return the marketing value as false', function () {
        expect(this.view.templateContext().marketing).to.eql(false);
      });

      it('should return the regButtonLabel as `register_marketing_opt_in`', function () {
        expect(this.view.templateContext().regButtonLabel).to.eql('register_marketing_opt_in');
      });
    });

    describe('if marketing is opt-in', function () {
      beforeEach(function () {
        this.model.set('marketing', 'opt-in');
      });

      it('should return the marketing value as true', function () {
        expect(this.view.templateContext().marketing).to.eql(true);
      });

      it('should return the regButtonLabel as `register`', function () {
        expect(this.view.templateContext().regButtonLabel).to.eql('register');
      });
    });
  });
});
