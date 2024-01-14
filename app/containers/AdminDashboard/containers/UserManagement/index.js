/**
 *
 * UserManagement
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import {
  Card,
  Grid,
  Dropdown,
  Input,
  Button,
  Label,
  Modal,
  Header,
  Icon,
} from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectGetAllCustomerListSuccess,
  makeSelectGetAllCustomerListFailure,
  makeSelectGetAllCustomerListResponse,
  makeSelectGetAllCustomerListRequesting,
  makeSelectGetAllCustomerListSuccessMsg,
  makeSelectGetAllCustomerListFailureMsg,
  makeSelectDeleteAdminSuccess,
  makeSelectDeleteAdminFailure,
  makeSelectDeleteAdminRequesting,
  makeSelectDeleteAdminSuccessMsg,
  makeSelectDeleteAdminFailureMsg,
  makeSelectDeleteCustomerSuccess,
  makeSelectDeleteCustomerFailure,
  makeSelectDeleteCustomerRequesting,
  makeSelectDeleteCustomerSuccessMsg,
  makeSelectDeleteCustomerFailureMsg,
} from './selectors';
import {
  getAllCustomerListRequest,
  deleteAdminRequest,
  deleteCustomerRequest,
} from './actions';

import saga from './saga';
import reducer from './reducer';

import overviewSaga from '../GoogleAnalytics/sagas';
import overviewReducer from '../GoogleAnalytics/reducer';

import CustomerModule from './CustomerModule';

const USER_ROLES = [
  {
    key: 1,
    name: 'Customer',
  },
  {
    key: 2,
    name: 'Admin',
  },
  {
    key: 3,
    name: 'Manager',
  },
  {
    key: 4,
    name: 'Superadmin',
  },
];

const USER_TYPES_OPTIONS = [
  { key: 'Admin', text: 'Admin', value: 'admin' },
  { key: 'Customer', text: 'Customer', value: 'customer' },
];

const SORT_BY = [
  { key: 1, text: 'Ascending', value: 'asc' },
  { key: 2, text: 'Descending', value: 'desc' },
];

const ORDER_BY = [{ key: 1, text: 'Timestamp', value: 'timestamp' }];

/* eslint-disable react/prefer-stateless-function */
export class UserManagement extends React.Component {
  state = {
    queryParams: {
      email: '',
      sort: 'desc',
      perpage: 10,
      currentpage: 1,
      order: 'timestamp',
    },
    showDeleteModal: false,
    sortByOptions: SORT_BY,
    orderByOption: ORDER_BY,
    selectedSortingType: 'desc',
    selectedUserType:
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.userType,
    selectedOrderType: 'timestamp',
    userTypeOptions: USER_TYPES_OPTIONS,
    userIdToDelete: '',
  };

  componentDidMount() {
    const { queryParams, selectedUserType } = this.state;
    this.props.getAllCustomerListRequest(queryParams, selectedUserType);
    return;
  }

  componentDidUpdate = prevProps => {
    const {
      match: {
        params: { userType },
      },
    } = prevProps;
    const { queryParams, selectedUserType } = this.state;
    if (
      this.props.match.params.userType &&
      this.props.match.params.userType !== userType
    ) {
      this.setState({
        selectedUserType: this.props.match.params.userType,
      });
      this.props.getAllCustomerListRequest(
        queryParams,
        this.props.match.params.userType,
      );
      return;
    }
    if (
      this.props.deleteAdminSuccess &&
      this.props.deleteAdminSuccessMsg !== prevProps.deleteAdminSuccessMsg
    ) {
      this._handleDeleteModal();
      toast.success(this.props.deleteAdminSuccessMsg);
      this.props.getAllCustomerListRequest(queryParams, selectedUserType);
    }
    if (
      this.props.deleteAdminFailure &&
      this.props.deleteAdminFailureMsg !== prevProps.deleteAdminFailureMsg
    ) {
      this._handleDeleteModal();
      toast.error(this.props.deleteAdminFailureMsg);
    }
    if (
      this.props.deleteCustomerSuccess &&
      this.props.deleteCustomerSuccessMsg !== prevProps.deleteCustomerSuccessMsg
    ) {
      this._handleDeleteModal();
      toast.success(this.props.deleteCustomerSuccessMsg);
      this.props.getAllCustomerListRequest(queryParams, selectedUserType);
    }
    if (
      this.props.deleteCustomerFailure &&
      this.props.deleteCustomerFailureMsg !== prevProps.deleteCustomerFailureMsg
    ) {
      this._handleDeleteModal();
      toast.error(this.props.deleteCustomerFailureMsg);
    }

    if (
      this.props.getAllCustomerListFailure &&
      this.props.getAllCustomerFailureMsg !== prevProps.getAllCustomerFailureMsg
    ) {
      toast.error(this.props.getAllCustomerFailureMsg);
      this.props.history.push(`/admin/dashboard/user-management/customer`);
    }
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleOnDropdownChange = (event, data) => {
    const { queryParams } = this.state;
    this.setState({
      selectedUserType: data.value,
    });
    this.props.getAllCustomerListRequest(queryParams, data.value);
    return;
  };

  handleOnSortByOptionChange = (event, data) => {
    const { queryParams, selectedUserType } = this.state;
    this.setState({
      queryParams: {
        ...queryParams,
        sort: data.value,
      },
      selectedSortingType: data.value,
    });
    this.props.getAllCustomerListRequest(
      {
        ...queryParams,
        sort: data.value,
      },
      selectedUserType,
    );
  };

  handleOnOrderByOptionChange = (event, data) => {
    const { queryParams, selectedUserType } = this.state;
    this.setState({
      queryParams: {
        ...queryParams,
        order: data.value,
      },
      selectedOrderType: data.value,
    });
    this.props.getAllCustomerListRequest(
      {
        ...queryParams,
        order: data.value,
      },
      selectedUserType,
    );
  };

  handleOnSearchFieldChange = (event, data) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        email: data.value,
      },
    });
    return;
  };

  onSearch = event => {
    const { queryParams, selectedUserType } = this.state;
    this.props.getAllCustomerListRequest(queryParams, selectedUserType);
    return;
  };

  _handleOnSearchKeyPress = event => {
    if (event.key === 'Enter') {
      const { queryParams, selectedUserType } = this.state;
      this.props.getAllCustomerListRequest(queryParams, selectedUserType);
      return;
    }
  };

  _handlePagination = data => {
    const { queryParams, selectedUserType } = this.state;
    this.props.getAllCustomerListRequest(
      {
        ...queryParams,
        currentpage: data.currentPage,
      },
      selectedUserType,
    );
    return;
  };

  _handleDeleteModal = (id = '') => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      userIdToDelete: id,
    });
  };

  _deleteUser = () => {
    const { userIdToDelete, selectedUserType } = this.state;
    // console.log({ userIdToDelete, selectedUserType });
    if (selectedUserType === 'customer') {
      this.props.deleteCustomerRequest(userIdToDelete);
      return;
    }
    this.props.deleteAdminRequest(userIdToDelete);
  };

  render() {
    const {
      queryParams: { perpage },
      selectedUserType,
      showDeleteModal,
    } = this.state;
    const tableHead =
      selectedUserType === 'customer'
        ? ['Email', 'Username', 'KYC Status', 'Status', 'Action']
        : ['Email', 'First Name', 'Last Name', 'Role', 'Status', 'Action'];
    const { getAllCustomerRequesting } = this.props;
    const tableData =
      selectedUserType === 'customer'
        ? this.props.getAllCustomerListResponse.toJS() &&
          this.props.getAllCustomerListResponse.toJS().data &&
          this.props.getAllCustomerListResponse.toJS().data.length > 0
          ? this.props.getAllCustomerListResponse
              .toJS()
              .data.map(({ uuid, email, username, verified, kyc_status }) => [
                email,
                username,
                kyc_status === 0 ? (
                  <Label color="red"> Not Verified </Label>
                ) : (
                  <Label color="green">Verified</Label>
                ),
                verified === 0 ? (
                  <Label color="yellow"> Not Active </Label>
                ) : (
                  <Label color="green">Active</Label>
                ),
                <>
                  {/* <Button circular color="blue" icon="pencil alternate" /> */}
                  <Button
                    circular
                    color="blue"
                    icon="eye"
                    onClick={() => {
                      this.props.history.push(
                        `/admin/dashboard/user-management/customer-detail/${uuid}`,
                      );
                    }}
                  />
                  <Button
                    circular
                    color="red"
                    icon="trash alternate outline"
                    onClick={() => this._handleDeleteModal(uuid)}
                  />
                </>,
              ])
          : []
        : this.props.getAllCustomerListResponse.toJS() &&
          this.props.getAllCustomerListResponse.toJS().data &&
          this.props.getAllCustomerListResponse.toJS().data.length > 0
        ? this.props.getAllCustomerListResponse
            .toJS()
            .data.map(
              ({ uuid, email, verified, first_name, last_name, role }) => [
                email,
                first_name,
                last_name,
                <Label color="green">
                  {USER_ROLES.find(adminRole => adminRole.key === role)?.name ||
                    'N/A'}
                </Label>,
                verified === 0 ? (
                  <Label color="yellow"> Not Active </Label>
                ) : (
                  <Label color="violet">Active</Label>
                ),
                <>
                  <Button
                    circular
                    color="orange"
                    icon="eye"
                    onClick={() =>
                      this.props.history.push(
                        `/admin/dashboard/user-management/admin-detail/${uuid}`,
                        {
                          role,
                          email,
                          verified,
                          last_name,
                          first_name,
                        },
                      )
                    }
                  />
                  {/* <Button circular color="orange" icon="eye" /> */}
                  <Button
                    circular
                    color="red"
                    icon="trash alternate outline"
                    onClick={() => this._handleDeleteModal(uuid)}
                  />
                </>,
              ],
            )
        : [];

    return (
      <div>
        <Helmet>
          <title>
            {this.capitalizeFirstLetter(this.state.selectedUserType)} Management
          </title>
          <meta name="description" content="Description of UserManagement" />
        </Helmet>
        <Grid className="align-items-center">
          <Grid.Column mobile={9} computer={12}>
            <h2 className="mb-4">
              {this.capitalizeFirstLetter(this.state.selectedUserType)}{' '}
              Management
            </h2>
          </Grid.Column>
          {/* <Grid.Column textAlign="right" mobile={4} computer={4}>
            <div>
              <Dropdown
                button
                labeled
                floating
                icon="user"
                className="icon"
                options={this.state.userTypeOptions}
                onChange={this.handleOnDropdownChange}
                defaultValue={this.state.selectedUserType}
              />
            </div>
          </Grid.Column> */}
        </Grid>
        <div>
          <Card className="mt-3">
            <Grid>
              <Grid.Column mobile={16} computer={12}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search By Email Address"
                  onKeyPress={this._handleOnSearchKeyPress}
                  onChange={this.handleOnSearchFieldChange}
                />
              </Grid.Column>
              <Grid.Column mobile={8} computer={2}>
                <Button
                  fluid
                  size="large"
                  color="orange"
                  onClick={this.onSearch}
                >
                  Search
                </Button>
              </Grid.Column>
              <Grid.Column textAlign="right" mobile={8} computer={2}>
                <Dropdown
                  button
                  labeled
                  floating
                  icon="filter"
                  className="icon"
                  options={this.state.sortByOptions}
                  onChange={this.handleOnSortByOptionChange}
                  defaultValue={this.state.selectedSortingType}
                />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={10}>
                <h3 className="mb-3">
                  {this.capitalizeFirstLetter(this.state.selectedUserType)} List
                </h3>
              </Grid.Column>
              {this.state.selectedUserType === 'admin' && (
                <Grid.Column textAlign="right" width={6}>
                  <Link
                    className="nav__link"
                    to={`/admin/dashboard/user-management/create/admin`}
                  >
                    <span className="nav__text">Create Admin</span>
                  </Link>
                </Grid.Column>
              )}
            </Grid>
            <CustomerModule
              count={
                this.props.getAllCustomerListResponse.toJS() &&
                this.props.getAllCustomerListResponse.toJS().total_count
                  ? this.props.getAllCustomerListResponse.toJS().total_count
                  : 0
              }
              pagelimit={perpage}
              tableHead={tableHead}
              tableData={tableData}
              handlePagination={this._handlePagination}
              getAllCustomerRequesting={getAllCustomerRequesting}
            />
          </Card>
        </div>
        <Modal
          open={showDeleteModal}
          // onClose={this._handleDeleteModal}
          // onOpen={this._handleDeleteModal}
        >
          <Header icon="archive" content="Delete User" />
          <Modal.Content>
            <p>Are you sure. You want to delete user?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              onClick={this._handleDeleteModal}
              disabled={
                this.props.deleteAdminRequesting ||
                this.props.deleteCustomerRequesting
              }
            >
              <Icon name="remove" /> No
            </Button>
            <Button
              color="green"
              onClick={this._deleteUser}
              loading={
                this.props.deleteAdminRequesting ||
                this.props.deleteCustomerRequesting
              }
              disabled={
                this.props.deleteAdminRequesting ||
                this.props.deleteCustomerRequesting
              }
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

UserManagement.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getAllCustomerListSuccess: makeSelectGetAllCustomerListSuccess(),
  getAllCustomerListFailure: makeSelectGetAllCustomerListFailure(),
  getAllCustomerSuccessMsg: makeSelectGetAllCustomerListSuccessMsg(),
  getAllCustomerFailureMsg: makeSelectGetAllCustomerListFailureMsg(),
  getAllCustomerRequesting: makeSelectGetAllCustomerListRequesting(),
  getAllCustomerListResponse: makeSelectGetAllCustomerListResponse(),

  deleteAdminSuccess: makeSelectDeleteAdminSuccess(),
  deleteAdminFailure: makeSelectDeleteAdminFailure(),
  deleteAdminRequesting: makeSelectDeleteAdminRequesting(),
  deleteAdminSuccessMsg: makeSelectDeleteAdminSuccessMsg(),
  deleteAdminFailureMsg: makeSelectDeleteAdminFailureMsg(),
  deleteCustomerSuccess: makeSelectDeleteCustomerSuccess(),
  deleteCustomerFailure: makeSelectDeleteCustomerFailure(),
  deleteCustomerRequesting: makeSelectDeleteCustomerRequesting(),
  deleteCustomerSuccessMsg: makeSelectDeleteCustomerSuccessMsg(),
  deleteCustomerFailureMsg: makeSelectDeleteCustomerFailureMsg(),
});
const mapDispatchToProps = dispatch => ({
  getAllCustomerListRequest: (queryParams, userType) =>
    dispatch(getAllCustomerListRequest(queryParams, userType)),
  deleteAdminRequest: id => dispatch(deleteAdminRequest(id)),
  deleteCustomerRequest: id => dispatch(deleteCustomerRequest(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withOverviewReducer = injectReducer({
  key: 'googleAnalytics',
  reducer: overviewReducer,
});
const withOverviewSaga = injectSaga({
  key: 'googleAnalytics',
  saga: overviewSaga,
});
const withSaga = injectSaga({ key: 'userManagement', saga });
const withReducer = injectReducer({ key: 'userManagement', reducer });

export default compose(
  withReducer,
  withSaga,
  withOverviewSaga,
  withOverviewReducer,
  withConnect,
)(UserManagement);
