module.exports = {
  selector: {
    // registration selectors
    registerBtn: '.register',
    registerEmail: 'user-register #email',
    registerUsername: 'user-register #username',
    registerPassword: 'user-register #password',
    nextBtn: 'user-register .next',
    registerFirstName: 'user-register #firstName',
    registerLastName: 'user-register #lastName',
    registerDobDay: 'user-register #dobDay',
    registerDobMonth: 'user-register #dobMonth',
    registerDobYear: 'user-register #dobYear',
    addressSearchBtn: 'user-register .switch-input-mode',
    registerAddressLine1: 'user-register input[name=addressLine1]',
    registerTown: 'user-register input[name=town]',
    registerPostCode: 'user-register input[name=postCode]',
    registerTelephone: 'user-register #telephone',
    registerTerms: 'user-register label[for=termsAgreement]',
    registerSubmitBtn: 'user-register .register[type=submit]',

    // login selectors
    loginBtn: '.login-modal',
    username: 'input[name=username]',
    password: 'input[name=password]',
    loginSubmitBtn: 'user-login .login[type=submit]',
    loginModal: 'user-login',
    forgotPasswordBtn: '.forgot-password',
    forgotUsername: 'user-forgot-password input[name=username]',
    requestPasswordBtn: '.request-password',
    logoutBtn: 'a[data-useraction=logout]',

    // site notification selectors
    siteNotification: 'site-notification',
    errorNotification: '.notification-error',
    successNotification: '.notification-success',
    closeModal: 'close-modal',

    // balance selectors
    totalBalance: 'total-balance',
    mainBalance: 'main-balance',

    // change password selectors
    accountBtn: '.account',
    accountPage: 'account-page',
    accountNav: '.profile-header',
    accountLink: '.account-link',
    personalSection: 'personal-section',
    changePasswordModal: 'change-password',
    changePasswordBtn: '.change-password',
    currentPassword: '#currentPassword',
    newPassword: '#newPassword',
    newPasswordRepeat: '#newPasswordRepeat',
    updatePasswordBtn: '.update-password[type=submit]',

    // change email selectors
    changeEmailBtn: '.updated-contacts',
    newEmail: '#email',
    updateEmailBtn: '.update-contacts[type=submit]',

    // add card selectors
    addCardWidget: 'bank-addcard',
    optOutBonus: 'label[for=bonusOptInNo]',
    addNewCard: '.add-new-card',
    cardNumber: 'input[name=cardNumber]',
    expiryDate: 'input[name=expiryDate]',
    addCardCvv: 'input[name=CVN]',
    addCardSubmit: '.add-card[type=submit]',

    // deposit selectors
    depositBtn: '.deposit',
    amount: 'input[name=amount]',
    depositCvv: 'input[name=cvn]',
    promoCodeBtn: '.btn-bonus-request',
    depositTerms: 'label[for=firstDepositTerms]',
    depositLimitsTerms: 'label[for=firstDepositLimitsTerms]',
    depositSubmitBtn: '.btn-deposit-request[type=submit]',

    // withdraw selectors
    withdrawTab: '.withdraw',
    bankName: 'input[name=bankName]',
    accountNumber: 'input[name=accountNumber]',
    sortCode: 'input[name=sortCode]',
    withdrawSubmitBtn: '.withdraw[type=submit]',
    confirmBtn: '.confirm'

  }
};
