import { _ } from 'orchestra';
import AddCardView from '@bedegaming/bolt/src/widgets/bank/deposit/bonus/view.js';

export default AddCardView.extend({
  /* istanbul ignore next */
  events: _.extend({}, AddCardView.prototype.events, {
    'blur #bonus-promo-code': 'checkIfHasValue'
  }),

  checkIfHasValue() {
    if (document.getElementById('bonus-promo-code').value) {
      document.getElementById('bonus-promo-code').classList.add('has-value');
    }
  }
});
