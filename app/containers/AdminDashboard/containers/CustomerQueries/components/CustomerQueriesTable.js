import React from 'react';

import CustomTable from 'components/CustomTable';

const CustomerQueriesTable = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  getAllCustomerQueriesRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        handlePagination={handlePagination}
        loading={getAllCustomerQueriesRequesting}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
      />
    </div>
  );
};

export default CustomerQueriesTable;
