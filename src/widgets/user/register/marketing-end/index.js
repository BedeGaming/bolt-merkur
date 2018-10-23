import { View } from 'orchestra';
import template from 'widgets/user/register/marketing-end/template.hbs';

export default View.extend({
  template,

  tagName: 'form',

  templateContext() {
    const marketing = this.model.get('marketing') === 'opt-in';
    const regButtonLabel = marketing ? 'register' : 'register_marketing_opt_in';
    return {
      marketing,
      regButtonLabel
    };
  }
});
