/**
 *
 * VerifyEmailToken
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Button, Header, Loader, Icon } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import { verifyEmailTokenRequest } from './actions';
import {
  makeSelectVerifyEmailTokenRequest,
  makeSelectVerifyEmailTokenSuccess,
  makeSelectVerifyEmailTokenFailure,
  makeSelectVerifyEmailTokenSuccessMsg,
  makeSelectVerifyEmailTokenFailureMsg,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  verifyEmailTokenSuccess: makeSelectVerifyEmailTokenSuccess(),
  verifyEmailTokenFailure: makeSelectVerifyEmailTokenFailure(),
  verifyEmailTokenRequesting: makeSelectVerifyEmailTokenRequest(),
  verifyEmailTokenSuccessMsg: makeSelectVerifyEmailTokenSuccessMsg(),
  verifyEmailTokenFailureMsg: makeSelectVerifyEmailTokenFailureMsg(),
});

const mapDispatchToProps = dispatch => ({
  verifyEmailTokenRequest: token => dispatch(verifyEmailTokenRequest(token)),
});

/* eslint-disable react/prefer-stateless-function */
export class VerifyEmailToken extends React.Component {
  state = {
    token: '',
  };

  UNSAFE_componentWillMount() {
    const tokenQueryParams = new URLSearchParams(
      this.props.location.search,
    ).get('token');
    if (tokenQueryParams) {
      this.setState({
        token: tokenQueryParams,
      });
      this.props.verifyEmailTokenRequest(tokenQueryParams);
      return;
    }
    this._gotoHome();
  }

  _gotoHome = () => {
    this.props.history.push(`/user/dashboard`);
  };

  render() {
    const {
      verifyEmailTokenRequesting,
      verifyEmailTokenSuccess,
      verifyEmailTokenFailure,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Verify Email Token</title>
          <meta
            name="description"
            content="Description of Verify Email Token"
          />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <div textAlign="center">
              {verifyEmailTokenRequesting && (
                <>
                  <Header icon>
                    <Loader
                      size="massive"
                      className="ui active centered inline loader"
                    />
                    <p className="title">
                      We are verifying you email. Please wait.
                    </p>
                  </Header>
                </>
              )}
              {verifyEmailTokenSuccess && (
                <>
                  <Header icon>
                    <Icon name="check circle outline" />
                    <p className="title">Your email has been verified.</p>
                  </Header>
                </>
              )}

              {verifyEmailTokenFailure && (
                <>
                  <Header icon>
                    <Icon name="times circle outline" />
                    <p className="title">
                      Something went wrong while verifying you email. Please Try
                      again later.
                    </p>
                  </Header>
                </>
              )}

              <Button
                fluid
                color="purple"
                onClick={this._gotoHome}
                disabled={verifyEmailTokenRequesting}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'verifyEmailToken', saga });
const withReducer = injectReducer({ key: 'verifyEmailToken', reducer });

export default compose(withReducer, withSaga, withConnect)(VerifyEmailToken);
