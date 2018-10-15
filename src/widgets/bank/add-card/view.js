import { _ } from 'orchestra';
import AddCardView from '@bedegaming/bolt/src/widgets/bank/add-card/view.js';

export default AddCardView.extend({
  /* istanbul ignore next */
  events: _.extend({}, AddCardView.prototype.events, {
    'keyup #deposit-input-expiry-date': 'checkIfHasValue',
    'blur #deposit-input-card-number': 'checkIfHasValue'
  }),

  checkIfHasValue() {
    if (document.getElementById('deposit-input-expiry-date').value) {
      document
        .getElementById('deposit-input-expiry-date')
        .classList.add('has-value');
    }

    if (document.getElementById('deposit-input-card-number').value) {
      document
        .getElementById('deposit-input-card-number')
        .classList.add('has-value');
    }
  }
});
