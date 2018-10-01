import View from '@bedegaming/bolt/src/widgets/navigation/item/view.js';

export default View.extend({
  onDomRefresh() {
    if (this.hasInbox()) {
      const unread = this.state.unread;
      this.el.setAttribute('data-unread', `${unread}`);

      if (this.ui.parentheses[0]) this.ui.parentheses[0].setAttribute('data-unread', `(${unread})`);
      if (this.ui.badge[0]) this.ui.badge[0].setAttribute('data-unread', unread);
    }
  }
});
