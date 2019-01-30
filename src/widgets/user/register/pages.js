import Page1 from 'widgets/user/register/page1';
import Page2 from 'widgets/user/register/page2';
import Page3 from 'widgets/user/register/page3';
import MarketingOpt from 'widgets/user/register/marketing-opt';
import RegisterEnd from 'widgets/user/register/register-end';
import RegSuccess from 'widgets/user/register/reg-success';

export default () => {
  const pages = [Page1, Page2, Page3];
  const marketing = window.config.registration.marketing;
  const regSuccess = window.config.registration.regSuccess;

  if (!marketing) {
    pages.push(RegisterEnd);
  }

  if (marketing) {
    pages.push(MarketingOpt, RegisterEnd);
  }

  if (regSuccess) {
    pages.push(RegSuccess);
  }

  return pages;
};
