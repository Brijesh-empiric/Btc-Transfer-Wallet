import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  Form,
  Button,
  Checkbox,
  Segment,
  Popup,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import getUserObject from 'utils/getUserInfo';
import FormField from 'components/common/Forms/FormField';
import saga from './sagas';
import reducer from './reducer';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';

import InputField from 'components/common/Forms/InputField';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';
import QRCode from 'qrcode.react';

import {
  makeSelectEnable2faResponse,
  makeSelectMultiFactorAuth,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectRequesting,
  makeSelectRecoveryCodes,
  makeSelectMessage,
  makeSelectRecoveryCodeGeneratedOn,
  makeSelectUser,
  makeSelectBasicInfoRequesting,
} from './selectors';
import {
  enable2faAuthRequest,
  getMultiFactorAuthRequest,
  verifyMultiFactorAuthRequest,
  disableMultiFactorAuthRequest,
  getRecoveryCodesRequest,
  generateRecoveryCodeRequest,
  sendMultiFactorRecoveryCodesEmailRequest,
  loadBasicInfoRequest,
} from './actions';
import Toaster from 'components/Toaster';
import { toast } from 'react-toastify';

const mapDispatchToProps = dispatch => ({
  getMultiFactorAuthRequest: () => dispatch(getMultiFactorAuthRequest()),
  getRecoveryCodesRequest: () => dispatch(getRecoveryCodesRequest()),
  generateRecoveryCodeRequest: userId =>
    dispatch(generateRecoveryCodeRequest(userId)),
  sendMultiFactorRecoveryCodesEmailRequest: userId =>
    dispatch(sendMultiFactorRecoveryCodesEmailRequest(userId)),
  verifyMultiFactorAuthRequest: token =>
    dispatch(verifyMultiFactorAuthRequest(token)),
  disableMultiFactorAuthRequest: userId =>
    dispatch(disableMultiFactorAuthRequest(userId)),
  loadBasicInfoRequest: userId => dispatch(loadBasicInfoRequest(userId)),
  enable2faAuthRequest: payload => dispatch(enable2faAuthRequest(payload)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  confirmUpdateMultiFactorAuth: makeSelectMultiFactorAuth(),
  successResponse: makeSelectSuccessResponse(),
  errorResponse: makeSelectErrorResponse(),
  isRequesting: makeSelectRequesting(),
  recoveryCodes: makeSelectRecoveryCodes(),
  message: makeSelectMessage(),
  enable2FAResponse: makeSelectEnable2faResponse(),
  recovery_code_generated_on: makeSelectRecoveryCodeGeneratedOn(),
  basicInfoRequesting: makeSelectBasicInfoRequesting(),
});

class MultiFactorAuth extends React.Component {
  static propTypes = {
    getMultiFactorAuthRequest: PropTypes.func.isRequired,
    verifyMultiFactorAuthRequest: PropTypes.func.isRequired,
    disableMultiFactorAuthRequest: PropTypes.func.isRequired,
    generateRecoveryCodeRequest: PropTypes.func.isRequired,
  };
  state = {
    data: {
      totp_token: '',
    },
    multiFactorAuth:
      this.props.user && this.props.user.get('multi_factor_auth_enable'),
    showMultiFactorAuthDisable: false,
    errors: {},
    recoveryCodes: [],
    message: {},
    user: {},
    userEmail: '',
  };

  componentDidMount() {
    const userObj = getUserObject();
    if (userObj._id) {
      // this.props.loadBasicInfoRequest(userObj._id);
      this.props.getRecoveryCodesRequest();
    }
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (typeof decoded === 'object' && decoded.hasOwnProperty('user_id')) {
          const { email } = decoded;
          this.setState({ userEmail: email ? email : '' }, () => {
            this.props.loadBasicInfoRequest(this.state.userEmail);
          });
        }
      } catch (error) {
        throw error;
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.errorResponse &&
      prevProps.errorResponse !== this.props.errorResponse
    ) {
      toast.error(
        this.props.errorResponse ? this.props.errorResponse : 'error',
      );
    }
    if (
      this.props.user &&
      this.props.user.get('multi_factor_auth_enable') !==
        prevProps.user.get('multi_factor_auth_enable')
    ) {
      this.setState({
        multiFactorAuth: this.props.user.get('multi_factor_auth_enable'),
        showMultiFactorAuthDisable: false,
      });
    }
    if (this.props.user && prevProps.user !== this.props.user) {
      const user = prevProps.user.toJS();
      this.setState({
        user,
        multiFactorAuth:
          this.props.user && this.props.user.get('multi_factor_auth_enable'),
      });
    }
  }

  handleCheckBox = () => {
    this.setState(
      {
        multiFactorAuth: !this.state.multiFactorAuth,
      },
      function() {
        if (this.state.multiFactorAuth) {
          // this.props.getMultiFactorAuthRequest();
          const { userEmail } = this.state;
          this.props.enable2faAuthRequest({
            email: userEmail,
            reenable: false,
          });
        }
      },
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data, userEmail } = this.state;
    const secret = this.props.confirmUpdateMultiFactorAuth.get('secret');
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.verifyMultiFactorAuthRequest(
        Object.assign({}, { data, userEmail, secret }),
      );
      this.setState({
        isLoading: true,
        data: {
          totp_token: '',
          userEmail: userEmail,
        },
        errors: {},
      });
    }
  };

  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (!data.totp_token) errors.totp_token = "Can't be blank";
    return errors;
  };

  handleChange = e => {
    let errors = this.state.errors;
    if (!!errors[e.target.name] && !!e.target.value)
      delete errors[e.target.name];
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors,
    });
  };

  changeMultiFactorAuthStatus = () => {
    this.setState({
      showMultiFactorAuthDisable: !this.state.showMultiFactorAuthDisable,
    });
  };

  disableMultiFactorAuthRequest = () => {
    const {
      userEmail,
      data: { totp_token },
    } = this.state;
    this.props.disableMultiFactorAuthRequest({ userEmail, totp_token });
  };

  generateRecoveryCodeRequest = () => {
    this.props.generateRecoveryCodeRequest(this.props.user.get('_id'));
  };

  sendMultiFactorRecoveryCodesEmailRequest = () => {
    this.props.sendMultiFactorRecoveryCodesEmailRequest(
      this.props.user.get('_id'),
    );
  };

  render() {
    const {
      multiFactorAuth,
      showMultiFactorAuthDisable,
      data,
      errors,
    } = this.state;
    const {
      successResponse,
      errorResponse,
      isRequesting,
      basicInfoRequesting,
      recoveryCodes,
      user,
    } = this.props;
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div>
        <div className="section">
          {/* {message && message} */}
          {basicInfoRequesting ? (
            <div className="loader_wallet"></div>
          ) : (
            <div className="segment">
              {this.props.user &&
                this.props.user.get('multi_factor_auth_enable') && (
                  <div>
                    {!showMultiFactorAuthDisable && (
                      <div>
                        <div className="field mg-btm-sm">
                          <label className="custom-control custom-checkbox">
                            <input
                              name="multiFactorAuth"
                              className="custom-control-input"
                              type="checkbox"
                              checked={
                                this.props.user.get(
                                  'multi_factor_auth_enable',
                                ) || false
                              }
                              disabled
                            />
                            <span className="custom-control-indicator" />{' '}
                            <span className="custom-control-description">
                              Two Factor Auth Enabled
                            </span>{' '}
                          </label>
                        </div>
                        <Button
                          negative
                          onClick={this.changeMultiFactorAuthStatus}
                        >
                          Disable Two Factor Auth
                        </Button>
                      </div>
                    )}
                    {showMultiFactorAuthDisable && (
                      <div>
                        <p>Do you want to disable two factor auth?</p>
                        <InputField
                          className="totp__input"
                          type="text"
                          name="totp_token"
                          placeholder="Token..."
                          value={data.totp_token || ''}
                          onChange={this.handleChange}
                          error={errors.totp_token}
                        />
                        <Button
                          className="button positive"
                          onClick={this.disableMultiFactorAuthRequest}
                          loading={isRequesting}
                          disabled={isRequesting}
                        >
                          Yes, Disable
                        </Button>
                        <Button
                          className="button basic"
                          onClick={this.changeMultiFactorAuthStatus}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              {this.props.user &&
                !this.props.user.get('multi_factor_auth_enable') && (
                  <div className="field">
                    <Checkbox
                      label="Enable Two Factor Auth"
                      name="multiFactorAuth"
                      onClick={this.handleCheckBox}
                      checked={multiFactorAuth}
                      toggle
                    />

                    <Popup
                      trigger={
                        <Icon
                          style={{ marginLeft: '8px' }}
                          name="info"
                          color="yellow"
                          circular
                        />
                      }
                      content="Add additional security to your account using two factor authentication. When two factor authentication is enabled, each time you login, you will be prompted for a secure random token. You may retrieve this token from your phone's Google Authenticator application or any other authenticator app."
                      position="top right"
                    />
                    {multiFactorAuth && (
                      <div className="mg-top-sm">
                        <div className="message info">
                          Scan the following QR code with any authenticator App.
                          <a
                            className="mg-right-sm"
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                          >
                            <img src="" />
                          </a>
                          <a
                            target="_blank"
                            href="https://itunes.apple.com/us/app/google-authenticator/id388497605"
                          >
                            <img src="" />
                          </a>
                        </div>
                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // viewBox="0 0 51 51"
                      width="250"
                      height="250"
                    >
                      <path
                        d={this.props.confirmUpdateMultiFactorAuth.get(
                          'qrPath',
                        )}
                        className="qr-code"
                      />
                    </svg> */}
                        {this.props.enable2FAResponse && (
                          <QRCode value={this.props.enable2FAResponse} />
                        )}
                        <div>
                          <Form onSubmit={this.handleSubmit}>
                            <FormField
                              type="text"
                              name="totp_token"
                              value={data.totp_token}
                              onChange={this.handleChange}
                              placeholder="Enter the token from authenticator app"
                              error={errors.totp_token && errors.totp_token}
                            />
                            <Button
                              color="purple"
                              type="submit"
                              loading={isRequesting}
                              disabled={isRequesting}
                            >
                              Verify
                            </Button>
                          </Form>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          {/* {this.props.user.get('multi_factor_auth_enable') && (
          <div className="segment">
            <h2>Manage Codes</h2>
            <div className="message info">
              These codes can be used to sign into your account if you have
              problems in receiving the code during sign-in. Each code can be
              used only once.
            </div>
            <br />
            <p>Backup verification codes</p>
            <ul className="ui tag labels">
              {recoveryCodes
                .entrySeq()
                .map(([key, value]) => (
                  <li className="label" key={`${key}_${value}`}>
                    {value}
                  </li>
                ))
                .toArray()}
            </ul>
            <p className="muted mg-btm-md">
              Generated Time : {this.props.recovery_code_generated_on}
            </p>
            <div className="print_save mg-top-sm inline-block">
              <Button
                secondary
                data-tooltip={user.get('email')}
                className="button"
                onClick={this.sendMultiFactorRecoveryCodesEmailRequest}
                disabled={isRequesting}
              >
                Send codes to email
              </Button>
            </div>
            <div className="button_wrapper inline-block">
              <Button
                className="button"
                color="purple"
                onClick={this.generateRecoveryCodeRequest}
                disabled={isRequesting}
              >
                Generate new Codes
              </Button>
            </div>
          </div>
        )} */}
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({
  key: 'adminProfileMultiFactorAuth',
  reducer,
});
const withSaga = injectSaga({ key: 'adminProfileMultiFactorAuth', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(MultiFactorAuth);
