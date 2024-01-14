/**
 *
 * BtcConverter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Form, Dropdown, Input } from 'semantic-ui-react';
import makeSelectBtcConverter from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { currencyOption, cryptoOption } from './currencySymbol';
import BTCCalculator from '../../components/BTCConverter';

const options = [
  { key: '.com', text: 'BTC', value: '.com' },
  { key: '.net', text: 'GBP', value: '.net' },
  { key: '.org', text: 'USd', value: '.org' },
];
/* eslint-disable react/prefer-stateless-function */
export class BtcConverter extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>BTC Converter</title>
          <meta name="description" content="Description of BTC Converter" />
        </Helmet>
        <div className="login__wrap converter">
          <div className="login__box">
            <h1 className="white title">BTC Calculator</h1>
            <p className="white">
              BTC Transfer Wallet&lsquo;s live crypto calculator does the math
              so you don&lsquo;t have to, giving real rates in real time.
              Convert fiat to crypto, plan your investment, and buy. All with
              BTC Transfer Wallet.
            </p>
            <BTCCalculator />
          </div>
        </div>
      </div>
    );
  }
}

BtcConverter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  btcConverter: makeSelectBtcConverter(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'btcConverter', reducer });
const withSaga = injectSaga({ key: 'btcConverter', saga });

export default compose(withReducer, withSaga, withConnect)(BtcConverter);
