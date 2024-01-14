/**
 *
 * AddressManagement
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import {
  Card,
  Grid,
  Input,
  Label,
  Modal,
  Button,
  Message,
  Dropdown,
  Loader,
} from 'semantic-ui-react';

import DeletedAddressTable from './components/DeletedAddressTable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectRecoverAddressSuccess,
  makeSelectRecoverAddressFailure,
  makeSelectRecoverAddressSuccessMsg,
  makeSelectRecoverAddressFailureMsg,
  makeSelectRecoverAddressRequesting,
  makeSelectFetchAllDeletedAddressSuccess,
  makeSelectFetchAllDeletedAddressFailure,
  makeSelectFetchAllDeletedAddressResponse,
  makeSelectFetchAllDeletedAddressRequesting,
  makeSelectFetchAllDeletedAddressSuccessMsg,
  makeSelectFetchAllDeletedAddressFailureMsg,
  makeSelectUpdateAddressBalanceSuccess,
  makeSelectUpdateAddressBalanceFailure,
  makeSelectUpdateAddressBalanceSuccessMsg,
  makeSelectUpdateAddressBalanceFailureMsg,
  makeSelectUpdateAddressBalanceRequesting,
} from './selectors';
import {
  recoverAddressRequest,
  updateAddressBalanceRequest,
  fetchAllDeletedAddressRequest,
} from './actions';
import saga from './saga';
import reducer from './reducer';

const SORT_BY = [
  { key: 1, text: 'Ascending', value: 'asc' },
  { key: 2, text: 'Descending', value: 'desc' },
];

/* eslint-disable react/prefer-stateless-function */
export class AddressManagement extends React.Component {
  state = {
    queryParams: {
      sort: 'desc',
      perpage: 10,
      address: '',
      email: '',
      currentpage: 1,
    },
    modalData: {
      email: '',
      address: '',
    },
    addressToUpdate: '',
    sortByOptions: SORT_BY,
    selectedSortingType: 'desc',

    isRecoverModalOpen: false,
  };
  componentDidMount = () => {
    const { queryParams } = this.state;
    this.props.fetchAllDeletedAddressRequest(queryParams);
    return;
  };
  componentDidUpdate(prevProps) {
    const { queryParams } = this.state;
    if (
      this.props.fetchAllDeletedAddressFailure &&
      prevProps.fetchAllDeletedAddressFailureMsg !=
        this.props.fetchAllDeletedAddressFailureMsg
    ) {
      toast.error(this.props.fetchAllDeletedAddressFailureMsg);
    }
    if (
      this.props.recoverAddressFailure &&
      prevProps.recoverAddressFailureMsg != this.props.recoverAddressFailureMsg
    ) {
      toast.error(this.props.recoverAddressFailureMsg);
    }
    if (
      this.props.recoverAddressSuccess &&
      prevProps.recoverAddressSuccessMsg != this.props.recoverAddressSuccessMsg
    ) {
      toast.success(this.props.recoverAddressSuccessMsg);
      this.setState(
        {
          isModalOpen: false,
          modalData: {
            email: '',
            address: '',
          },
        },
        () => this.props.fetchAllDeletedAddressRequest(queryParams),
      );
    }
    if (
      this.props.updateAddressBalanceFailure &&
      prevProps.updateAddressBalanceFailureMsg !=
        this.props.updateAddressBalanceFailureMsg
    ) {
      toast.error(this.props.updateAddressBalanceFailureMsg);
    }
    if (
      this.props.updateAddressBalanceSuccess &&
      prevProps.updateAddressBalanceSuccessMsg !=
        this.props.updateAddressBalanceSuccessMsg
    ) {
      this.setState({
        addressToUpdate: '',
      });
      toast.success(this.props.updateAddressBalanceSuccessMsg);
    }
  }
  handleOnSearchFieldChange = (event, data) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        address: data.value,
      },
    });
    return;
  };

  handleOnSearchEmailFieldChange = (event, data) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        email: data.value,
      },
    });
    return;
  };

  handleOnUpdateFieldChange = (event, data) => {
    this.setState({
      addressToUpdate: data.value,
    });
    return;
  };

  onSearch = event => {
    const { queryParams } = this.state;
    this.props.fetchAllDeletedAddressRequest(queryParams);
    return;
  };

  handleOnSortByOptionChange = (event, data) => {
    const { queryParams } = this.state;
    this.setState({
      queryParams: {
        ...queryParams,
        sort: data.value,
      },
      selectedSortingType: data.value,
    });
    this.props.fetchAllDeletedAddressRequest({
      ...queryParams,
      sort: data.value,
    });
  };

  _onUpdateAddressBalance = event => {
    this.props.updateAddressBalanceRequest({
      address: this.state.addressToUpdate,
    });
    return;
  };

  _handleOnUpdateKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.updateAddressBalanceRequest({
        address: this.state.addressToUpdate,
      });
      return;
    }
  };

  _handlePagination = data => {
    const { queryParams } = this.state;
    this.props.fetchAllDeletedAddressRequest({
      ...queryParams,
      currentpage: data.currentPage,
    });
    return;
  };

  _handleOnSearchKeyPress = event => {
    if (event.key === 'Enter') {
      const { queryParams } = this.state;
      this.props.fetchAllDeletedAddressRequest(queryParams);
      return;
    }
  };

  _showDetailOnModal = (email, address) => {
    this.setState({
      isModalOpen: true,
      modalData: {
        email,
        address,
      },
    });
  };

  _hideModal = () => {
    this.setState({
      isModalOpen: false,
      modalData: {
        email: '',
        address: '',
      },
    });
  };
  _recoverAddress = () => {
    const {
      modalData: { email, address },
    } = this.state;
    this.props.recoverAddressRequest({ email, address });
    return;
  };
  render() {
    const {
      modalData,
      isModalOpen,
      queryParams: { perpage },
    } = this.state;

    const tableHead = [
      'Address',
      'Email',
      'Balance',
      'Address Type',
      'Balance',
      'Action',
    ];
    const {
      recoverAddressRequesting,
      fetchAllDeletedAddressRequesting,
    } = this.props;

    const tableData =
      this.props.fetchAllDeletedAddressResponse.toJS() &&
      this.props.fetchAllDeletedAddressResponse.toJS().data &&
      this.props.fetchAllDeletedAddressResponse.toJS().data.length > 0
        ? this.props.fetchAllDeletedAddressResponse
            .toJS()
            .data.map(
              ({
                id,
                address,
                address_type,
                balance,
                currency_name,
                email,
              }) => [
                address,
                email,
                balance,
                address_type,
                currency_name,
                <>
                  <Button
                    circular
                    color="blue"
                    icon="eye"
                    onClick={() => this._showDetailOnModal(email, address)}
                  />
                </>,
              ],
            )
        : [];
    return (
      <div>
        <Helmet>
          <title>Address Management</title>
          <meta
            name="description"
            content="Description of Address Management"
          />
        </Helmet>
        <h2 className="mb-4">Address Management</h2>
        <div className="mb-4">
          <Card>
            <h3 className="mb-4">Update Address Balance</h3>
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={14}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  value={this.state.addressToUpdate}
                  placeholder="Address To Update Balance"
                  onKeyPress={this._handleOnUpdateKeyPress}
                  onChange={this.handleOnUpdateFieldChange}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={3} computer={2}>
                <Button
                  color="orange"
                  size="large"
                  fluid
                  disabled={this.props.updateAddressBalanceRequesting}
                  onClick={this._onUpdateAddressBalance}
                >
                  Update
                </Button>
              </Grid.Column>
            </Grid>
          </Card>
        </div>
        <div>
          <Card>
            <h3 className="mb-4">Deleted Address</h3>
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search By Address"
                  onKeyPress={this._handleOnSearchKeyPress}
                  onChange={this.handleOnSearchFieldChange}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search By Email"
                  onKeyPress={this._handleOnSearchKeyPress}
                  onChange={this.handleOnSearchEmailFieldChange}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={3} computer={2}>
                <Button
                  color="orange"
                  size="large"
                  fluid
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

            <DeletedAddressTable
              count={
                this.props.fetchAllDeletedAddressResponse.toJS() &&
                this.props.fetchAllDeletedAddressResponse.toJS().total_count
                  ? this.props.fetchAllDeletedAddressResponse.toJS().total_count
                  : 0
              }
              pagelimit={perpage}
              tableHead={tableHead}
              tableData={tableData}
              handlePagination={this._handlePagination}
              fetchAllDeletedAddressRequesting={
                fetchAllDeletedAddressRequesting
              }
            />
          </Card>

          <Modal size={'small'} open={isModalOpen}>
            <Modal.Header>Do you want to recover address?</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p>
                  Recover Address :{' '}
                  {`${modalData.address} For ${modalData.email}`}
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                positive
                disabled={this.props.recoverAddressRequesting}
                onClick={() => this._recoverAddress()}
              >
                Recover
              </Button>
              <Button
                color="red"
                disabled={this.props.recoverAddressRequesting}
                onClick={() => this._hideModal()}
              >
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

AddressManagement.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  recoverAddressSuccess: makeSelectRecoverAddressSuccess(),
  recoverAddressFailure: makeSelectRecoverAddressFailure(),
  recoverAddressSuccessMsg: makeSelectRecoverAddressSuccessMsg(),
  recoverAddressFailureMsg: makeSelectRecoverAddressFailureMsg(),
  recoverAddressRequesting: makeSelectRecoverAddressRequesting(),
  fetchAllDeletedAddressSuccess: makeSelectFetchAllDeletedAddressSuccess(),
  fetchAllDeletedAddressFailure: makeSelectFetchAllDeletedAddressFailure(),
  fetchAllDeletedAddressResponse: makeSelectFetchAllDeletedAddressResponse(),
  fetchAllDeletedAddressSuccessMsg: makeSelectFetchAllDeletedAddressSuccessMsg(),
  fetchAllDeletedAddressFailureMsg: makeSelectFetchAllDeletedAddressFailureMsg(),
  fetchAllDeletedAddressRequesting: makeSelectFetchAllDeletedAddressRequesting(),

  updateAddressBalanceSuccess: makeSelectUpdateAddressBalanceSuccess(),
  updateAddressBalanceFailure: makeSelectUpdateAddressBalanceFailure(),
  updateAddressBalanceSuccessMsg: makeSelectUpdateAddressBalanceSuccessMsg(),
  updateAddressBalanceFailureMsg: makeSelectUpdateAddressBalanceFailureMsg(),
  updateAddressBalanceRequesting: makeSelectUpdateAddressBalanceRequesting(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllDeletedAddressRequest: queryParams =>
    dispatch(fetchAllDeletedAddressRequest(queryParams)),
  recoverAddressRequest: data => dispatch(recoverAddressRequest(data)),
  updateAddressBalanceRequest: reqObj =>
    dispatch(updateAddressBalanceRequest(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addressManagement', reducer });
const withSaga = injectSaga({ key: 'addressManagement', saga });

export default compose(withReducer, withSaga, withConnect)(AddressManagement);
