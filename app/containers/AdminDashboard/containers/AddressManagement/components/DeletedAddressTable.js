import React from 'react';

import CustomTable from 'components/CustomTable';

const DeletedAddressTable = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  fetchAllDeletedAddressRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        handlePagination={handlePagination}
        loading={fetchAllDeletedAddressRequesting}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
      />
    </div>
  );
};

export default DeletedAddressTable;
