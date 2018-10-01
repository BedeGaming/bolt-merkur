describe('navigation view', function () {
  beforeEach(function () {
    this.NavigationItemView = Orchestra.View;

    this.View = proxyquire('widgets/navigation/item/view.js', {
      '@bedegaming/bolt/src/widgets/navigation/item/view.js': this.NavigationItemView
    });

    this.view = new this.View({
      model: this.model
    });
  });

  describe('#onDomRefresh', function () {
    beforeEach(function () {
      this.view.hasInbox = stub().returns(true);
      this.setAttributeStub = stub();
      this.setAttributeStubParentheses = stub();
      this.setAttributeStubBadge = stub();
      this.view.ui = {
        badge: [{ setAttribute: this.setAttributeStub }],
        parentheses: []
      };
      spy(this.view.el, 'setAttribute');
      this.view.state = {
        unread: 5
      };
    });

    it('should call parentheses setAttributeStub', function () {
      this.view.ui = { parentheses: [{ setAttribute: this.setAttributeStubParentheses }], badge: [] };

      this.view.onDomRefresh();
      expect(this.setAttributeStubParentheses).to.be.calledWith('data-unread', '(5)');
    });

    it('should call setAttribute with data-unread and 5 on el', function () {
      this.view.onDomRefresh();
      expect(this.view.el.setAttribute).to.be.calledWith('data-unread', '5');
    });

    it('should call setAttribute with data-unread and 5 on badge', function () {
      this.view.onDomRefresh();
      expect(this.setAttributeStub).to.be.calledWith('data-unread', 5);
    });

    it('shouldnt call setAttribute with data-unread and 5 on badge', function () {
      this.view.ui = { badge: [], parentheses: [] };
      this.view.onDomRefresh();
      expect(this.setAttributeStub).to.not.be.called();
    });

    it('shouldnt set any attributes if item isnt inbox-related', function () {
      this.view.hasInbox.returns(false);
      this.view.onDomRefresh();
      expect(this.setAttributeStub).to.not.be.called();
      expect(this.view.el.setAttribute).to.not.be.called();
    });
  });
});
