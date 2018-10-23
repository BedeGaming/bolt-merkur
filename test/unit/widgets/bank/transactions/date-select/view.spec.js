describe('bank/transactions/date-select view', function () {
  beforeEach(function () {
    const _ = {
      includes: stub()
    };
    this._ = _;
    this.ViewStub = Orchestra.View;

    this.View = proxyquire('widgets/bank/transactions/date-select/view.js', {
      '@bedegaming/bolt/src/widgets/bank/transactions/date-select/view': this.ViewStub,
      orchestra: { _ }
    });

    this.view = new this.View();

    this.view.ui = {
      custom: {
        addClass: stub(),
        removeClass: stub()
      }
    };

    this.view.setModelTime = stub();
    this.view.updateResults = stub();
    this.view.collection = {};
    this.view.dayOptions = {};
  });

  describe('#changeOption', function () {
    beforeEach(function () {
      this._.includes.withArgs(this.view.dayOptions, 7).returns(true);
      this._.includes.withArgs(this.view.dayOptions, 'custom').returns(false);
    });

    it('should set the dates on model and lastDays on collection', function () {
      this.view.changeOption(7);

      expect(this.view.ui.custom.removeClass).to.be.calledWith('active');
      expect(this.view.collection.lastDays).to.eql(7);
      expect(this.view.updateResults).to.be.called();
      expect(this.view.setModelTime).to.be.calledWith(7);
    });

    it('should rerender the view and assign lastDays to custom', function () {
      this.view.changeOption('custom');
      expect(this.view.ui.custom.addClass).to.be.calledWith('active');
      expect(this.view.collection.lastDays).to.eql('custom');
      expect(this.view.setModelTime).to.be.called();
    });
  });
});
