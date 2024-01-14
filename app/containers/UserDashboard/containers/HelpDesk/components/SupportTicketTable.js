import React from 'react';

import CustomTable from 'components/CustomTable';

const SupportTicketTable = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  getAllSupportTicketForUserRequesting,
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
        loading={getAllSupportTicketForUserRequesting}
      />
    </div>
  );
};

export default SupportTicketTable;
