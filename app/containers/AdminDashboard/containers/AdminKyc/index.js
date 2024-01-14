/**
 *
 * AdminKyc
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import {
  Card,
  Grid,
  Icon,
  Input,
  Label,
  Modal,
  Button,
  Header,
  Dropdown,
} from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectGetAllKycListSuccess,
  makeSelectGetAllKycListFailure,
  makeSelectGetAllKycListSuccessMsg,
  makeSelectGetAllKycListFailureMsg,
  makeSelectGetAllKycListRequesting,
  makeSelectGetAllKycListResponse,
  makeSelectGetKycStatusSuccess,
  makeSelectGetKycStatusFailure,
  makeSelectGetKycStatusSuccessMsg,
  makeSelectGetKycStatusFailureMsg,
  makeSelectGetKycStatusRequesting,
  makeSelectGetKycStatusResponse,
  makeSelectDeleteKycSuccess,
  makeSelectDeleteKycFailure,
  makeSelectDeleteKycSuccessMsg,
  makeSelectDeleteKycFailureMsg,
  makeSelectDeleteKycRequesting,
} from './selectors';

import {
  getKycStatusRequest,
  getAllKycListRequest,
  deleteKycRequest,
} from './actions';

import saga from './saga';
import reducer from './reducer';

import AdminKycListModule from './components/AdminKycTable';

const KYC_STATUS_OPTIONS = [{ key: 4, text: 'All', value: '' }];

const SORT_BY = [
  { key: 1, text: 'Ascending', value: 'aes' },
  { key: 2, text: 'Descending', value: 'desc' },
];

/* eslint-disable react/prefer-stateless-function */
export class AdminKyc extends React.Component {
  state = {
    queryParams: {
      email: '',
      sort: 'desc',
      perpage: 10,
      currentpage: 1,
      status: 'pending',
      order: 'timestamp',
    },

    kycStatus: KYC_STATUS_OPTIONS,

    // showDeleteModal: false,
    sortByOptions: SORT_BY,
    // orderByOption: ORDER_BY,
    selectedSortingType: 'desc',
    kycIdToDelete: '',
    isKycDeleteModalVisible: false,
    // selectedUserType: 'Customer',
    // selectedOrderType: 'timestamp',
    // userTypeOptions: USER_TYPES_OPTIONS,
    // userIdToDelete: '',
  };
  componentDidMount() {
    const { queryParams } = this.state;
    this.props.getKycStatusRequest();
    this.props.getAllKycListRequest(queryParams);
    return;
  }

  componentDidUpdate = prevProps => {
    const { queryParams } = this.state;
    if (
      this.props.deleteKycFailureMsg !== prevProps.deleteKycFailureMsg &&
      this.props.deleteKycFailure
    ) {
      toast.error(this.props.deleteKycFailureMsg);
    }

    if (
      this.props.deleteKycSuccessMsg !== prevProps.deleteKycSuccessMsg &&
      this.props.deleteKycSuccess
    ) {
      toast.success(this.props.deleteKycSuccessMsg);
      this._handleDeleteKycModal();
      this.props.getKycStatusRequest();
      this.props.getAllKycListRequest(queryParams);
    }
  };

  _handleDeleteKycModal = (kycId = '') => {
    this.setState({
      isKycDeleteModalVisible: !this.state.isKycDeleteModalVisible,
      kycIdToDelete: kycId,
    });
    return;
  };

  _deleteKyc = () => {
    const { kycIdToDelete } = this.state;
    this.props.deleteKycRequest({ kyc_id: kycIdToDelete });
    return;
  };

  _handleDropDown = (e, se) => {
    this.setState(
      {
        queryParams: {
          ...this.state.queryParams,
          status: se.value,
        },
      },
      () => {
        this.props.getAllKycListRequest(this.state.queryParams);
      },
    );
  };

  _handleOnSortByOptionChange = (e, se) => {
    this.props.getAllKycListRequest({
      ...this.state.queryParams,
      sort: se.value,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        sort: se.value,
      },
    });
  };

  _handlePagination = data => {
    const { queryParams } = this.state;
    this.props.getAllKycListRequest({
      ...queryParams,
      currentpage: data.currentPage,
    });
    return;
  };

  _handleOnSearchType = (event, data) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        email: data.value,
      },
    });
    return;
  };

  _handleOnSearchKeyPress = event => {
    if (event.key === 'Enter') {
      this._searchByEmail();
    }
  };

  _searchByEmail = () => {
    const { queryParams } = this.state;
    this.props.getAllKycListRequest(queryParams);
    return;
  };

  _convertDate = date => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    var today = new Date(date);
    return today.toLocaleDateString('en-US', options);
  };

  render() {
    const {
      queryParams: { perpage },
      kycStatus,
      isKycDeleteModalVisible,
    } = this.state;
    const tableHead = [
      'First Name',
      'Last Name',
      'Verification Type',
      'Document Id',
      'Created At',
      'Verification Status',
      'Action',
    ];
    const {
      getAllKycListRequesting,
      getAllKycListResponse,
      deleteKycRequesting,
    } = this.props;

    const tableData =
      getAllKycListResponse.toJS() &&
      getAllKycListResponse.toJS().data &&
      getAllKycListResponse.toJS().data.length > 0
        ? getAllKycListResponse
            .toJS()
            .data.map(
              ({
                id,
                first_name,
                last_name,
                verification_type,
                id_number,
                timestamp,
                status,
              }) => [
                first_name,
                last_name,
                verification_type,
                id_number,
                this._convertDate(timestamp),
                status === 'approve' ? (
                  <Label color="green">Verified</Label>
                ) : status === 'reject' ? (
                  <Label color="red">Rejected</Label>
                ) : (
                  <Label color="yellow"> Pending </Label>
                ),

                <>
                  <Button
                    circular
                    color="yellow"
                    icon="eye"
                    onClick={() => {
                      this.props.history.push(
                        `/admin/dashboard/kyc/detail/${id}`,
                      );
                    }}
                  />
                  <Button
                    circular
                    color="red"
                    icon="trash"
                    onClick={() => this._handleDeleteKycModal(id)}
                  />
                </>,
              ],
            )
        : [];

    return (
      <div>
        <Helmet>
          <title>Admin Kyc</title>
          <meta name="description" content="Description of AdminKyc" />
        </Helmet>
        <Grid className="align-items-center">
          <Grid.Column mobile={9} computer={12}>
            <h2 className="mb-4">KYC List</h2>
          </Grid.Column>
        </Grid>
        <div>
          <Modal size="mini" open={isKycDeleteModalVisible}>
            <Header icon="archive" content="Delete KYC" />
            <Modal.Content>
              <p>Are you sure. You want to delete kyc?</p>
            </Modal.Content>

            <Modal.Actions>
              <Button
                color="red"
                disabled={deleteKycRequesting}
                onClick={this._handleDeleteKycModal}
              >
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={this._deleteKyc}
                loading={deleteKycRequesting}
                disabled={deleteKycRequesting}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div>
          <Card className="mt-3">
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Input
                    fluid
                    icon="search"
                    iconPosition="left"
                    placeholder="Search By Email Address"
                    onKeyPress={this._handleOnSearchKeyPress}
                    onChange={this._handleOnSearchType}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    fluid
                    size="large"
                    color="orange"
                    onClick={this._searchByEmail}
                  >
                    Search
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  Sort By
                  <Dropdown
                    search
                    selection
                    options={this.state.sortByOptions}
                    onChange={this._handleOnSortByOptionChange}
                    defaultValue={this.state.selectedSortingType}
                  />
                </Grid.Column>
                <Grid.Column>
                  Status
                  <Dropdown
                    search
                    selection
                    name={'selectedStatus'}
                    placeholder="Select a Status"
                    onChange={this._handleDropDown}
                    value={this.state.queryParams.status}
                    options={this.props.getKycStatusResponse.toJS()}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <AdminKycListModule
              count={
                getAllKycListResponse.toJS() &&
                getAllKycListResponse.toJS().pagination_data &&
                getAllKycListResponse.toJS().pagination_data.total_count
                  ? getAllKycListResponse.toJS().pagination_data.total_count
                  : 0
              }
              pagelimit={perpage}
              tableHead={tableHead}
              tableData={tableData}
              handlePagination={this._handlePagination}
              getAllKycListRequesting={getAllKycListRequesting}
            />
          </Card>
        </div>
      </div>
    );
  }
}

AdminKyc.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // adminKyc: makeSelectAdminKyc(),
  getAllKycListSuccess: makeSelectGetAllKycListSuccess(),
  getAllKycListFailure: makeSelectGetAllKycListFailure(),
  getAllKycListSuccessMsg: makeSelectGetAllKycListSuccessMsg(),
  getAllKycListFailureMsg: makeSelectGetAllKycListFailureMsg(),
  getAllKycListRequesting: makeSelectGetAllKycListRequesting(),
  getAllKycListResponse: makeSelectGetAllKycListResponse(),
  getKycStatusSuccess: makeSelectGetKycStatusSuccess(),
  getKycStatusFailure: makeSelectGetKycStatusFailure(),
  getKycStatusSuccessMsg: makeSelectGetKycStatusSuccessMsg(),
  getKycStatusFailureMsg: makeSelectGetKycStatusFailureMsg(),
  getKycStatusRequesting: makeSelectGetKycStatusRequesting(),
  getKycStatusResponse: makeSelectGetKycStatusResponse(),

  deleteKycSuccess: makeSelectDeleteKycSuccess(),
  deleteKycFailure: makeSelectDeleteKycFailure(),
  deleteKycSuccessMsg: makeSelectDeleteKycSuccessMsg(),
  deleteKycFailureMsg: makeSelectDeleteKycFailureMsg(),
  deleteKycRequesting: makeSelectDeleteKycRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getAllKycListRequest: queryParams =>
    dispatch(getAllKycListRequest(queryParams)),
  getKycStatusRequest: () => dispatch(getKycStatusRequest()),
  deleteKycRequest: reqObj => dispatch(deleteKycRequest(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'adminKyc', saga });
const withReducer = injectReducer({ key: 'adminKyc', reducer });

export default compose(withReducer, withSaga, withConnect)(AdminKyc);
