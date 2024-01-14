/**
 *
 * Inbox
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Ref,
  Card,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Modal,
  Button,
  Header,
  Sticky,
  Segment,
  Message,
} from 'semantic-ui-react';
import avatarImg from 'assets/images/avatar.png';
import Chat from './Chat';

import {
  makeSelectDeleteTicketSuccess,
  makeSelectDeleteTicketFailure,
  makeSelectDeleteTicketSuccessMsg,
  makeSelectDeleteTicketFailureMsg,
  makeSelectDeleteTicketRequesting,
  makeSelectFetchTicketStatusSuccess,
  makeSelectFetchTicketStatusFailure,
  makeSelectFetchTicketStatusResponse,
  makeSelectFetchTicketStatusSuccessMsg,
  makeSelectFetchTicketStatusFailureMsg,
  makeSelectFetchTicketStatusRequesting,
  makeSelectUpdateTicketStatusSuccess,
  makeSelectUpdateTicketStatusFailure,
  makeSelectUpdateTicketStatusSuccessMsg,
  makeSelectUpdateTicketStatusFailureMsg,
  makeSelectUpdateTicketStatusRequesting,
  makeSelectFetchAllSupportTicketSuccess,
  makeSelectFetchAllSupportTicketFailure,
  makeSelectFetchAllSupportTicketResponse,
  makeSelectFetchAllSupportTicketSuccessMsg,
  makeSelectFetchAllSupportTicketFailureMsg,
  makeSelectFetchAllSupportTicketRequesting,
  makeSelectLoadMoreMessageRequesting,
  makeSelectAllSupportTicketCount,
  makeSelectFetchSpecificTicketAllMessageResponse,
  makeSelectFetchSpecificTicketAllMessageRequesting,
  makeSelectFetchSpecificTicketAllMessageSuccess,
  makeSelectFetchSpecificTicketAllMessageSuccessMsg,
  makeSelectFetchSpecificTicketAllMessageFailure,
  makeSelectFetchSpecificTicketAllMessageFailureMsg,
  makeSelectReplyMessageToSpecificTicketByAdminRequesting,
  makeSelectReplyMessageToSpecificTicketByAdminSuccess,
  makeSelectReplyMessageToSpecificTicketByAdminSuccessMsg,
  makeSelectReplyMessageToSpecificTicketByAdminFailure,
  makeSelectReplyMessageToSpecificTicketByAdminFailureMsg,
} from './selectors';

import saga from './saga';
import reducer from './reducer';

import {
  deleteTicketRequest,
  getNewMessageRequest,
  fetchTicketStatusRequest,
  updateTicketStatusRequest,
  fetchAllSupportTicketRequest,
  fetchSpecificTicketAllMessageRequest,
  listenClientFirstMessage,
  loadMoreMessageRequest,
  replyMessageToSpecificTicketByAdminRequest,
} from './actions';

let intervalId = 0;

/* eslint-disable react/prefer-stateless-function */
export class Inbox extends React.Component {
  state = {
    queryParams: {
      email: '',
      sort: 'asc',
      perpage: 10,
      currentpage: 1,
      status: '',
      order: 'created_at',
    },
    errors: {},
    selectedTicket: '',
    ticketIdToDelete: '',
    updateTicketState: {
      status: 'all',
      ticket_id: '',
    },
    isTicketStatusModalVisible: false,
    isSupportTicketDeleteModalVisible: false,
    typedMessage: '',
    messageList: [],
  };

  contextRef = React.createRef();

  // this.props.fetchSpecificTicketAllMessageRequest(this.props.ticketId);

  componentDidMount = () => {
    const { queryParams } = this.state;
    this._handleSpecificTickeChatModal('');
    this._fetchSupportTicketStatus();
    this.props.fetchAllSupportTicketRequest(queryParams);

    const urlParams = new URLSearchParams(this.props.location.search);
    const ticketId = urlParams.get('ticketId');
    if (ticketId) {
      this._selectedTicket(ticketId);
    }
  };

  _fetchSupportTicketStatus = () => {
    this.props.fetchTicketStatusRequest();
  };

  componentDidUpdate = prevProps => {
    const { queryParams } = this.state;

    const prevParams = new URLSearchParams(prevProps.location.search);
    const newParams = new URLSearchParams(this.props.location.search);

    if (
      newParams.get('ticketId') &&
      newParams.get('ticketId') !== prevParams.get('ticketId')
    ) {
      this._selectedTicket(newParams.get('ticketId'));
    }

    // const urlParams = new URLSearchParams(this.props.location.search);
    // const ticketId = urlParams.get('ticketId');
    // if (ticketId) {
    //   this._selectedTicket(ticketId);
    // }

    if (
      this.props.updateTicketStatusFailureMsg !==
        prevProps.updateTicketStatusFailureMsg &&
      this.props.updateTicketStatusFailure
    ) {
      toast.error(this.props.updateTicketStatusFailureMsg);
    }

    if (
      this.props.updateTicketStatusSuccessMsg !==
        prevProps.updateTicketStatusSuccessMsg &&
      this.props.updateTicketStatusSuccess
    ) {
      toast.success(this.props.updateTicketStatusSuccessMsg);
      this.props.fetchAllSupportTicketRequest(queryParams);
      this._handleTicketStatusModal();
    }

    if (
      this.props.deleteTicketFailureMsg !== prevProps.deleteTicketFailureMsg &&
      this.props.deleteTicketFailure
    ) {
      toast.error(this.props.deleteTicketFailureMsg);
    }

    if (
      this.props.deleteTicketSuccessMsg !== prevProps.deleteTicketSuccessMsg &&
      this.props.deleteTicketSuccess
    ) {
      toast.success(this.props.deleteTicketSuccessMsg);
      this._handleDeleteSupportTicketModal();
      this.props.fetchAllSupportTicketRequest(queryParams);
    }

    if (
      this.props.fetchSpecificTicketAllMessageSuccess &&
      this.props.fetchSpecificTicketAllMessageSuccess !==
        prevProps.fetchSpecificTicketAllMessageSuccess
    ) {
      if (this.state.selectedTicket !== '') {
        this._getNewMessage();
      }
    }
  };

  _getNewMessage = () => {
    intervalId = setInterval(() => {
      if (
        this.props.fetchSpecificTicketAllMessageResponse.toJS() &&
        this.props.fetchSpecificTicketAllMessageResponse.toJS().length !== 0 &&
        !this.props.replyMessageToSpecificTicketByAdminRequesting
      ) {
        this.props.getNewMessageRequest({
          ticket_id: this.state.selectedTicket,
          message_id: this.props.fetchSpecificTicketAllMessageResponse.toJS()[
            this.props.fetchSpecificTicketAllMessageResponse.toJS().length - 1
          ].id,
        });
      }
      if (
        this.props.fetchSpecificTicketAllMessageResponse.toJS() &&
        this.props.fetchSpecificTicketAllMessageResponse.toJS().length === 0 &&
        !this.props.replyMessageToSpecificTicketByAdminRequesting
      ) {
        this.props.listenClientFirstMessage(this.state.selectedTicket);
      }
    }, 3000);
  };

  _convertDate = date => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const today = new Date(date);
    return today.toLocaleDateString('en-US', options);
  };

  _selectedTicket = ticketId => {
    this.setState({
      selectedTicket: ticketId,
    });
    clearInterval(intervalId);
    this.props.fetchSpecificTicketAllMessageRequest(ticketId);
  };

  _handleDeleteSupportTicketModal = (ticketId = '') => {
    this.setState({
      isSupportTicketDeleteModalVisible: !this.state
        .isSupportTicketDeleteModalVisible,
      ticketIdToDelete: ticketId,
    });
  };

  _handleOnMessageType = (event, data) => {
    this.setState({
      typedMessage: data.value,
    });
  };

  _handleOnSearchType = (event, data) => {
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        email: data.value,
      },
    });
  };

  _searchByEmail = () => {
    const { queryParams } = this.state;
    this.props.fetchAllSupportTicketRequest(queryParams);
  };

  _onReply = () => {
    const { selectedTicket, typedMessage } = this.state;
    this.props.replyMessageToSpecificTicketByAdminRequest({
      ticket_id: selectedTicket,
      message: typedMessage,
      is_admin_message: 1,
    });
    this.setState({
      typedMessage: '',
    });
  };

  _handleSpecificTickeChatModal = (ticketId = '') => {
    this.setState({
      selectedTicket: ticketId,
    });
    if (ticketId === '') {
      clearInterval(intervalId);
    }
  };

  _deleteTicket = () => {
    const { ticketIdToDelete } = this.state;
    this.props.deleteTicketRequest(ticketIdToDelete);
  };

  _handleTicketStatusModal = (ticketId, status) => {
    const { isTicketStatusModalVisible, updateTicketState } = this.state;
    if (isTicketStatusModalVisible) {
      this.setState({
        isTicketStatusModalVisible: !isTicketStatusModalVisible,
        updateTicketState: {
          status: '',
          ticket_id: '',
        },
      });
      return;
    }
    this.setState({
      isTicketStatusModalVisible: !isTicketStatusModalVisible,
      updateTicketState: {
        ...updateTicketState,
        status,
        ticket_id: ticketId,
      },
    });
  };

  handleUpdateStatus = e => {
    e.preventDefault();
    const { updateTicketState } = this.state;
    this.props.updateTicketStatusRequest(updateTicketState);
  };

  _handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      this._onReply();
    }
  };

  _handleOnSearchKeyPress = event => {
    if (event.key === 'Enter') {
      this._searchByEmail();
    }
  };

  _handleOnTicketStatusSelect = event => {
    event.persist();
    this.setState(state => ({
      updateTicketState: {
        ...state.updateTicketState,
        status: event.target.value,
      },
    }));
  };

  _fetchChatByStatus = event => {
    event.persist();
    this.props.fetchAllSupportTicketRequest({
      ...this.state.queryParams,
      status: event.target.value,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        status: event.target.value,
      },
    });
  };

  _fetchChatBySorting = event => {
    event.persist();
    this.props.fetchAllSupportTicketRequest({
      ...this.state.queryParams,
      sort: event.target.value,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        sort: event.target.value,
      },
    });
  };

  componentWillUnmount = () => {
    clearInterval(intervalId);
  };

  _loadMoreMessage = () => {
    this.props.loadMoreMessageRequest({
      ...this.state.queryParams,
      currentpage: this.state.queryParams.currentpage + 1,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        currentpage: this.state.queryParams.currentpage + 1,
      },
    });
  };

  render() {
    const {
      selectedTicket,
      queryParams: { perpage },
      isTicketStatusModalVisible,
      isSupportTicketDeleteModalVisible,
    } = this.state;

    const {
      deleteTicketRequesting,
      fetchTicketStatusResponse,
      fetchTicketStatusRequesting,
      updateTicketStatusRequesting,
      fetchAllSupportTicketSuccess,
      fetchAllSupportTicketResponse,
      fetchAllSupportTicketRequesting,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Admin Support Ticket</title>
          <meta name="description" content="Description of Inbox" />
        </Helmet>
        <h2 className="mb-4">Admin Support Ticket</h2>
        <div className="ml-auto">
          <Modal size="mini" open={isSupportTicketDeleteModalVisible}>
            <Header icon="archive" content="Delete Ticket" />
            <Modal.Content>
              <p>Are you sure. You want to delete ticket?</p>
            </Modal.Content>

            <Modal.Actions>
              <Button
                color="red"
                disabled={deleteTicketRequesting}
                onClick={this._handleDeleteSupportTicketModal}
              >
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={this._deleteTicket}
                loading={deleteTicketRequesting}
                disabled={deleteTicketRequesting}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal size="mini" open={isTicketStatusModalVisible}>
            <Header icon="ticket" content="Update Ticket Status" />
            <Modal.Content>
              <Form onSubmit={this.handleUpdateStatus}>
                <Form.Field
                  label="Ticket Status"
                  control="select"
                  onChange={this._handleOnTicketStatusSelect}
                >
                  {fetchTicketStatusResponse.toJS() &&
                    fetchTicketStatusResponse.toJS().length > 0 &&
                    fetchTicketStatusResponse.toJS().map((cat, index) => (
                      <option
                        value={cat.value}
                        key={index}
                        selected={
                          this.state.updateTicketState.status === cat.value
                        }
                      >
                        {cat.text}
                      </option>
                    ))}
                </Form.Field>

                <Button
                  type="submit"
                  loading={
                    fetchTicketStatusRequesting || updateTicketStatusRequesting
                  }
                  disabled={
                    fetchTicketStatusRequesting || updateTicketStatusRequesting
                  }
                >
                  Update
                </Button>
                <Button
                  onClick={this._handleTicketStatusModal}
                  disabled={updateTicketStatusRequesting}
                >
                  Cancel
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Input
                    fluid
                    icon="search"
                    iconPosition="left"
                    onKeyPress={this._handleOnSearchKeyPress}
                    onChange={this._handleOnSearchType}
                    placeholder="Search by Email"
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Button
                    disabled={fetchAllSupportTicketRequesting}
                    size="large"
                    onClick={this._searchByEmail}
                  >
                    {' '}
                    Search
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Ref innerRef={this.contextRef}>
              <Card className="mt-5">
                <h5>Recent Ticket</h5>
                <div>
                  <Form className="d-flex">
                    <Form.Field
                      label="Ticket Status"
                      control="select"
                      onChange={this._fetchChatByStatus}
                      className="mr-2"
                    >
                      <option
                        value=""
                        selected={this.state.updateTicketState.status === ''}
                      >
                        All
                      </option>
                      {fetchTicketStatusResponse.toJS() &&
                        fetchTicketStatusResponse.toJS().length > 0 &&
                        fetchTicketStatusResponse.toJS().map((cat, index) => (
                          <option
                            value={cat.value}
                            key={index}
                            selected={
                              this.state.updateTicketState.status === cat.value
                            }
                          >
                            {cat.text}
                          </option>
                        ))}
                    </Form.Field>

                    <Form.Field
                      label="Sort By"
                      control="select"
                      className="mr-2"
                      onChange={this._fetchChatBySorting}
                    >
                      <option value="aes" selected>
                        Ascending
                      </option>
                      <option value="desc">Descending</option>
                      <option value="status">Status</option>
                    </Form.Field>
                  </Form>
                </div>

                {fetchAllSupportTicketSuccess &&
                  fetchAllSupportTicketResponse.toJS() &&
                  fetchAllSupportTicketResponse.toJS().length === 0 && (
                    <div>No ticket yet</div>
                  )}

                {fetchAllSupportTicketRequesting && <div>Loading.....</div>}

                {fetchAllSupportTicketSuccess &&
                  fetchAllSupportTicketResponse.toJS() &&
                  fetchAllSupportTicketResponse.toJS().length > 0 &&
                  fetchAllSupportTicketResponse.toJS().map((data, index) => (
                    <div
                      key={index}
                      className={
                        data.ticket_id === selectedTicket
                          ? ' media__message py-5 px-3 active'
                          : ' media__message py-5 px-3'
                      }
                      onClick={() => this._selectedTicket(data.ticket_id)}
                    >
                      <div className="image__icon mr-2">
                        <img
                          className="img-fluid"
                          // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                          src={avatarImg}
                          alt=""
                        />
                      </div>
                      <div className="w-100">
                        <div className="d-flex flex-wrap align-items-center mb-1">
                          <span className="gray-400 mr-2">{data.email}</span>
                          <div>{this._convertDate(data.created_at)}</div>
                          <div className="ml-auto mr-2">
                            {data.status === 'pending' ? (
                              <Label color="red">{data.status}</Label>
                            ) : data.status === 'resolve' ? (
                              <Label color="green">{data.status}</Label>
                            ) : (
                              <Label color="blue">{data.status}</Label>
                            )}
                          </div>
                          <>
                            <Button
                              circular
                              color="blue"
                              icon="edit"
                              onClick={() =>
                                this._handleTicketStatusModal(
                                  data.ticket_id,
                                  data.status,
                                )
                              }
                            />
                            <Button
                              circular
                              color="red"
                              icon="trash"
                              onClick={() =>
                                this._handleDeleteSupportTicketModal(
                                  data.ticket_id,
                                )
                              }
                            />
                          </>
                        </div>

                        <span className="pr-3 m">
                          <Label>{data.username}</Label>
                        </span>
                        <span className="primary">
                          Ticket: {data.ticket_id}
                        </span>
                        <h3 className="mt-4 mb-2">{data.subject}</h3>
                        <p className="gray-600">{data.message}</p>
                      </div>
                    </div>
                  ))}

                {this.props.allSupportTicketCount !==
                  this.props.fetchAllSupportTicketResponse.toJS().length && (
                  <div className="text-center mt-4">
                    <Button
                      size="large"
                      color="black"
                      onClick={() => this._loadMoreMessage()}
                      disabled={this.props.loadMoreMessageRequesting}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </Card>
            </Ref>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Sticky context={this.contextRef}>
              <Segment className="p-4 w-100">
                <h2 className="mb-0">Messages</h2>
                {this.state.selectedTicket ? (
                  <Chat
                    value={this.state.typedMessage || ''}
                    onReply={this._onReply}
                    handleOnKeyPress={this._handleOnKeyPress}
                    messageList={this.props.fetchSpecificTicketAllMessageResponse.toJS()}
                    handleOnMessageType={this._handleOnMessageType}
                    loadingMessage={
                      this.props.fetchSpecificTicketAllMessageRequesting
                    }
                    sendingMessage={
                      this.props.replyMessageToSpecificTicketByAdminRequesting
                    }
                  />
                ) : (
                  <Message
                    info
                    header="No Ticket Selected to show conversation"
                  />
                )}
              </Segment>
            </Sticky>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Inbox.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  deleteTicketSuccess: makeSelectDeleteTicketSuccess(),
  deleteTicketFailure: makeSelectDeleteTicketFailure(),
  deleteTicketSuccessMsg: makeSelectDeleteTicketSuccessMsg(),
  deleteTicketFailureMsg: makeSelectDeleteTicketFailureMsg(),
  deleteTicketRequesting: makeSelectDeleteTicketRequesting(),
  fetchTicketStatusSuccess: makeSelectFetchTicketStatusSuccess(),
  fetchTicketStatusFailure: makeSelectFetchTicketStatusFailure(),
  fetchTicketStatusResponse: makeSelectFetchTicketStatusResponse(),
  fetchTicketStatusFailureMsg: makeSelectFetchTicketStatusFailureMsg(),
  fetchTicketStatusSuccessMsg: makeSelectFetchTicketStatusSuccessMsg(),
  fetchTicketStatusRequesting: makeSelectFetchTicketStatusRequesting(),
  updateTicketStatusSuccess: makeSelectUpdateTicketStatusSuccess(),
  updateTicketStatusFailure: makeSelectUpdateTicketStatusFailure(),
  updateTicketStatusSuccessMsg: makeSelectUpdateTicketStatusSuccessMsg(),
  updateTicketStatusFailureMsg: makeSelectUpdateTicketStatusFailureMsg(),
  updateTicketStatusRequesting: makeSelectUpdateTicketStatusRequesting(),
  fetchAllSupportTicketSuccess: makeSelectFetchAllSupportTicketSuccess(),
  fetchAllSupportTicketFailure: makeSelectFetchAllSupportTicketFailure(),
  fetchAllSupportTicketResponse: makeSelectFetchAllSupportTicketResponse(),
  fetchAllSupportTicketSuccessMsg: makeSelectFetchAllSupportTicketSuccessMsg(),
  fetchAllSupportTicketFailureMsg: makeSelectFetchAllSupportTicketFailureMsg(),
  fetchAllSupportTicketRequesting: makeSelectFetchAllSupportTicketRequesting(),
  fetchSpecificTicketAllMessageResponse: makeSelectFetchSpecificTicketAllMessageResponse(),
  fetchSpecificTicketAllMessageRequesting: makeSelectFetchSpecificTicketAllMessageRequesting(),
  fetchSpecificTicketAllMessageSuccess: makeSelectFetchSpecificTicketAllMessageSuccess(),
  fetchSpecificTicketAllMessageSuccessMsg: makeSelectFetchSpecificTicketAllMessageSuccessMsg(),
  fetchSpecificTicketAllMessageFailure: makeSelectFetchSpecificTicketAllMessageFailure(),
  fetchSpecificTicketAllMessageFailureMsg: makeSelectFetchSpecificTicketAllMessageFailureMsg(),
  replyMessageToSpecificTicketByAdminRequesting: makeSelectReplyMessageToSpecificTicketByAdminRequesting(),
  replyMessageToSpecificTicketByAdminSuccess: makeSelectReplyMessageToSpecificTicketByAdminSuccess(),
  replyMessageToSpecificTicketByAdminSuccessMsg: makeSelectReplyMessageToSpecificTicketByAdminSuccessMsg(),
  replyMessageToSpecificTicketByAdminFailure: makeSelectReplyMessageToSpecificTicketByAdminFailure(),
  replyMessageToSpecificTicketByAdminFailureMsg: makeSelectReplyMessageToSpecificTicketByAdminFailureMsg(),
  loadMoreMessageRequesting: makeSelectLoadMoreMessageRequesting(),
  allSupportTicketCount: makeSelectAllSupportTicketCount(),
});

const mapDispatchToProps = dispatch => ({
  fetchAllSupportTicketRequest: queryParams =>
    dispatch(fetchAllSupportTicketRequest(queryParams)),
  loadMoreMessageRequest: queryParams =>
    dispatch(loadMoreMessageRequest(queryParams)),
  fetchTicketStatusRequest: () => dispatch(fetchTicketStatusRequest()),
  updateTicketStatusRequest: reqData =>
    dispatch(updateTicketStatusRequest(reqData)),
  deleteTicketRequest: ticketId => dispatch(deleteTicketRequest(ticketId)),
  fetchSpecificTicketAllMessageRequest: ticketId =>
    dispatch(fetchSpecificTicketAllMessageRequest(ticketId)),
  replyMessageToSpecificTicketByAdminRequest: reqObj =>
    dispatch(replyMessageToSpecificTicketByAdminRequest(reqObj)),
  getNewMessageRequest: reqObj => dispatch(getNewMessageRequest(reqObj)),
  listenClientFirstMessage: ticketId =>
    dispatch(listenClientFirstMessage(ticketId)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'inbox', saga });
const withReducer = injectReducer({ key: 'inbox', reducer });

export default compose(withReducer, withSaga, withConnect)(Inbox);
