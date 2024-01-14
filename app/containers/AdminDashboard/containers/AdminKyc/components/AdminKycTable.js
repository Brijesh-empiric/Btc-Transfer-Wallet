import React from 'react';

import CustomTable from 'components/CustomTable';

const KycListModule = ({
  count,
  pagelimit,
  tableData,
  tableHead,
  handlePagination,
  getAllKycListRequesting,
}) => {
  return (
    <div>
      <CustomTable
        totalData={count}
        tableData={tableData}
        pagelimit={pagelimit}
        tableHead={tableHead}
        loading={getAllKycListRequesting}
        handlePagination={handlePagination}
        totalPages={Math.ceil(count / pagelimit)}
        noDataAvailableMsg={'No Data Available.'}
      />
    </div>
  );
};

export default KycListModule;
