/**
 *
 * EmailVerification
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Button, Header, Icon, Segment, Loader } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { toast } from 'react-toastify';

import saga from './saga';
import reducer from './reducer';
import {
  makeSelectResendUserEmailVerificationSuccess,
  makeSelectResendUserEmailVerificationFailure,
  makeSelectResendUserEmailVerificationSuccessMsg,
  makeSelectResendUserEmailVerificationFailureMsg,
  makeSelectResendUserEmailVerificationRequesting,
} from './selectors';

import { resendUserEmailVerificationRequestAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EmailVerification extends React.Component {
  state = {
    email: '',
  };
  UNSAFE_componentWillMount() {
    const emailQueryParams = new URLSearchParams(
      this.props.location.search,
    ).get('email');
    if (emailQueryParams) {
      this.setState({
        email: emailQueryParams,
      });
      return;
    }
    this._gotoHome();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.resendUserEmailVerificationFailureMsg &&
      prevProps.resendUserEmailVerificationFailureMsg !=
        this.props.resendUserEmailVerificationFailureMsg
    ) {
      toast.error(this.props.resendUserEmailVerificationFailureMsg);
      return;
    }

    if (
      this.props.resendUserEmailVerificationSuccessMsg &&
      prevProps.resendUserEmailVerificationSuccessMsg !==
        this.props.resendUserEmailVerificationSuccessMsg
    ) {
      toast.success(this.props.resendUserEmailVerificationSuccessMsg);
      return;
    }
  }

  _gotoHome = () => {
    this.props.history.push(`/`);
  };

  _resendUserEmailVerification = () => {
    const { email } = this.state;
    this.props.resendUserEmailVerificationRequestAction({ email });
    return;
  };

  render() {
    const { email } = this.state;
    return (
      <div>
        <Helmet>
          <title>Email Verification Page</title>
          <meta name="description" content="Email Verification Page" />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <div textAlign="center">
              <Header icon>
                <Icon name="mail outline" />
                <p className="title">
                  We have sent a verification email to {email}. Click the link
                  inside to get started!
                </p>
              </Header>
              <Button
                color="purple"
                disabled={this.props.resendUserEmailVerificationRequesting}
                fluid
                onClick={this._gotoHome}
              >
                Go to Homepage
              </Button>

              {this.props.resendUserEmailVerificationRequesting ? (
                ''
              ) : (
                <p
                  style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    color: '#ff8704',
                    cursor: 'pointer',
                  }}
                  onClick={this._resendUserEmailVerification}
                >
                  Resend Verfication Email
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailVerification.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resendUserEmailVerificationSuccess: makeSelectResendUserEmailVerificationSuccess(),
  resendUserEmailVerificationFailure: makeSelectResendUserEmailVerificationFailure(),
  resendUserEmailVerificationSuccessMsg: makeSelectResendUserEmailVerificationSuccessMsg(),
  resendUserEmailVerificationFailureMsg: makeSelectResendUserEmailVerificationFailureMsg(),
  resendUserEmailVerificationRequesting: makeSelectResendUserEmailVerificationRequesting(),
});

const mapDispatchToProps = dispatch => ({
  resendUserEmailVerificationRequestAction: reqObj =>
    dispatch(resendUserEmailVerificationRequestAction(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'emailVerification', reducer });
const withSaga = injectSaga({ key: 'emailVerification', saga });

export default compose(withReducer, withSaga, withConnect)(EmailVerification);
