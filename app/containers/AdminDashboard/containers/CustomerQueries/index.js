/**
 *
 * CustomerQueries
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
  Header,
  Loader,
  Icon,
} from 'semantic-ui-react';

import CustomerQueriesTable from './components/CustomerQueriesTable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectCustomerQueriesSuccess,
  makeSelectCustomerQueriesFailure,
  makeSelectCustomerQueriesResponse,
  makeSelectCustomerQueriesSuccessMsg,
  makeSelectCustomerQueriesFailureMsg,
  makeSelectCustomerQueriesRequesting,
  makeSelectUpdateResolveStatusSuccess,
  makeSelectUpdateResolveStatusFailure,
  makeSelectUpdateResolveStatusSuccessMsg,
  makeSelectUpdateResolveStatusFailureMsg,
  makeSelectUpdateResolveStatusRequesting,
  makeSelectDeleteCustomerQuerySuccess,
  makeSelectDeleteCustomerQueryFailure,
  makeSelectDeleteCustomerQuerySuccessMsg,
  makeSelectDeleteCustomerQueryFailureMsg,
  makeSelectDeleteCustomerQueryRequesting,
} from './selectors';
import {
  getAllCustomerQueriesRequest,
  updateResolveStatusRequest,
  deleteCustomerQueryRequest,
} from './actions';

import saga from './saga';
import reducer from './reducer';

const SORT_BY = [
  { key: 1, text: 'Ascending', value: 'asc' },
  { key: 2, text: 'Descending', value: 'desc' },
];

// const ORDER_BY = [{ key: 1, text: 'Timestamp', value: 'timestamp' }];
const ORDER_BY = [
  { key: 1, text: 'Created At', value: 'created_at' },
  { key: 2, text: 'Resolved', value: 'resolved' },
];

/* eslint-disable react/prefer-stateless-function */
export class CustomerQueries extends React.Component {
  state = {
    queryParams: {
      email: '',
      sort: 'desc',
      perpage: 10,
      currentpage: 1,
      order: 'created_at',
    },
    sortByOptions: SORT_BY,
    orderByOption: ORDER_BY,
    selectedSortingType: 'desc',
    selectedOrderType: 'created_at',
    isModalOpen: false,
    modalData: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    requestingId: '',
    ticketIdToDelete: '',
    isCustomerQueryDeleteModalVisible: false,
  };

  componentDidMount = () => {
    const { queryParams } = this.state;
    this.props.getAllCustomerQueriesRequest(queryParams);
    return;
  };

  componentDidUpdate(prevProps) {
    const { queryParams } = this.state;
    if (
      this.props.updateResolveStatusFailure &&
      prevProps.updateResolveStatusFailureMsg !=
        this.props.updateResolveStatusFailureMsg
    ) {
      toast.error(this.props.updateResolveStatusFailureMsg);
    }

    if (
      this.props.deleteCustomerQueryFailureMsg !==
        prevProps.deleteCustomerQueryFailureMsg &&
      this.props.deleteCustomerQueryFailure
    ) {
      toast.error(this.props.deleteCustomerQueryFailureMsg);
    }

    if (
      this.props.deleteCustomerQuerySuccessMsg !==
        prevProps.deleteCustomerQuerySuccessMsg &&
      this.props.deleteCustomerQuerySuccess
    ) {
      toast.success(this.props.deleteCustomerQuerySuccessMsg);
      this._handleDeleteCustomerQueryModal();
      this.props.getAllCustomerQueriesRequest(queryParams);
    }
  }

  handleOnSortByOptionChange = (event, data) => {
    const { queryParams } = this.state;
    this.setState({
      queryParams: {
        ...queryParams,
        sort: data.value,
      },
      selectedSortingType: data.value,
    });
    this.props.getAllCustomerQueriesRequest({
      ...queryParams,
      sort: data.value,
    });
  };

  handleOnOrderByOptionChange = (event, data) => {
    const { queryParams } = this.state;
    this.setState({
      queryParams: {
        ...queryParams,
        order: data.value,
      },
      selectedOrderType: data.value,
    });
    this.props.getAllCustomerQueriesRequest({
      ...queryParams,
      order: data.value,
    });
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
    const { queryParams } = this.state;
    this.props.getAllCustomerQueriesRequest(queryParams);
    return;
  };

  _handlePagination = data => {
    const { queryParams } = this.state;
    this.props.getAllCustomerQueriesRequest({
      ...queryParams,
      currentpage: data.currentPage,
    });
    return;
  };

  _hideModal = () => {
    this.setState({
      isModalOpen: false,
      modalData: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
    });
  };

  _handleOnSearchKeyPress = event => {
    if (event.key === 'Enter') {
      const { queryParams } = this.state;
      this.props.getAllCustomerQueriesRequest(queryParams);
      return;
    }
  };

  _showDetailOnModal = (email, name, subject, message) => {
    this.setState({
      isModalOpen: true,
      modalData: {
        name,
        email,
        subject,
        message,
      },
    });
  };

  _updateResolveStatus = (uuid, resolved) => {
    if (this.props.updateResolveStatusRequesting) {
      toast.error('Wait for sometime. Action in pending already.');
      return;
    }
    this.setState({
      requestingId: uuid,
    });
    this.props.updateResolveStatusRequest({
      id: uuid,
      resolved: resolved === 0 ? 1 : 0,
    });
    return;
  };

  _handleDeleteCustomerQueryModal = (ticketId = '') => {
    this.setState({
      isCustomerQueryDeleteModalVisible: !this.state
        .isCustomerQueryDeleteModalVisible,
      ticketIdToDelete: ticketId,
    });
    return;
  };

  _deleteTicket = () => {
    const { ticketIdToDelete } = this.state;
    this.props.deleteCustomerQueryRequest({ ticketId: ticketIdToDelete });
    return;
  };

  render() {
    const {
      queryParams: { perpage },
      modalData,
      isModalOpen,
      requestingId,
      isCustomerQueryDeleteModalVisible,
    } = this.state;

    const tableHead = ['Name', 'Email', 'Subject', 'Status', 'Action'];
    const {
      getAllCustomerQueriesRequesting,
      updateResolveStatusRequesting,
      deleteCustomerQueryRequesting,
    } = this.props;

    const tableData =
      this.props.getAllCustomerQueriesResponse.toJS() &&
      this.props.getAllCustomerQueriesResponse.toJS().data &&
      this.props.getAllCustomerQueriesResponse.toJS().data.length > 0
        ? this.props.getAllCustomerQueriesResponse
            .toJS()
            .data.map(({ id, email, name, subject, resolved, message }) => [
              name,
              email,
              subject,
              requestingId === id && updateResolveStatusRequesting ? (
                <Loader active inline size="tiny" />
              ) : resolved === 0 ? (
                <Label
                  color="red"
                  style={{ cursor: 'pointer' }}
                  onClick={() => this._updateResolveStatus(id, resolved)}
                >
                  {' '}
                  Unresolved{' '}
                </Label>
              ) : (
                <Label
                  color="green"
                  disabled
                  // style={{ cursor: 'pointer' }}
                  // onClick={() => this._updateResolveStatus(id, resolved)}
                >
                  Resolved
                </Label>
              ),
              <>
                <Button
                  circular
                  color="blue"
                  icon="eye"
                  onClick={() =>
                    this._showDetailOnModal(email, name, subject, message)
                  }
                />
                <Button
                  circular
                  color="red"
                  icon="trash"
                  onClick={() => this._handleDeleteCustomerQueryModal(id)}
                />
              </>,
            ])
        : [];

    return (
      <div>
        <Helmet>
          <title>Customer Queries</title>
          <meta name="description" content="Description of Customer Queries" />
        </Helmet>
        <h2 className="mb-4">Customer Queries</h2>
        <div>
          <Modal size="mini" open={isCustomerQueryDeleteModalVisible}>
            <Header icon="archive" content="Delete Customer Query" />
            <Modal.Content>
              <p>Are you sure. You want to delete customer query?</p>
            </Modal.Content>

            <Modal.Actions>
              <Button
                color="red"
                disabled={deleteCustomerQueryRequesting}
                onClick={this._handleDeleteCustomerQueryModal}
              >
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={this._deleteTicket}
                loading={deleteCustomerQueryRequesting}
                disabled={deleteCustomerQueryRequesting}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div>
          <Card>
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={9}>
                <Input
                  fluid
                  icon="search"
                  iconPosition="left"
                  placeholder="Search By Email Address"
                  onKeyPress={this._handleOnSearchKeyPress}
                  onChange={this.handleOnSearchFieldChange}
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
              <Grid.Column textAlign="right" mobile={7} tablet={3} computer={2}>
                <Dropdown
                  button
                  labeled
                  floating
                  icon="sort"
                  className="icon"
                  options={this.state.sortByOptions}
                  onChange={this.handleOnSortByOptionChange}
                  defaultValue={this.state.selectedSortingType}
                />
              </Grid.Column>
              <Grid.Column textAlign="right" mobile={7} tablet={6} computer={3}>
                <Dropdown
                  button
                  labeled
                  floating
                  icon="filter"
                  className="icon"
                  options={this.state.orderByOption}
                  onChange={this.handleOnOrderByOptionChange}
                  defaultValue={this.state.selectedOrderType}
                />
              </Grid.Column>
            </Grid>

            <CustomerQueriesTable
              count={
                this.props.getAllCustomerQueriesResponse.toJS() &&
                this.props.getAllCustomerQueriesResponse.toJS().total_count
                  ? this.props.getAllCustomerQueriesResponse.toJS().total_count
                  : 0
              }
              pagelimit={perpage}
              tableHead={tableHead}
              tableData={tableData}
              handlePagination={this._handlePagination}
              getAllCustomerQueriesRequesting={getAllCustomerQueriesRequesting}
            />
          </Card>

          {isModalOpen && (
            <Modal
              size={'small'}
              open={isModalOpen}
              onClose={() => this._hideModal()}
            >
              <Modal.Header>
                Message By: {`${modalData.name} - (${modalData.email})`}
              </Modal.Header>
              <Modal.Content>
                <Message>
                  <Message.Header>
                    Subject: {`${modalData.subject}`}
                  </Message.Header>
                  <p>{`${modalData.message}`}</p>
                </Message>
              </Modal.Content>
              <Modal.Actions>
                <Button positive onClick={() => this._hideModal()}>
                  Close
                </Button>
              </Modal.Actions>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

CustomerQueries.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getAllCustomerQueriesSuccess: makeSelectCustomerQueriesSuccess(),
  getAllCustomerQueriesFailure: makeSelectCustomerQueriesFailure(),
  getAllCustomerQueriesResponse: makeSelectCustomerQueriesResponse(),
  getAllCustomerQueriesSuccessMsg: makeSelectCustomerQueriesSuccessMsg(),
  getAllCustomerQueriesFailureMsg: makeSelectCustomerQueriesFailureMsg(),
  getAllCustomerQueriesRequesting: makeSelectCustomerQueriesRequesting(),
  updateResolveStatusSuccess: makeSelectUpdateResolveStatusSuccess(),
  updateResolveStatusFailure: makeSelectUpdateResolveStatusFailure(),
  updateResolveStatusSuccessMsg: makeSelectUpdateResolveStatusSuccessMsg(),
  updateResolveStatusFailureMsg: makeSelectUpdateResolveStatusFailureMsg(),
  updateResolveStatusRequesting: makeSelectUpdateResolveStatusRequesting(),

  deleteCustomerQuerySuccess: makeSelectDeleteCustomerQuerySuccess(),
  deleteCustomerQueryFailure: makeSelectDeleteCustomerQueryFailure(),
  deleteCustomerQuerySuccessMsg: makeSelectDeleteCustomerQuerySuccessMsg(),
  deleteCustomerQueryFailureMsg: makeSelectDeleteCustomerQueryFailureMsg(),
  deleteCustomerQueryRequesting: makeSelectDeleteCustomerQueryRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getAllCustomerQueriesRequest: queryParams =>
    dispatch(getAllCustomerQueriesRequest(queryParams)),
  updateResolveStatusRequest: data =>
    dispatch(updateResolveStatusRequest(data)),
  deleteCustomerQueryRequest: reqObj =>
    dispatch(deleteCustomerQueryRequest(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customerQueries', reducer });
const withSaga = injectSaga({ key: 'customerQueries', saga });

export default compose(withReducer, withSaga, withConnect)(CustomerQueries);
