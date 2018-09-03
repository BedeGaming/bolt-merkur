describe('balance view', function () {
  beforeEach(function () {
    this.MainView = Orchestra.View;

    this.Cookies = {
      get: stub(),
      set: stub()
    };

    this.model = new Orchestra.Model();

    const View = proxyquire('widgets/balance/view.js', {
      '@bedegaming/bolt/src/widgets/balance/view': this.MainView,
      'cookies-js': this.Cookies
    });

    this.view = new View({
      model: this.model
    });
  });

  describe('initialize', function () {
    it('should set `isBalanceSecret` on the model to false if there is no cookie', function () {
      this.model.set = stub();
      this.view.initialize();
      expect(this.model.set).to.have.been.calledWith('isBalanceSecret', false);
    });

    it('should set `isBalanceSecret` on the model to false if there is a cookie with value `false`', function () {
      this.Cookies.get = stub().returns('false');
      this.model.set = stub();
      this.view.initialize();
      expect(this.model.set).to.have.been.calledWith('isBalanceSecret', false);
    });

    it('should set `isBalanceSecret` on the model to true if there is a cookie with value `true`', function () {
      this.Cookies.get = stub().returns('true');
      this.model.set = stub();
      this.view.initialize();
      expect(this.model.set).to.have.been.calledWith('isBalanceSecret', true);
    });
  });

  describe('UI hash', function () {
    it('should set the UI hash', function () {
      expect(this.view.ui.refresh).to.eql('.refresh');
      expect(this.view.ui.toggleWallets).to.eql('.balance-list');
      expect(this.view.ui.balanceList).to.eql('.balance-list');
      expect(this.view.ui.hideBalance).to.eql('.hide-balance');
      expect(this.view.ui.mainBalance).to.eql('main-balance');
    });
  });

  describe('Events', function () {
    it('should set the Events', function () {
      expect(this.view.events['click .refresh']).to.eql('refresh');
      expect(this.view.events['click .balance-list']).to.eql('toggleWallets');
      expect(this.view.events['click .hide-balance']).to.eql('toggleHideBalance');
    });
  });

  describe('toggleHideBalance', function () {
    beforeEach(function () {
      this.view.toggleWallets = stub();
      this.view.refresh = stub();
      stub(this.view, 'toggleSecretClass');
    });

    it('should call toggleSecretClass', function () {
      this.view.toggleHideBalance();
      expect(this.view.toggleSecretClass).to.have.been.called();
    });

    it('should call `toggleWallets` if balance is open', function () {
      this.model.set('isBalanceOpen', true);
      this.view.toggleHideBalance();
      expect(this.view.toggleWallets).to.have.been.calledOnce();
    });

    it('should not call `toggleWallets` if balance is not open', function () {
      this.view.toggleHideBalance();
      expect(this.view.toggleWallets).to.have.not.been.calledOnce();
    });

    it('should set the isBalanceSecret cookie to false if isBalanceSecret is true', function () {
      this.model.set('isBalanceSecret', true);
      this.view.toggleHideBalance();
      expect(this.Cookies.set).to.be.calledWith('isBalanceSecret', false);
    });

    it('should set the isBalanceSecret cookie to true if isBalanceSecret is false', function () {
      this.model.set('isBalanceSecret', false);
      this.view.toggleHideBalance();
      expect(this.Cookies.set).to.be.calledWith('isBalanceSecret', true);
    });

    it('should set isBalanceSecret on the model to false if isBalanceSecret is true', function () {
      this.model.set('isBalanceSecret', true);
      this.model.set = stub();
      this.view.toggleHideBalance();
      expect(this.model.set).to.be.calledWith('isBalanceSecret', false);
    });

    it('should set isBalanceSecret on the model to true if isBalanceSecret is false', function () {
      this.model.set('isBalanceSecret', false);
      this.model.set = stub();
      this.view.toggleHideBalance();
      expect(this.model.set).to.be.calledWith('isBalanceSecret', true);
    });

    it('should call `refresh` if balance is un hidden', function () {
      this.model.set('isBalanceSecret', true);
      this.model.set = stub();
      this.view.toggleHideBalance();
      expect(this.view.refresh).to.have.been.calledOnce();
    });
  });

  describe('toggleWallets', function () {
    beforeEach(function () {
      this.view.refresh = stub();
    });

    it('should not set isBalanceOpen on the model if the target className is `hide-balance`', function () {
      this.model.set = stub();
      const e = {
        target: {
          className: 'hide-balance'
        }
      };

      this.view.toggleWallets(e);
      expect(this.model.set).to.not.have.been.calledWith('isBalanceOpen');
    });

    it('should not set isBalanceOpen on the model if secretBalance is true', function () {
      this.model.set('isBalanceSecret', true);
      this.model.set = stub();

      this.view.toggleWallets();
      expect(this.model.set).to.not.have.been.calledWith('isBalanceOpen');
    });

    it('should set `isBalanceOpen` to true if `isBalanceOpen` is false', function () {
      this.model.set('isBalanceOpen', false);
      this.model.set = stub();
      this.view.toggleWallets();
      expect(this.model.set).to.be.calledWith('isBalanceOpen', true);
    });

    it('should set `isBalanceOpen` to false if `isBalanceOpen` is true', function () {
      this.model.set('isBalanceOpen', true);
      this.model.set = stub();
      this.view.toggleWallets();
      expect(this.model.set).to.be.calledWith('isBalanceOpen', false);
    });

    it('should call `refresh` if balance is closed', function () {
      this.model.set('isBalanceOpen', false);
      this.model.set = stub();
      this.view.toggleWallets();
      expect(this.view.refresh).to.have.been.calledOnce();
    });
  });

  describe('#toggleSecretClass', function () {
    beforeEach(function () {
      this.view.ui.toggleWallets = {
        addClass: stub(),
        removeClass: stub()
      };
    });

    it('should add secret class', function () {
      this.model.set('isBalanceSecret', true);
      this.view.toggleSecretClass();
      expect(this.view.ui.toggleWallets.addClass).to.be.calledWith('secret');
    });

    it('should remove secret class', function () {
      this.model.set('isBalanceSecret', false);
      this.view.toggleSecretClass();
      expect(this.view.ui.toggleWallets.removeClass).to.be.calledWith('secret');
    });
  });

  describe('#onDomRefresh', function () {
    beforeEach(function () {
      const self = this;
      stub(this.view, 'toggleSecretClass');
      this.propStub = stub();

      this.view.$ = stub().returns({
        prop: self.propStub
      });
    });

    it('should call toggleSecretClass', function () {
      this.view.onDomRefresh();
      expect(this.view.toggleSecretClass).to.have.been.called();
    });

    it('should add the disabled attribute to the show all button if balances are hidden', function () {
      this.model.set('isBalanceSecret', true);
      this.view.onDomRefresh();
      expect(this.view.$).to.have.been.calledWith('.toggle-wallets');
      expect(this.propStub).to.have.been.calledWith('disabled', true);
    });

    it('should not add the disabled attribute to the show all button if balances are shown', function () {
      this.model.set('isBalanceSecret', false);
      this.view.onDomRefresh();
      expect(this.view.$).to.have.been.calledWith('.toggle-wallets');
      expect(this.propStub).to.have.been.calledWith('disabled', false);
    });
  });
});
