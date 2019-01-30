describe('widgets/user/register/pages', function () {
  beforeEach(function () {
    this.Page1 = stub();
    this.Page2 = stub();
    this.Page3 = stub();
    this.MarketingOpt = stub();
    this.RegisterEnd = stub();
    this.RegSuccess = stub();

    window.config.registration.marketing = false;
    window.config.registration.regSuccess = false;

    this.pages = proxyquire('widgets/user/register/pages.js', {
      'widgets/user/register/page1': this.Page1,
      'widgets/user/register/page2': this.Page2,
      'widgets/user/register/page3': this.Page3,
      'widgets/user/register/marketing-opt': this.MarketingOpt,
      'widgets/user/register/register-end': this.RegisterEnd,
      'widgets/user/register/reg-success': this.RegSuccess
    });
  });

  describe('#pages', function () {
    it('should return the basic pages', function () {
      window.config.registration.marketing = false;
      expect(this.pages()).to.eql([
        this.Page1,
        this.Page2,
        this.Page3,
        this.RegisterEnd
      ]);
    });

    it('should return the marketing page too', function () {
      window.config.registration.marketing = true;
      expect(this.pages()).to.eql([
        this.Page1,
        this.Page2,
        this.Page3,
        this.MarketingOpt,
        this.RegisterEnd
      ]);
    });

    it('should return the registration success page', function () {
      window.config.registration.regSuccess = true;
      expect(this.pages()).to.eql([
        this.Page1,
        this.Page2,
        this.Page3,
        this.RegisterEnd,
        this.RegSuccess
      ]);
    });
  });
});
