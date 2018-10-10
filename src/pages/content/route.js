import Route from '@bedegaming/bolt/src/pages/content/route.js';
import ContentView from 'pages/content/view.js';

export default Route.extend({
  showContent() {
    this.container.show(new ContentView({
      title: this.contentType
        .toLowerCase()
        .split('-')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' '),
      content: this.content,
      scrollToAnchor: this.scrollToAnchor,
      className: `topic-${this.contentType}`,
      liveChat: this.liveChat
    }), { replaceElement: true });
  }
});
