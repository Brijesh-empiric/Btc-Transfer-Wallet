/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { Button, Form, Message, Loader } from 'semantic-ui-react';

import PasswordInputField from 'components/common/Forms/PasswordInputField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectResetPasswordRequest,
  makeSelectResetPasswordSuccess,
  makeSelectResetPasswordFailure,
  makeSelectResetPasswordSuccessMsg,
  makeSelectResetPasswordFailureMsg,
  makeSelectValidateTokenRequest,
  makeSelectValidateTokenSuccess,
  makeSelectValidateTokenFailure,
  makeSelectValidateTokenSuccessMsg,
  makeSelectValidateTokenFailureMsg,
} from './selectors';

import saga from './saga';
import reducer from './reducer';
import { validateTokenRequest, resetPasswordRequest } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  state = {
    data: {
      password: '',
      confirmPassword: '',
      triggerEvent: '',
      newTokenAfterValidation: '',
    },
    errors: {},
    validateTokenErrorMsg: '',
  };

  UNSAFE_componentWillMount = () => {
    const tokenQueryParams = new URLSearchParams(
      this.props.location.search,
    ).get('token');
    if (tokenQueryParams) {
      this.props.validateTokenRequest(tokenQueryParams);
      return;
    }
    this._gotoHome();
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.validateTokenFailureMsg !==
        prevProps.validateTokenFailureMsg &&
      this.props.validateTokenFailure
    ) {
      this.setState({
        validateTokenErrorMsg: this.props.validateTokenFailureMsg,
      });
    }

    if (
      this.props.resetPasswordFailureMsg !==
        prevProps.resetPasswordFailureMsg &&
      this.props.resetPasswordFailure
    ) {
      toast.error(this.props.resetPasswordFailureMsg);
      return;
    }

    if (
      this.props.resetPasswordSuccessMsg !==
        prevProps.resetPasswordSuccessMsg &&
      this.props.resetPasswordSuccess
    ) {
      toast.success(this.props.resetPasswordSuccessMsg);
      return;
    }

    if (
      this.props.validateTokenSuccess &&
      this.props.validateTokenSuccessMsg !== prevProps.validateTokenSuccessMsg
    ) {
      this.setState({
        data: {
          ...this.state.data,
          triggerEvent: this.props.validateTokenSuccessMsg.toJS().event,
          newTokenAfterValidation: this.props.validateTokenSuccessMsg.toJS()
            .new_token,
        },
      });
    }
  };

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
    if (!data.password) errors.password = "Can't be blank";
    if (!data.confirmPassword) errors.confirmPassword = "Can't be blank";
    if (
      data.password !== data.confirmPassword &&
      data.password &&
      data.confirmPassword
    ) {
      // toast.error('Password do not match.');
      errors.confirmPassword = 'Password do not match.';
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { resetPasswordRequest } = this.props;
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      resetPasswordRequest(data);
    }
  };

  _gotoHome = () => {
    this.props.history.push(`/login`);
  };

  render() {
    const {
      validateTokenErrorMsg,
      errors,
      data: { password, confirmPassword },
    } = this.state;
    const {
      validateTokenRequesting,
      validateTokenSuccess,
      resetPasswordRequesting,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Reset Password</title>
          <meta name="description" content="Reset Password" />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <h3 className="title">Reset Your Password</h3>

            {validateTokenRequesting && (
              <Loader
                active
                inverted
                inline="centered"
                content="Verifying Token. Please Wait."
              />
            )}

            {validateTokenErrorMsg && (
              <Message negative>
                <Message.Header>Oh snap! You got an error!</Message.Header>
                <p style={{ color: '#912d2b' }}>{validateTokenErrorMsg}</p>
              </Message>
            )}

            {validateTokenSuccess && (
              <Form className="form" onSubmit={this.handleSubmit}>
                <Form.Field>
                  <div className="pos-rel">
                    <PasswordInputField
                      name="password"
                      label="Password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      password={password}
                      error={errors.password ? 'password_error' : null}
                    />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="pos-rel">
                    <PasswordInputField
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                      password={confirmPassword}
                      error={errors.confirmPassword ? 'password_error' : null}
                    />
                  </div>
                </Form.Field>

                {errors.confirmPassword && (
                  <div className="field">
                    <Message negative>
                      <span className="black">{errors.confirmPassword}</span>
                    </Message>
                  </div>
                )}

                <Form.Field>
                  <div className="field clearfix align-center">
                    <div className="inline-block">
                      <Button
                        type="submit"
                        fluid
                        loading={resetPasswordRequesting}
                        disabled={resetPasswordRequesting}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form.Field>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetPasswordRequesting: makeSelectResetPasswordRequest(),
  resetPasswordSuccess: makeSelectResetPasswordSuccess(),
  resetPasswordFailure: makeSelectResetPasswordFailure(),
  resetPasswordSuccessMsg: makeSelectResetPasswordSuccessMsg(),
  resetPasswordFailureMsg: makeSelectResetPasswordFailureMsg(),
  validateTokenRequesting: makeSelectValidateTokenRequest(),
  validateTokenSuccess: makeSelectValidateTokenSuccess(),
  validateTokenFailure: makeSelectValidateTokenFailure(),
  validateTokenSuccessMsg: makeSelectValidateTokenSuccessMsg(),
  validateTokenFailureMsg: makeSelectValidateTokenFailureMsg(),
});

const mapDispatchToProps = dispatch => ({
  validateTokenRequest: data => dispatch(validateTokenRequest(data)),
  resetPasswordRequest: data => dispatch(resetPasswordRequest(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(withReducer, withSaga, withConnect)(ResetPassword);
