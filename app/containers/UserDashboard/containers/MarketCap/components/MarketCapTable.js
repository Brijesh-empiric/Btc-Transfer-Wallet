import React from 'react';

import CustomTable from 'components/CustomTable';

const MarketCapTable = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  fetchMarketCapRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        handlePagination={handlePagination}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
        loading={fetchMarketCapRequesting}
      />
    </div>
  );
};

export default MarketCapTable;
