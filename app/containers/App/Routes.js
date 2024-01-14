import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Login from 'containers/Login';
import NotFoundPage from 'containers/NotFoundPage';
// import AdminDashboard from 'containers/AdminDashboard/Loadable';
import AdminDashboardLayout from 'containers/AdminDashboard/containers/AdminLayout';
import UserDashboardLayout from 'containers/UserDashboard/containers/UserLayout';
import { makeSelectLocation } from './selectors';
import PasswordReset from '../Login/password-reset';
const Login = lazy(() => import('containers/Login'));
const AdminLogin = lazy(() => import('containers/AdminLogin'));
const Register = lazy(() => import('containers/Register'));
const AdminDashboard = lazy(() => import('containers/AdminDashboard/Loadable'));
const UserDashboard = lazy(() => import('containers/UserDashboard/Loadable'));
const HomeLayout = lazy(() => import('containers/HomeLayout'));
const HeaderLayout = lazy(() => import('containers/HeaderLayout'));

const HomePage = lazy(() => import('containers/HomePage/Loadable'));
const AboutPage = lazy(() => import('containers/About/Loadable'));
const ContactPage = lazy(() => import('containers/Contact/Loadable'));
const BtcPrice = lazy(() => import('containers/BtcPrice/Loadable'));
const WhereToBuy = lazy(() => import('containers/WhereToBuy/Loadable'));
const TermsAndConditions = lazy(() =>
  import('containers/TermsAndConditions/Loadable'),
);
const BtcConverter = lazy(() => import('containers/BtcConverter/Loadable'));

const EmailVerificationPage = lazy(() =>
  import('containers/EmailVerification/Loadable'),
);
const VerifyEmailTokenPage = lazy(() =>
  import('containers/VerifyEmailToken/Loadable'),
);
const VerifyAdminEmailTokenPage = lazy(() =>
  import('containers/VerifyAdminEmailToken/Loadable'),
);
const ForgetPassword = lazy(() => import('containers/ForgetPassword/Loadable'));
const ResetPassword = lazy(() => import('containers/ResetPassword/Loadable'));

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

class Routes extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <Suspense
        fallback={
          <Loader type="RevolvingDot" color="#00BFFF" height={0} width={0} />
        }
      >
        <Switch location={this.props.location}>
          <Route
            exact
            path="/"
            render={props => (
              <HomeLayout>
                <HomePage {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/about"
            render={props => (
              <HomeLayout>
                <AboutPage {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/terms-and-conditions"
            render={props => (
              <HomeLayout>
                <TermsAndConditions {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/btc-converter"
            render={props => (
              <HomeLayout>
                <BtcConverter {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/contact"
            render={props => (
              <HomeLayout>
                <ContactPage {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/btc-price"
            render={props => (
              <HomeLayout>
                <BtcPrice {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/where-to-buy"
            render={props => (
              <HomeLayout>
                <WhereToBuy {...props} />
              </HomeLayout>
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <HeaderLayout>
                <Login {...props} />
              </HeaderLayout>
            )}
          />
          <Route
            exact
            path="/cms/login"
            render={props => (
              <HeaderLayout>
                <AdminLogin {...props} />
              </HeaderLayout>
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <HeaderLayout>
                <Register {...props} />
              </HeaderLayout>
            )}
          />
          <Route
            exact
            path="/forget-password"
            render={props => (
              <HeaderLayout>
                <ForgetPassword {...props} />
              </HeaderLayout>
            )}
          />
          <Route
            exact
            path="/reset-user-password"
            render={props => (
              <HeaderLayout>
                <ResetPassword {...props} />
              </HeaderLayout>
            )}
          />
          <Route
            exact
            path="/email-verification"
            render={props => <EmailVerificationPage {...props} />}
          />
          <Route
            exact
            path="/verify/email"
            render={props => <VerifyEmailTokenPage {...props} />}
          />

          <Route
            exact
            path="/admin-verify/email"
            render={props => <VerifyAdminEmailTokenPage {...props} />}
          />

          <Route
            exact
            path="/password-reset/user/:userid"
            render={props => <PasswordReset {...props} />}
          />

          <Route
            path="/admin/dashboard"
            render={props => (
              <AdminDashboardLayout>
                <AdminDashboard {...props} />
              </AdminDashboardLayout>
            )}
          />

          <Route
            path="/user/dashboard"
            render={props => (
              <UserDashboardLayout>
                <UserDashboard {...props} />
              </UserDashboardLayout>
            )}
          />

          <Route
            render={props => (
              <AdminDashboardLayout>
                <NotFoundPage />
              </AdminDashboardLayout>
            )}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default connect(mapStateToProps)(Routes);
