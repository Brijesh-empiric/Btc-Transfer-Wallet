/**
 *
 * VerifyAdminEmailToken
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
import { verifyAdminEmailTokenRequest } from './actions';
import {
  makeSelectVerifyAdminEmailTokenSuccess,
  makeSelectVerifyAdminEmailTokenFailure,
  makeSelectVerifyAdminEmailTokenSuccessMsg,
  makeSelectVerifyAdminEmailTokenFailureMsg,
  makeSelectVerifyAdminEmailTokenRequesting,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  verifyAdminEmailTokenSuccess: makeSelectVerifyAdminEmailTokenSuccess(),
  verifyAdminEmailTokenFailure: makeSelectVerifyAdminEmailTokenFailure(),
  verifyAdminEmailTokenRequesting: makeSelectVerifyAdminEmailTokenRequesting(),
  verifyAdminEmailTokenSuccessMsg: makeSelectVerifyAdminEmailTokenSuccessMsg(),
  verifyAdminEmailTokenFailureMsg: makeSelectVerifyAdminEmailTokenFailureMsg(),
});

const mapDispatchToProps = dispatch => ({
  verifyAdminEmailTokenRequest: token =>
    dispatch(verifyAdminEmailTokenRequest(token)),
});

/* eslint-disable react/prefer-stateless-function */
export class VerifyAdminEmailToken extends React.Component {
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
      this.props.verifyAdminEmailTokenRequest(tokenQueryParams);
      return;
    }
    this._gotoHome();
  }

  _gotoHome = () => {
    this.props.history.push(`/`);
  };

  render() {
    const {
      verifyAdminEmailTokenSuccess,
      verifyAdminEmailTokenFailure,
      verifyAdminEmailTokenRequesting,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Verify Admin Email</title>
          <meta
            name="description"
            content="Description of Verify Admin Email Token"
          />
        </Helmet>
        <div className="login__wrap">
          <div className="login__box">
            <div textAlign="center">
              {verifyAdminEmailTokenRequesting && (
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
              {verifyAdminEmailTokenSuccess && (
                <>
                  <Header icon>
                    <Icon name="check circle outline" />
                    <p className="title">Your email has been verified.</p>
                  </Header>
                </>
              )}

              {verifyAdminEmailTokenFailure && (
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
                disabled={verifyAdminEmailTokenRequesting}
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VerifyAdminEmailToken.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'verifyAdminEmailToken', saga });
const withReducer = injectReducer({ key: 'verifyAdminEmailToken', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(VerifyAdminEmailToken);
