/**
 *
 * BtcPrice
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Container } from 'semantic-ui-react';
import CustomTable from 'components/CustomTable';

import makeSelectBtcPrice, {
  makeSelectError,
  makeSelectRequesting,
  makeSelectBtcPriceList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getBtcPriceRequest } from './actions';

function BtcPrice({
  errorMsg,
  btcPriceList,
  isRequesting,
  getBtcPriceRequest,
}) {
  const convertedPriceList = btcPriceList.toJS();
  const initialState = {
    currentpage: 1,
    perpage: 10,
  };
  const [query, setquery] = useState(initialState);

  useEffect(() => {
    getBtcPriceRequest(query);
  }, []);
  const tableHead = [
    'Coin',
    'Price',
    '1h Price Change(%)',
    'Volume (24h)',
    'Market Cap',
    'Last 7 days',
  ];
  const handlePagination = value => {
    getBtcPriceRequest({
      ...query,
      currentpage: value.currentPage,
    });
  };
  const formatNumber = amount => {
    const formatter = new Intl.NumberFormat('en-US');
    return formatter.format(amount);
  };
  const tableData =
    (convertedPriceList.dataList.length > 0 &&
      convertedPriceList.dataList.map(
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
          `$ ${formatNumber(current_price)}`,
          <span
            style={{
              color: `${
                price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'
              }`,
            }}
          >
            {price_change_percentage_1h_in_currency?.toFixed(3)} %
          </span>,
          `$ ${formatNumber(total_volume)}`,
          `$ ${formatNumber(market_cap)}`,
          <img
            src={`https://www.coingecko.com/coins/${
              image?.split('/')?.[5]
            }/sparkline`}
          />,
        ],
      )) ||
    [];
  return (
    <section>
      <Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <CustomTable
          totalData={convertedPriceList.totalItems}
          tableData={tableData}
          pagelimit={query.perpage}
          tableHead={tableHead}
          loading={isRequesting}
          handlePagination={handlePagination}
          totalPages={Math.ceil(convertedPriceList.totalItems / query.perpage)}
          noDataAvailableMsg="No Data Available."
        />
      </Container>
    </section>
  );
}

BtcPrice.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  btcPrice: makeSelectBtcPrice(),
  errorMsg: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  btcPriceList: makeSelectBtcPriceList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBtcPriceRequest: data => dispatch(getBtcPriceRequest(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'btcPrice', reducer });
const withSaga = injectSaga({ key: 'btcPrice', saga });

export default compose(withReducer, withSaga, withConnect)(BtcPrice);
