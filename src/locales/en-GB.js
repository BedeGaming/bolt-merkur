/* eslint-disable max-len */

import { _ } from 'orchestra';
import enGBCommon from '@bedegaming/bolt/src/locales/en-GB.js';

const enGB = {
  'en-GB': {
    translation: {
      register_new_user: 'New member? <span>Create Account</span>',
      footer_paragraph1: 'Welcome to Bede Casino, Bede\'s official demo site, here you will be able to utilise and play with the functionality available from Bede.<br>Our entire site is built on Bede\'s Platform API\'s with implementation and styling also coming from our internal site team.',
      forgot_password: 'Forgot your password?',
      log_in: 'Log In'
    }
  }
};

export default _.merge(enGBCommon, enGB);
