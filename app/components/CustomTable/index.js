import React from 'react';
import PropTypes from 'prop-types';
import { Table, Grid } from 'semantic-ui-react';

import Pagination from './components/Pagination';

const CustomTable = props => {
  const {
    tableHead,
    tableData,
    loading,
    pagelimit,
    handlePagination,
    totalData,
    totalPages,
    noDataAvailableMsg = 'No Data Available.',
  } = props;
  return (
    <div className="overflow__x">
      <Table stackable padded className="mb-0">
        {tableHead !== undefined ? (
          <thead>
            <tr>
              {tableHead.map((prop, key) => (
                <th key={key}>{prop}</th>
              ))}
            </tr>
          </thead>
        ) : null}
        {loading ? (
          <tbody>
            <tr>
              <td>
                <p className="loader_wallet"></p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tableData && tableData.length === 0 && (
              <tr>
                <td>{noDataAvailableMsg}</td>
              </tr>
            )}
            {tableData &&
              tableData.length > 0 &&
              tableData.map((prop, key) => {
                return (
                  <tr key={key}>
                    {prop.map((each, index) => (
                      <td key={index}>{each}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
      <div className="flex">
        <div className="ml-auto">
          <Pagination
            pageNeighbours={1}
            pageLimit={pagelimit}
            totalPages={totalPages}
            totalRecords={totalData}
            onPageChanged={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

CustomTable.defaultProps = {
  loading: false,
  tableHeaderColor: 'gray',
  handlePagination: () =>
    console.log('todo: make handlePagination function!!!'),
  tableData: [
    ['Luffy', 'luffy@yopmail.com', '1BvBMSEYstWe......scd31b7xJaNV', 'Active'],
    ['sanji', 'sanji@yopmail.com', '1BvBMSEYstWe......scd31b7xJaNV', 'Active'],
    ['Baki', 'baki@yopmail.com', '1BvBMSEYstWe......scd31b7xJaNV', 'Active'],
    [
      'Naruto',
      'naruto@yopmail.com',
      '1BvBMSEYstWe......scd31b7xJaNV',
      'Active',
    ],
  ],
  tableHead: ['Name', 'Email', 'Wallet Address', 'Status'],
};

CustomTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(
  //   PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  // ),
  // pagination: PropTypes.shape({
  //   page: PropTypes.number.isRequired,
  //   size: PropTypes.number.isRequired,
  //   totaldata: PropTypes.number.isRequired,
  // }),
  // handlePagination: PropTypes.func,
};

export default CustomTable;
