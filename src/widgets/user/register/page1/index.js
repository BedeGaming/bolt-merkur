import { _ } from 'orchestra';
import View from '@bedegaming/bolt/src/widgets/user/register/page1/index.js';

export default View.extend({
  events: _.extend({}, View.prototype.events, {
    'keyup #email': 'checkIfHasValue'
  }),

  checkIfHasValue() {
    const emailId = document.getElementById('email');
    console.log('this is Bede');

    if (emailId.value.length > 0) {
      emailId.classList.add('has-value');
    } else {
      emailId.classList.remove('has-value');
    }
  }
});
