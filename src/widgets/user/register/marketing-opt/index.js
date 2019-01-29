import { View } from 'orchestra';
import template from 'widgets/user/register/marketing-opt/template.hbs';

export default View.extend({
  tagName: 'form',

  validationName: 'register-marketing',

  attributes: {
    novalidate: true
  },

  template,

  templateContext() {

    return {
      siteName: window.config.siteName
    };
  }
});
