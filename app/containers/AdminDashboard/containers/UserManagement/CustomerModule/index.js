import React from 'react';

import CustomTable from 'components/CustomTable';

const CustomerModule = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  getAllCustomerRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        loading={getAllCustomerRequesting}
        handlePagination={handlePagination}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
      />
    </div>
  );
};

export default CustomerModule;
