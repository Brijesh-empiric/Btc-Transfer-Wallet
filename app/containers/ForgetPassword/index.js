/**
 *
 * ForgetPassword
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';

import { validators } from 'utils/validators';
import InputField from 'components/common/Forms/InputField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectForgetPasswordRequest,
  makeSelectForgetPasswordSuccess,
  makeSelectForgetPasswordFailure,
  makeSelectForgetPasswordSuccessMsg,
  makeSelectForgetPasswordFailureMsg,
} from './selectors';

import saga from './saga';
import reducer from './reducer';
import { forgetPasswordRequest } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForgetPassword extends React.Component {
  state = {
    data: {
      email: this.props.email || '',
    },
    errors: {},
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.forgetPasswordSuccessMsg !==
        prevProps.forgetPasswordSuccessMsg &&
      this.props.forgetPasswordSuccess
    ) {
      toast.success(this.props.forgetPasswordSuccessMsg);
      return;
    }
    if (
      this.props.forgetPasswordFailureMsg !==
        prevProps.forgetPasswordFailureMsg &&
      this.props.forgetPasswordFailure
    ) {
      toast.error(this.props.forgetPasswordFailureMsg);
      return;
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
    if (!data.email) errors.email = "Can't be blank";
    if (data.email && !validators.emailValidator(data.email))
      errors.email = 'Please enter valid email';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { forgetPasswordRequest } = this.props;
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      forgetPasswordRequest(data);
    }
  };
  render() {
    const { errors, data } = this.state;
    const { forgetPasswordRequesting } = this.props;
    return (
      <div>
        <Helmet>
          <title>Forget Password</title>
          <meta name="description" content="Forget Password" />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <h3 className="title">Forget Your Password</h3>
            <p>
              Don’t worry! Just fill in your email and we’ll send you a password
              reset link.
            </p>
            <Form className="form" onSubmit={this.handleSubmit}>
              <Form.Field>
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={data.email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
              </Form.Field>
              <Form.Field>
                <div className="field clearfix align-center">
                  <div className="inline-block">
                    <Button
                      type="submit"
                      fluid
                      loading={forgetPasswordRequesting}
                      disabled={forgetPasswordRequesting}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form.Field>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forgetPasswordSuccess: makeSelectForgetPasswordSuccess(),
  forgetPasswordFailure: makeSelectForgetPasswordFailure(),
  forgetPasswordRequesting: makeSelectForgetPasswordRequest(),
  forgetPasswordSuccessMsg: makeSelectForgetPasswordSuccessMsg(),
  forgetPasswordFailureMsg: makeSelectForgetPasswordFailureMsg(),
});

const mapDispatchToProps = dispatch => ({
  forgetPasswordRequest: email => dispatch(forgetPasswordRequest(email)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'forgetPassword', reducer });
const withSaga = injectSaga({ key: 'forgetPassword', saga });

export default compose(withReducer, withSaga, withConnect)(ForgetPassword);
