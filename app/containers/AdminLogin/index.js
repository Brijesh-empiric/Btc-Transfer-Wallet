/**
 *
 * AdminLogin
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { Link, Redirect } from 'react-router-dom';
import { Message, Icon } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';

import jwtDecode from 'jwt-decode';
import getToken from 'utils/getToken';
import { validators } from 'utils/validators';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import {
  showDialog,
  adminLoginRequest,
  adminLoginClearMessages,
} from './actions';
import {
  makeSelectEmail,
  makeSelectAdminLoginRequest,
  makeSelectAdminLoginSuccess,
  makeSelectAdminLoginErrorResponse,
  makeSelectAdminLoginSuccessResponse,
} from './selectors';
import { makeSelectAdminUser } from '../App/selectors';

import AdminLoginForm from './AdminLoginForm';
import MultiFactorAuthAdmin from './AdminMultiFactorLogin';

/* eslint-disable react/prefer-stateless-function */
export class AdminLogin extends React.Component {
  state = {
    data: {
      email: this.props.email || '',
    },
    userEmail: '',
    setToken: '',
    reCaptcha: '',
    show_password: false,
    errors: {},
    err: '',
    loadingFb: false,
    show: false,
    loadingGoogle: false,
    redirectToReferer: false,
    showMultifactorForm: false,
  };

  componentWillUnmount() {
    this.props.adminLoginClearMessages();
  }

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  };
  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    if (data.email && !validators.emailValidator(data.email))
      errors.email = 'Please enter valid email';
    if (!data.password) errors.password = 'password_error';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { adminLoginRequest } = this.props;
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { from } = this.props.location.state || { from: false };

      adminLoginRequest(data, from);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.error &&
      prevProps.error != this.props.error &&
      this.props.error.length > 0
    ) {
      toast.error(this.props.error);
      this.setState(
        {
          err: this.props.error,
        },
        () => {
          localStorage.clear();
        },
      );
    }
    if (
      this.props.userResponse &&
      this.props.userResponse.size > 0 &&
      prevProps.userResponse !== this.props.userResponse
    ) {
      const userInfo =
        this.props.userResponse.toJS() &&
        this.props.userResponse.toJS().userInfo &&
        this.props.userResponse.toJS().userInfo;
      const setToken =
        this.props.userResponse.toJS() &&
        this.props.userResponse.toJS().token &&
        this.props.userResponse.toJS().token;
      let user_id;
      let userEmail;
      let multi_factor_auth_enable;
      let multi_factor_auth_enable_mobile;
      if (userInfo) {
        user_id = userInfo.user_id;
        userEmail = userInfo.email;
        multi_factor_auth_enable = userInfo.multi_factor_auth_enable;
      }

      if (user_id) {
        if (multi_factor_auth_enable || multi_factor_auth_enable_mobile) {
          // this.props.showDialog(<MultiFactorAuth user_id={user_id} />);
          this.setState({
            showMultifactorForm: true,
            user_id: user_id,
            userEmail,
            setToken,
          });
        }
      }
    }
  }

  showMultifactorDialog = () => {
    this.setState({ showMultifactorForm: !this.state.showMultifactorForm });
  };

  render() {
    const {
      err,
      data,
      errors,
      showMultifactorForm,
      user_id,
      userEmail,
      setToken,
    } = this.state;
    const { response, requesting, userResponse } = this.props;
    let userResp = userResponse ? userResponse.toJS() : {};
    let url = '';
    if (userResp && Object.keys(userResp).length > 1) {
      url =
        userResp.role === 'admin'
          ? '/admin/dashboard/user-management/customer'
          : '/user/dashboard';
    }
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('user_id')) {
          const { role } = decoded;
          if (role === 'admin')
            return <Redirect to="/admin/dashboard/user-management/customer" />;
        }
      } catch (error) {
        throw error;
      }
    }
    return (
      <div>
        <Helmet>
          <title>Admin Login</title>
          <meta name="description" content="Description of Admin Login" />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <div>
              {/* {err && err.length > 0 && (
                <div className="invalid_cred_msg">
                  <Message negative icon>
                    <Icon name="warning circle" />
                    <Message.Content>
                      <Message.Header>Error !</Message.Header>
                      <p>{err}</p>
                    </Message.Content>
                  </Message>
                </div>
              )} */}

              {response && <div className="positive message">{response}</div>}
              <p className="title">
                {userResp &&
                typeof userResp === 'object' &&
                Object.keys(userResp).length > 1
                  ? 'Already Logged in'
                  : 'Login to Global Btc Wallet'}
              </p>

              {userResp &&
                typeof userResp === 'object' &&
                !('_id' in userResp) && (
                  <AdminLoginForm
                    data={data}
                    errors={errors}
                    requesting={requesting}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                  />
                )}
              {userResp && Object.keys(userResp).length > 1 && userResp._id && (
                <div className="login__info">
                  <p>
                    You are already logged in. Go to{' '}
                    <Link className="alt-link" to={url}>
                      Dashboard
                    </Link>
                    .
                  </p>
                  <p>OR</p>
                  <p>
                    <span className="alt-link" onClick={this.props.logout}>
                      Logout
                    </span>{' '}
                    and sign in using different account.
                  </p>
                </div>
              )}
            </div>
            {showMultifactorForm && (
              <MultiFactorAuthAdmin
                user_id={user_id}
                userEmail={userEmail}
                token={setToken}
                showMultifactorDialog={this.showMultifactorDialog}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

AdminLogin.propTypes = {
  showDialog: PropTypes.func.isRequired,
  adminLoginRequest: PropTypes.func.isRequired,
  adminLoginClearMessages: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  userResponse: makeSelectAdminUser(),
  success: makeSelectAdminLoginSuccess(),
  requesting: makeSelectAdminLoginRequest(),
  error: makeSelectAdminLoginErrorResponse(),
  response: makeSelectAdminLoginSuccessResponse(),
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  adminLoginClearMessages: () => dispatch(adminLoginClearMessages()),
  adminLoginRequest: (values, redirect) =>
    dispatch(adminLoginRequest(values, redirect)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminLogin', reducer });
const withSaga = injectSaga({ key: 'adminLogin', saga });

export default compose(withReducer, withSaga, withConnect)(AdminLogin);
