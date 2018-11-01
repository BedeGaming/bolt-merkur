import { _ } from 'orchestra';
import AddCardView from '@bedegaming/bolt/src/widgets/bank/add-card-deposit/view.js';

export default AddCardView.extend({
  /* istanbul ignore next */
  events: _.extend({}, AddCardView.prototype.events, {
    'keyup .expiry-date': 'checkIfHasValue',
    'blur .credit-card': 'checkIfHasValue'
  }),

  checkIfHasValue() {
    if (document.querySelector('.expiry-date').value) {
      document.querySelector('.expiry-date').classList.add('has-value');
    }

    if (document.querySelector('.credit-card').value) {
      document.querySelector('.credit-card').classList.add('has-value');
    }
  }
});
