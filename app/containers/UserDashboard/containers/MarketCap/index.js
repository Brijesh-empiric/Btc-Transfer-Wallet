/**
 *
 * MarketCap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectFetchMarketCapSuccess,
  makeSelectFetchMarketCapFailure,
  makeSelectFetchMarketCapResponse,
  makeSelectFetchMarketCapRequesting,
  makeSelectFetchMarketCapSuccessMsg,
  makeSelectFetchMarketCapFailureMsg,
} from './selectors';

import { fetchMarketCapRequestAction } from './actions';

import saga from './saga';
import reducer from './reducer';

import MarketCapTable from './components/MarketCapTable';

/* eslint-disable react/prefer-stateless-function */
export class MarketCap extends React.Component {
  state = {
    queryParams: {
      perpage: 10,
      currentpage: 1,
    },
  };

  componentDidMount = () => {
    const { queryParams } = this.state;

    this.props.fetchMarketCapRequestAction(queryParams);
    return;
  };

  componentDidUpdate = prevProps => {
    const { queryParams } = this.state;

    // if (
    //   this.props.fetchSupportTicketCategoryFailureMsg !==
    //     prevProps.fetchSupportTicketCategoryFailureMsg &&
    //   this.props.fetchSupportTicketCategoryFailure
    // ) {
    //   toast.error(this.props.fetchSupportTicketCategoryFailureMsg);
    //   return;
    // }
  };

  _handlePagination = data => {
    const { queryParams } = this.state;
    this.props.fetchMarketCapRequestAction({
      ...queryParams,
      currentpage: data.currentPage,
    });
    return;
  };

  _formatNumber = amount => {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(amount);
  };

  render() {
    const {
      queryParams: { perpage },
    } = this.state;

    const { fetchMarketCapRequesting } = this.props;

    const tableHead = [
      'Coin',
      'Price',
      '1h Price Change(%)',
      'Volume (24h)',
      'Market Cap',
      'Last 7 days',
    ];

    const tableData =
      (this.props.fetchMarketCapResponse.toJS() &&
        this.props.fetchMarketCapResponse.toJS().data &&
        this.props.fetchMarketCapResponse.toJS().data.length > 0 &&
        this.props.fetchMarketCapResponse
          .toJS()
          .data.map(
            ({
              image,
              name,
              total_volume,
              current_price,
              duration,
              market_cap,
              price_change_percentage_1h_in_currency,
            }) => [
              <div className="d-flex align-items-center mb-3">
                <img
                  className="mr-2"
                  src={image}
                  style={{ width: '24px', maxHeight: '24px' }}
                  alt={name}
                />
                {name}
              </div>,
              `$ ${this._formatNumber(current_price)}`,
              <span
                style={{
                  color: `${
                    price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'
                  }`,
                }}
              >
                {price_change_percentage_1h_in_currency?.toFixed(3)} %
              </span>,
              `$ ${this._formatNumber(total_volume)}`,
              `$ ${this._formatNumber(market_cap)}`,
              <img
                src={`https://www.coingecko.com/coins/${
                  image?.split('/')?.[5]
                }/sparkline`}
              />,
            ],
          )) ||
      [];

    return (
      <div>
        <Helmet>
          <title>Market Cap</title>
          <meta name="description" content="Description of Market Cap" />
        </Helmet>
        <div>
          <h1>{'Market Cap'}</h1>
        </div>
        <br />
        <br />
        <MarketCapTable
          count={
            this.props.fetchMarketCapResponse.toJS() &&
            this.props.fetchMarketCapResponse.toJS().pagination &&
            this.props.fetchMarketCapResponse.toJS().pagination.totalItems
              ? this.props.fetchMarketCapResponse.toJS().pagination.totalItems
              : 0
          }
          pagelimit={perpage}
          tableHead={tableHead}
          tableData={tableData}
          handlePagination={this._handlePagination}
          fetchMarketCapRequesting={fetchMarketCapRequesting}
        />
      </div>
    );
  }
}

MarketCap.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetchMarketCapSuccess: makeSelectFetchMarketCapSuccess(),
  fetchMarketCapFailure: makeSelectFetchMarketCapFailure(),
  fetchMarketCapResponse: makeSelectFetchMarketCapResponse(),
  fetchMarketCapSuccessMsg: makeSelectFetchMarketCapSuccessMsg(),
  fetchMarketCapFailureMsg: makeSelectFetchMarketCapFailureMsg(),
  fetchMarketCapRequesting: makeSelectFetchMarketCapRequesting(),
});

const mapDispatchToProps = dispatch => ({
  fetchMarketCapRequestAction: queryParams =>
    dispatch(fetchMarketCapRequestAction(queryParams)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'marketCap', saga });
const withReducer = injectReducer({ key: 'marketCap', reducer });

export default compose(withReducer, withSaga, withConnect)(MarketCap);
