describe('hub view', function () {
  beforeEach(function () {
    this.MainView = Orchestra.View;
    this.model = new Orchestra.Model();

    const View = proxyquire('widgets/hub/view.js', {
      '@bedegaming/bolt/src/widgets/hub/view.js': this.MainView
    });

    this.view = new View({
      model: this.model
    });
  });

  describe('#templateContext', function () {
    beforeEach(function () {
      window.config.app = {
        locale: 'en-GB'
      };
      window.config.features.langSwitch = false;
    });

    it('should return what is expected', function () {
      expect(this.view.templateContext()).to.eql({
        langSwitch: false,
        currLang: 'en-GB'
      });
    });
  });

  describe('#switchLanguage', function () {
    beforeEach(function () {
      window.config.app = {
        locale: 'en-GB'
      };
      stub(this.view, 'render');
    });

    it('should call render', function () {
      this.view.switchLanguage();
      expect(this.view.render).to.be.called();
    });

    it('should change locale to zh-CN', function () {
      this.view.switchLanguage();
      expect(window.config.app.locale).to.eql('zh-CN');
    });

    it('should change locale to en-GB', function () {
      window.config.app.locale = 'zh-CN';
      this.view.switchLanguage();
      expect(window.config.app.locale).to.eql('en-GB');
    });
  });
});
