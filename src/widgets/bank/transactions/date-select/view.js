import View from '@bedegaming/bolt/src/widgets/bank/transactions/date-select/view';
import { _ } from 'orchestra';

export default View.extend({
  changeOption(time) {
    if (_.includes(this.dayOptions, time)) {
      this.ui.custom.removeClass('active');
      this.setModelTime(time);
      this.collection.lastDays = time;
      this.updateResults();
    } else {
      this.collection.lastDays = 'custom';
      this.setModelTime();
      this.ui.custom.addClass('active');
    }
  }
});
