/**
 *
 * BtcConverter
 *
 */

import React from 'react';

import { Form, Dropdown, Input } from 'semantic-ui-react';
import { currencyOption, cryptoOption } from './constants';

import { bitcoinToFiat, fiatToBitcoin } from 'bitcoin-conversion';

/* eslint-disable react/prefer-stateless-function */
export class BtcCalculator extends React.Component {
  state = {
    fiatValue: '',
    cryptoValue: '',
    selectedCrypto: 'BTC',
    selectedCurrency: 'USD',
  };

  _handleOnCurrencyChange = (event, data) => {
    this.setState(
      {
        selectedCurrency: data.value,
      },
      () => {
        this.convertToCrypto(this.state.fiatValue);
      },
    );
  };

  _handleOnCryptoValueChange = (event, data) => {
    this.setState(
      {
        cryptoValue: data.value,
      },
      () => {
        this.convertToFiat(this.state.cryptoValue);
      },
    );

    return;
  };

  _handleOnFiatValueChange = (event, data) => {
    this.setState(
      {
        fiatValue: data.value,
      },
      () => this.convertToCrypto(this.state.fiatValue),
    );

    return;
  };

  convertToCrypto = async fiat => {
    if (fiat === '') {
      this.setState({
        cryptoValue: '',
      });
      return;
    }
    let convertedValue = await fiatToBitcoin(fiat, this.state.selectedCurrency);
    this.setState({
      cryptoValue: convertedValue,
    });
    return;
  };

  convertToFiat = async crypto => {
    if (crypto === '') {
      this.setState({
        fiatValue: '',
      });
      return;
    }
    let convertedValue = await bitcoinToFiat(
      crypto,
      this.state.selectedCurrency,
    );
    this.setState({
      fiatValue: convertedValue,
    });
    return;
  };

  // _getOneBTCValue = async () => {
  //   let value = await fiatToBitcoin('1', 'USD');
  //   return value;
  // };

  render() {
    return (
      <div>
        {/* <h1 className="white title">BTC Calculator</h1>
        <p className="white">
          BTC Transfer Wallet's live crypto calculator does the math so you don't have to,
          giving real rates in real time. Convert fiat to crypto, plan your
          investment, and buy. All with Global BTC Wallet.
        </p> */}
        {/* <div className="white mt-4">
          <span className="number__large ">1 </span>
          BTC = <span className="number__large">{this._getOneBTCValue()} </span>
          USD
        </div> */}
        <Form className="mt-4">
          <Input
            label={
              <Dropdown
                className="dropdown__primary"
                defaultValue="BTC"
                search
                options={cryptoOption}
              />
            }
            labelPosition="right"
            className="mb-4"
            value={this.state.cryptoValue}
            placeholder="Enter Crypto Value"
            onChange={this._handleOnCryptoValueChange}
          />

          <Input
            label={
              <Dropdown
                className="dropdown__primary"
                defaultValue="USD"
                search
                options={currencyOption}
                onChange={this._handleOnCurrencyChange}
              />
            }
            labelPosition="right"
            placeholder="Enter Fiat Value"
            value={this.state.fiatValue}
            onChange={this._handleOnFiatValueChange}
          />
        </Form>
      </div>
    );
  }
}

export default BtcCalculator;
