/**
 *
 * WhereToBuy
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
import makeSelectWhereToBuy from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Img from '../../assets/images/static/banner.jpg';

import { Link } from 'react-router-dom';
import { EXCHANGE_LIST, currenciesOptions } from './constants';

import {
  Header,
  Breadcrumb,
  Container,
  Grid,
  Image,
  Table,
  Dropdown,
  Icon,
  Popup,
} from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class WhereToBuy extends React.Component {
  state = {
    selectedCurrency: 'USD',
    exchangeList: EXCHANGE_LIST['USD'],
  };

  _handleOnCurrencyChange = (event, semanticEvent) => {
    this.setState({
      selectedCurrency: semanticEvent.value,
      exchangeList: EXCHANGE_LIST[semanticEvent.value],
    });
    return;
  };

  _showRespectiveIcon = name => {
    if (name === 'International Wire') {
      return (
        <Popup
          content={name}
          key={name}
          trigger={<Icon name={'globe'} color="grey" />}
        />
      );
    }
    if (name === 'Local Bank Transfer') {
      return (
        <Popup
          content={name}
          key={name}
          trigger={<Icon name={'university'} color="grey" />}
        />
      );
    }
    if (name === 'Credit/Debit Card') {
      return (
        <Popup
          content={name}
          key={name}
          trigger={<Icon name={'credit card'} color="grey" />}
        />
      );
    }
    if (name === '3rd Party Payment') {
      return (
        <Popup
          content={name}
          key={name}
          trigger={<Icon name={'ellipsis horizontal'} color="grey" />}
        />
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <section className="inner-banner">
          <div className="bg-img">
            <Image src={Img} alt="bitcoin tech background image" />
          </div>

          <Breadcrumb>
            <Header>Where To Buy</Header>
            <Link to="/">
              <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Where To Buy</Breadcrumb.Section>
          </Breadcrumb>
        </section>
        <section className="about-page-content">
          <Container>
            <h2 className="section-header text-center">Where To Buy</h2>
            <span
              style={{
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                // direction: 'row',
              }}
            >
              <div className="pr-1">Buy Bitcoin with</div>
              <Dropdown
                button
                className="icon"
                floating
                labeled
                icon="currency"
                options={currenciesOptions}
                value={this.state.selectedCurrency}
                onChange={this._handleOnCurrencyChange}
              />
            </span>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>S.N.</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Based in</Table.HeaderCell>
                  <Table.HeaderCell>Regulated</Table.HeaderCell>
                  <Table.HeaderCell>Founded</Table.HeaderCell>
                  <Table.HeaderCell>Deposits</Table.HeaderCell>
                  <Table.HeaderCell>Withdrawals</Table.HeaderCell>
                  <Table.HeaderCell>Link</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.exchangeList &&
                  this.state.exchangeList.map((exchange, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <img
                              className="mr-2"
                              src={exchange.logo}
                              style={{ width: '32px', maxHeight: '32px' }}
                              alt={exchange.name}
                            />
                            {exchange.name}
                          </div>
                        </Table.Cell>
                        <Table.Cell>{exchange.basedIn}</Table.Cell>
                        <Table.Cell>
                          {exchange.regulated ? (
                            <Icon name={'check circle'} color="green" />
                          ) : (
                            // <Popup
                            //   content={exchange.regulated}
                            //   key={exchange.regulated}
                            //   trigger={
                            //     <Icon name={'check circle'} color="green" />
                            //   }
                            // />
                            ' '
                          )}
                        </Table.Cell>
                        <Table.Cell>{exchange.founded}</Table.Cell>
                        <Table.Cell>
                          {exchange.deposits &&
                            exchange.deposits.length > 0 &&
                            exchange.deposits.map(depositSupport => {
                              return this._showRespectiveIcon(depositSupport);
                            })}
                        </Table.Cell>
                        <Table.Cell>
                          {exchange.withdrawals &&
                            exchange.withdrawals.length > 0 &&
                            exchange.withdrawals.map(withdrawalSupport => {
                              return this._showRespectiveIcon(
                                withdrawalSupport,
                              );
                            })}
                          {/* {exchange.withdrawals} */}
                        </Table.Cell>

                        <Table.Cell>
                          {/* <Popup
                            content={exchange.officialLink}
                            key={exchange.officialLink}
                            header={'Visit'}
                            on='click'
                            pinned
                            trigger={
                              <Icon name={'external alternate'} color="grey" />
                            }
                          /> */}

                          <Popup
                            trigger={
                              <Icon name={'external alternate'} color="grey" />
                            }
                            flowing
                            hoverable
                          >
                            <Grid>
                              <Grid.Column>
                                <Header>Visit</Header>
                                <a target="blank" href={exchange.officialLink}>
                                  {exchange.officialLink}
                                </a>
                              </Grid.Column>
                            </Grid>
                          </Popup>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

WhereToBuy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  whereToBuy: makeSelectWhereToBuy(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'whereToBuy', reducer });
const withSaga = injectSaga({ key: 'whereToBuy', saga });

export default compose(withReducer, withSaga, withConnect)(WhereToBuy);
