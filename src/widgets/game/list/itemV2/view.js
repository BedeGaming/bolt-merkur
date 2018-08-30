import { InfernoView } from 'orchestra';
import renderer from 'application/renderer.js';
import Container from 'widgets/game/list/itemV2/container.jsx';

const View = InfernoView.extend();
View.setRenderer(renderer);

export default View.extend({
  className() {
    const elClassName = ['game-item'];

    if (this.model.get('featuredBanner')) {
      elClassName.push('featured-game');
    }

    if (this.model.get('jackpotId')) {
      elClassName.push('jackpot-game');
    }

    if (this.options.featuredTag && this.options.category) {
      const siteCode = window.config.siteCode;
      const category = this.options.category.get('name');
      const tags = this.model.get('tags');
      if (tags && tags.includes(`${category}-featured-${siteCode}`)) {
        this.model.set('isFeaturedGame', true);
        elClassName.push('featured');
      }
    }

    return elClassName.join(' ');
  },

  template: Container,

  thisAsState: true
});
