import React from 'react';

import CustomTable from 'components/CustomTable';

const CustomerModule = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  getTransactionInfoRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        loading={getTransactionInfoRequesting}
        handlePagination={handlePagination}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
      />
    </div>
  );
};

export default CustomerModule;
