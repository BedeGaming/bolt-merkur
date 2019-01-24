/* eslint-disable max-len */

import { _ } from 'orchestra';
import enGBCommon from '@bedegaming/bolt/src/locales/en-GB.js';

const enGB = {
  'en-GB': {
    translation: {
      card_expiry_date: 'Expiry Date',
      card_expiry_date_placeholder: 'MM/YYYY',
      dob: 'Date of Birth',
      emailverify_paragraph1: 'You should shortly receive an email for verification.',
      emailverify_paragraph2: 'Please verify to login and start playing.',
      footer_paragraph1:
        "Welcome to Bede Casino, Bede's official demo site, here you will be able to utilise and play with the functionality available from Bede.<br>Our entire site is built on Bede's Platform API's with implementation and styling also coming from our internal site team.",
      forgot_password: 'Forgot your password?',
      log_in: 'Log In',
      login_existing_user: 'Already a member? <span>Log in</span>',
      meta_deposit_limits_title:
        'Bede Casino | Deposit Limits | The safest place to play',
      meta_featured_title:
        'Bede Casino | Featured Games | The safest place to play',
      meta_forgot_password_title:
        'Bede Casino | Forgot Password | The safest place to play',
      meta_gambling_title: 'Responsible Gaming',
      meta_games_title: 'Bede Casino | Games | The safest place to play',
      meta_history_title: 'Bede Casino | History | The safest place to play',
      meta_home_title: 'Bede Casino | The safest place to play',
      meta_inbox_title: 'Bede Casino | Inbox | The safest place to play',
      meta_profile_title: 'Bede Casino | Profile | The safest place to play',
      meta_promotions_title:
        'Bede Casino | Promotions | The safest place to play',
      meta_slots_title: 'Bede Casino | Play Slots | The safest place to play',
      meta_support_title: 'Bede Casino | Support | The safest place to play',
      meta_tables_title:
        'Bede Casino | Play Table Games | The safest place to play',
      password_placeholder: 'Password',
      profile_balance_title: 'Account Balance',
      profile_details_title: 'Your Details',
      register_marketing_title: 'Receive Amazing Offers?',
      register_marketing_success_title: "You're Nearly There!",
      register_marketing_thanks: 'Your marketing preferences have been saved.',
      register_new_user: 'Not a member? <span>Create Account</span>',
      registration_success_body:
        'Thank you for registering. Get ready to play!',
      total_balance: 'Total Balance',
      type_address: 'Start typing postcode / address',
      username_placeholder: 'Username',
      account_history: 'Account History'
    }
  }
};

export default _.merge(enGBCommon, enGB);
