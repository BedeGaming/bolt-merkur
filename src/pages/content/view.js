import { View, Model, _ } from 'orchestra';
import ExtendView from '@bedegaming/bolt/src/pages/content/view.js';
import ContentView from '@bedegaming/bolt/src/widgets/content/view.js';

export default ExtendView.extend({

  regions: {
    title: 'title-header',
    section: 'content'
  },

  initialize(options) {
    this.content = options.content;
    this.scrollToAnchor = options.scrollToAnchor;
    this.liveChat = options.liveChat;
    this.title = options.title;
  },

  showContent() {
    this.showChildView('title', new ContentView({
      model: new Model({ title: this.title }),
      tagName: 'title-header'
    }), { replaceElement: true });

    this.showChildView('section', new ContentView({
      model: new Model({ content: this.content }),
      tagName: 'content'
    }), { replaceElement: true });
  },
})
