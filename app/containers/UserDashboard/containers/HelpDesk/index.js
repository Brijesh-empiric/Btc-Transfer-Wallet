import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';

import {
  Icon,
  Form,
  Grid,
  Input,
  Label,
  Modal,
  Popup,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';

import Chat from './components/Chat';
import SupportTicketTable from './components/SupportTicketTable';

import TextArea from 'components/common/Forms/TextArea';
import InputField from 'components/common/Forms/InputField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectCreateSupportTicketSuccess,
  makeSelectCreateSupportTicketFailure,
  makeSelectCreateSupportTicketSuccessMsg,
  makeSelectCreateSupportTicketFailureMsg,
  makeSelectCreateSupportTicketRequesting,
  makeSelectCreateSupportTicketSuccessResponse,
  makeSelectGetAllSupportTicketForUserSuccess,
  makeSelectGetAllSupportTicketForUserFailure,
  makeSelectGetAllSupportTicketForUserResponse,
  makeSelectGetAllSupportTicketForUserSuccessMsg,
  makeSelectGetAllSupportTicketForUserFailureMsg,
  makeSelectGetAllSupportTicketForUserRequesting,
  makeSelectFetchSupportTicketCategorySuccess,
  makeSelectFetchSupportTicketCategoryFailure,
  makeSelectFetchSupportTicketCategoryResponse,
  makeSelectFetchSupportTicketCategorySuccessMsg,
  makeSelectFetchSupportTicketCategoryFailureMsg,
  makeSelectFetchSupportTicketCategoryRequesting,
  makeSelectFetchTicketStatusOptionSuccess,
  makeSelectFetchTicketStatusOptionFailure,
  makeSelectFetchTicketStatusOptionResponse,
  makeSelectFetchTicketStatusOptionSuccessMsg,
  makeSelectFetchTicketStatusOptionFailureMsg,
  makeSelectFetchTicketStatusOptionRequesting,
  makeSelectUpdateSupportTicketStatusSuccess,
  makeSelectUpdateSupportTicketStatusFailure,
  makeSelectUpdateSupportTicketStatusSuccessMsg,
  makeSelectUpdateSupportTicketStatusFailureMsg,
  makeSelectUpdateSupportTicketStatusRequesting,
  makeSelectDeleteSupportTicketSuccess,
  makeSelectDeleteSupportTicketFailure,
  makeSelectDeleteSupportTicketSuccessMsg,
  makeSelectDeleteSupportTicketFailureMsg,
  makeSelectDeleteSupportTicketRequesting,
  makeSelectFetchAllSpecificTicketMessageResponse,
  makeSelectFetchAllSpecificTicketMessageRequesting,
  makeSelectFetchAllSpecificTicketMessageSuccess,
  makeSelectFetchAllSpecificTicketMessageSuccessMsg,
  makeSelectFetchAllSpecificTicketMessageFailure,
  makeSelectFetchAllSpecificTicketMessageFailureMsg,
  makeSelectReplyChatRequesting,
  makeSelectReplyChatSuccess,
  makeSelectReplyChatSuccessMsg,
  makeSelectReplyChatFailure,
  makeSelectReplyChatFailureMsg,
  makeSelectGetTicketDetailByIdSuccess,
  makeSelectGetTicketDetailByIdFailure,
  makeSelectGetTicketDetailByIdResponse,
  makeSelectGetTicketDetailByIdSuccessMsg,
  makeSelectGetTicketDetailByIdFailureMsg,
  makeSelectGetTicketDetailByIdRequesting,
} from './selectors';
import { makeSelectUser, makeSelectUserInfo } from 'containers/App/selectors';
import {
  createSupportTicketRequest,
  deleteSupportTicketRequest,
  fetchTicketStatusOptionRequest,
  updateSupportTicketStatusRequest,
  getAllSupportTicketForUserRequest,
  fetchSupportTicketCategoryRequest,
  listenNewMessageRequest,
  listenFirstMessage,
  resetCreateSupportTicketToInitialState,
  fetchAllSpecificTicketMessageRequest,
  replyChatRequest,
  getTicketDetailByIdRequest,
} from './actions';

import saga from './sagas';
import reducer from './reducer';

var intervalId = 0;

export class HelpDesk extends React.Component {
  state = {
    queryParams: {
      status: '',
      perpage: 10,
      currentpage: 1,
    },
    isTicketStatusModalVisible: false,
    isSpecificTicketChatModalVisible: false,
    isSupportTicketDeleteModalVisible: false,
    isCreateSupportTicketModalVisible: false,
    supportTicketCategory: [],
    createSupportTicketDataObj: {
      subject: '',
      message: '',
      category: '',
    },
    errors: {},
    updateTicketState: {
      status: '',
      ticket_id: '',
    },
    ticketIdToChat: '',
    ticketIdToDelete: '',
    selectedTicketSubject: '',
    selectedTicketMessage: '',
  };

  componentDidMount = () => {
    const { queryParams } = this.state;
    this._fetchSupportTicketCategory();
    this._fetchSupportTicketStatusOptions();
    this.props.getAllSupportTicketForUserRequest(queryParams);

    const urlParams = new URLSearchParams(this.props.location.search);
    const ticketId = urlParams.get('ticketId');
    if (ticketId) {
      this._handleSpecificTickeChatModal(ticketId);
    }
    return;
  };

  componentDidUpdate = prevProps => {
    const { queryParams } = this.state;

    const prevParams = new URLSearchParams(prevProps.location.search);
    const newParams = new URLSearchParams(this.props.location.search);

    if (
      newParams.get('ticketId') &&
      newParams.get('ticketId') !== prevParams.get('ticketId')
    ) {
      this._handleSpecificTickeChatModal(newParams.get('ticketId'));
    }

    if (
      this.props.fetchSupportTicketCategoryFailureMsg !==
        prevProps.fetchSupportTicketCategoryFailureMsg &&
      this.props.fetchSupportTicketCategoryFailure
    ) {
      toast.error(this.props.fetchSupportTicketCategoryFailureMsg);
      return;
    }
    if (
      this.props.createSupportTicketFailureMsg !==
        prevProps.createSupportTicketFailureMsg &&
      this.props.createSupportTicketFailure
    ) {
      toast.error(this.props.createSupportTicketFailureMsg);
      return;
    }
    if (
      this.props.fetchTicketStatusOptionFailureMsg !==
        prevProps.fetchTicketStatusOptionFailureMsg &&
      this.props.fetchTicketStatusOptionFailure
    ) {
      toast.error(this.props.fetchTicketStatusOptionFailureMsg);
      return;
    }
    if (
      this.props.updateSupportTicketStatusFailureMsg !==
        prevProps.updateSupportTicketStatusFailureMsg &&
      this.props.updateSupportTicketStatusFailure
    ) {
      toast.error(this.props.updateSupportTicketStatusFailureMsg);
      return;
    }
    if (
      this.props.deleteSupportTicketFailureMsg !==
        prevProps.deleteSupportTicketFailureMsg &&
      this.props.deleteSupportTicketFailure
    ) {
      toast.error(this.props.deleteSupportTicketFailureMsg);
      return;
    }
    if (
      this.props.createSupportTicketSuccessMsg !==
        prevProps.createSupportTicketSuccessMsg &&
      this.props.createSupportTicketSuccess
    ) {
      toast.success(this.props.createSupportTicketSuccessMsg);
      this.setState({
        createSupportTicketDataObj: {
          category: '',
          subject: '',
          message: '',
        },
      });

      return;
    }
    if (
      this.props.deleteSupportTicketSuccessMsg !==
        prevProps.deleteSupportTicketSuccessMsg &&
      this.props.deleteSupportTicketSuccess
    ) {
      toast.success(this.props.deleteSupportTicketSuccessMsg);
      this._handleDeleteSupportTicketModal();
      this.props.getAllSupportTicketForUserRequest(queryParams);
      return;
    }
    if (
      this.props.updateSupportTicketStatusSuccessMsg !==
        prevProps.updateSupportTicketStatusSuccessMsg &&
      this.props.updateSupportTicketStatusSuccess
    ) {
      toast.success(this.props.updateSupportTicketStatusSuccessMsg);
      this.props.getAllSupportTicketForUserRequest(queryParams);
      this._handleTicketStatusModal();
      return;
    }
    if (
      this.props.fetchSupportTicketCategoryResponse !==
        prevProps.fetchSupportTicketCategoryResponse &&
      this.props.fetchSupportTicketCategorySuccess
    ) {
      this.setState({
        supportTicketCategory: this.props.fetchSupportTicketCategoryResponse.toJS(),
      });
    }

    if (
      this.props.fetchAllSpecificTicketMessageSuccess &&
      this.props.fetchAllSpecificTicketMessageSuccess !==
        prevProps.fetchAllSpecificTicketMessageSuccess
    ) {
      // this.scrollToBottom();
      if (this.state.ticketIdToChat !== '') {
        this._getNewMessage();
      }
    }
  };

  _getNewMessage = () => {
    intervalId = setInterval(() => {
      if (
        this.props.fetchAllSpecificTicketMessageResponse.toJS() &&
        this.props.fetchAllSpecificTicketMessageResponse.toJS().length !== 0 &&
        !this.props.replyChatRequesting
      ) {
        this.props.listenNewMessageRequest({
          ticket_id: this.state.ticketIdToChat,
          message_id: this.props.fetchAllSpecificTicketMessageResponse.toJS()[
            this.props.fetchAllSpecificTicketMessageResponse.toJS().length - 1
          ].id,
        });
      }
      if (
        this.props.fetchAllSpecificTicketMessageResponse.toJS() &&
        this.props.fetchAllSpecificTicketMessageResponse.toJS().length === 0 &&
        !this.props.replyChatRequesting
      ) {
        this.props.listenFirstMessage(this.state.ticketIdToChat);
      }
    }, 3000);
  };

  _fetchSupportTicketCategory = () => {
    this.props.fetchSupportTicketCategoryRequest();
    return;
  };

  _fetchSupportTicketStatusOptions = () => {
    this.props.fetchTicketStatusOptionRequest();
    return;
  };

  _handlePagination = data => {
    const { queryParams } = this.state;
    this.props.getAllSupportTicketForUserRequest({
      ...queryParams,
      currentpage: data.currentPage,
    });
    return;
  };

  _onTicketStatusRequest = status => {
    this.props.getAllSupportTicketForUserRequest({
      status,
      perpage: 10,
      currentpage: 1,
    });
    this.setState({
      queryParams: {
        status,
        perpage: 10,
        currentpage: 1,
      },
    });
    return;
  };

  _handleCreateSupportTicketModal = () => {
    this.setState({
      isCreateSupportTicketModalVisible: !this.state
        .isCreateSupportTicketModalVisible,
    });
    this.props.resetCreateSupportTicketToInitialState();
    if (this.props.createSupportTicketSuccess) {
      const { queryParams } = this.state;
      this.props.getAllSupportTicketForUserRequest(queryParams);
    }
    return;
  };

  _handleDeleteSupportTicketModal = (ticketId = '') => {
    this.setState({
      isSupportTicketDeleteModalVisible: !this.state
        .isSupportTicketDeleteModalVisible,
      ticketIdToDelete: ticketId,
    });
  };

  _handleSpecificTickeChatModal = (ticketId = '') => {
    this.setState({
      // isSpecificTicketChatModalVisible: !this.state
      //   .isSpecificTicketChatModalVisible,
      ticketIdToChat: ticketId,
    });
    if (ticketId === '') {
      clearInterval(intervalId);
    }
    if (ticketId !== '') {
      this.props.fetchAllSpecificTicketMessageRequest(ticketId);
      this.props.getTicketDetailByIdRequest({ ticketId });
    }
  };

  _handleOnSupportTicketCategorySelect = event => {
    event.persist();
    this.setState(state => ({
      createSupportTicketDataObj: {
        ...state.createSupportTicketDataObj,
        category: event.target.value,
      },
    }));
    return;
  };

  _handleTicketStatusModal = (ticketId, status) => {
    const { isTicketStatusModalVisible, updateTicketState } = this.state;
    if (isTicketStatusModalVisible) {
      this.setState({
        isTicketStatusModalVisible: !isTicketStatusModalVisible,
        updateTicketState: {
          ticket_id: '',
          status: '',
        },
      });
      return;
    }
    this.setState({
      isTicketStatusModalVisible: !isTicketStatusModalVisible,
      updateTicketState: {
        ...updateTicketState,
        ticket_id: ticketId,
        status,
      },
    });
    return;
  };

  _handleOnTicketStatusSelect = event => {
    event.persist();
    this.setState(state => ({
      updateTicketState: {
        ...state.updateTicketState,
        status: event.target.value,
      },
    }));
    return;
  };

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      createSupportTicketDataObj: {
        ...state.createSupportTicketDataObj,
        [e.target.name]: e.target.value,
      },
    }));
    return;
  };

  validate = () => {
    const { createSupportTicketDataObj } = this.state;
    const errors = {};
    if (!createSupportTicketDataObj.subject) errors.subject = "Can't be blank";
    if (!createSupportTicketDataObj.message) errors.message = "Can't be blank";
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { createSupportTicketRequest } = this.props;
    const { createSupportTicketDataObj } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      let userId = this.props.userInfo.toJS().user_id;
      createSupportTicketRequest(createSupportTicketDataObj, userId);
    }
  };

  handleUpdateStatus = e => {
    e.preventDefault();
    const { updateTicketState } = this.state;
    this.props.updateSupportTicketStatusRequest(updateTicketState);
    return;
  };

  _deleteTicket = () => {
    const { ticketIdToDelete } = this.state;
    this.props.deleteSupportTicketRequest(ticketIdToDelete);
    return;
  };

  _handleOnMessageType = (event, data) => {
    this.setState({
      typedMessage: data.value,
    });
    return;
  };

  _handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      this._onReply();
    }
  };

  _onReply = () => {
    const { ticketIdToChat, typedMessage } = this.state;
    if (this.state.typedMessage !== '') {
      this.props.replyChatRequest({
        ticket_id: ticketIdToChat,
        message: typedMessage,
        is_user_message: 1,
      });
      this.setState({
        typedMessage: '',
      });
    }
    return;
  };

  componentWillUnmount = () => {
    this._handleSpecificTickeChatModal('');
    return;
  };

  render() {
    const {
      errors,
      supportTicketCategory,
      queryParams: { perpage },
      createSupportTicketDataObj,
      isTicketStatusModalVisible,
      isSpecificTicketChatModalVisible,
      isCreateSupportTicketModalVisible,
      isSupportTicketDeleteModalVisible,
    } = this.state;

    const tableHead = [
      'Ticket Number',
      'Category',
      'Subject',
      // 'Message',
      'Status',
      'Action',
      // 'Explore',
    ];
    const {
      createSupportTicketSuccess,
      createSupportTicketRequesting,
      deleteSupportTicketRequesting,
      fetchTicketStatusOptionResponse,
      fetchTicketStatusOptionRequesting,
      updateSupportTicketStatusRequesting,
      getAllSupportTicketForUserRequesting,
    } = this.props;

    const tableData =
      this.props.getAllSupportTicketForUserResponse.toJS() &&
      this.props.getAllSupportTicketForUserResponse.toJS().data &&
      this.props.getAllSupportTicketForUserResponse.toJS().data.length > 0
        ? this.props.getAllSupportTicketForUserResponse
            .toJS()
            .data.map(
              ({ user_id, category, ticket_id, subject, status, message }) => [
                ticket_id,
                category,
                subject,
                // message,
                status === 'pending' ? (
                  <Label color="red">{status}</Label>
                ) : status === 'resolve' ? (
                  <Label color="green">{status}</Label>
                ) : (
                  <Label color="blue">{status}</Label>
                ),

                <>
                  <Button
                    circular
                    color="blue"
                    icon="edit"
                    onClick={() =>
                      this._handleTicketStatusModal(ticket_id, status)
                    }
                  />
                  <Button
                    circular
                    color="green"
                    icon="chat"
                    onClick={() =>
                      this._handleSpecificTickeChatModal(ticket_id)
                    }
                  />
                  <Button
                    circular
                    color="red"
                    icon="close"
                    onClick={() =>
                      this._handleDeleteSupportTicketModal(ticket_id)
                    }
                  />
                </>,
              ],
            )
        : [];

    return (
      <div>
        <Helmet>
          <title>Help Desk</title>
          <meta name="description" content="Description of Help Desk" />
        </Helmet>
        <div className="d-flex mb-4 ">
          {/* <h1>{`Help Desk
          ${
            this.state.ticketIdToChat === ''
              ? ''
              : `> Ticket id: ${this.state.ticketIdToChat}`
          }
          `}</h1> */}
          <h1>{`Help Desk`}</h1>
          <div className="ml-auto">
            <Modal
              closeIcon
              size="mini"
              open={isCreateSupportTicketModalVisible}
              trigger={
                this.state.ticketIdToChat === '' ? (
                  <Button onClick={this._handleCreateSupportTicketModal}>
                    Raise a Ticket
                  </Button>
                ) : (
                  ''
                )
              }
              onClose={this._handleCreateSupportTicketModal}
            >
              <Header icon="ticket" content="Raise a Ticket" />
              <Modal.Content>
                {!createSupportTicketSuccess && (
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field
                      label="Category"
                      control="select"
                      onChange={this._handleOnSupportTicketCategorySelect}
                    >
                      <option hidden value="">
                        Select Category
                      </option>
                      <option disabled default>
                        Select Category
                      </option>
                      {supportTicketCategory &&
                        supportTicketCategory.length > 0 &&
                        supportTicketCategory.map((cat, index) => (
                          <option value={cat.value} key={index}>
                            {cat.text}
                          </option>
                        ))}
                    </Form.Field>
                    <Form.Field>
                      <label>Subject</label>

                      <InputField
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="form-control"
                        value={createSupportTicketDataObj.subject}
                        onChange={this.handleChange}
                        error={errors.subject}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Message</label>
                      <TextArea
                        name="message"
                        value={createSupportTicketDataObj.message}
                        error={errors.message}
                        onChange={this.handleChange}
                        placeholder="Write down the issue..."
                      />
                    </Form.Field>
                    <Button
                      type="submit"
                      loading={createSupportTicketRequesting}
                      disabled={
                        createSupportTicketDataObj.category === '' ||
                        !createSupportTicketDataObj.message ||
                        !createSupportTicketDataObj.subject ||
                        createSupportTicketRequesting
                      }
                    >
                      Create ticket
                    </Button>
                  </Form>
                )}
                {createSupportTicketSuccess && (
                  <div>
                    <Message positive>
                      <Message.Header>
                        Thank You for sharing your issue
                      </Message.Header>
                      <p>
                        Due to the increased workload, the average reply time is
                        2-3 days. We appreciate your understanding.
                      </p>
                    </Message>
                    <div>
                      <b>Ticket Number:</b>
                      {this.props.createSupportTicketSuccessResponse.toJS() &&
                        this.props.createSupportTicketSuccessResponse.toJS()
                          .ticket_id}
                    </div>
                  </div>
                )}
              </Modal.Content>
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
                    {fetchTicketStatusOptionResponse.toJS() &&
                      fetchTicketStatusOptionResponse.toJS().length > 0 &&
                      fetchTicketStatusOptionResponse
                        .toJS()
                        .map((cat, index) => (
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
                      fetchTicketStatusOptionRequesting ||
                      updateSupportTicketStatusRequesting
                    }
                    disabled={
                      fetchTicketStatusOptionRequesting ||
                      updateSupportTicketStatusRequesting
                    }
                  >
                    Update
                  </Button>
                  <Button
                    onClick={this._handleTicketStatusModal}
                    disabled={updateSupportTicketStatusRequesting}
                  >
                    Cancel
                  </Button>
                </Form>
              </Modal.Content>
            </Modal>

            <Modal size="large" open={isSupportTicketDeleteModalVisible}>
              <Header icon="archive" content="Delete Ticket" />
              <Modal.Content scrolling>
                <p>Are you sure. You want to delete ticket?</p>
              </Modal.Content>

              <Modal.Actions>
                <Button
                  color="red"
                  onClick={this._handleDeleteSupportTicketModal}
                  disabled={deleteSupportTicketRequesting}
                >
                  <Icon name="remove" /> No
                </Button>
                <Button
                  color="green"
                  onClick={this._deleteTicket}
                  loading={deleteSupportTicketRequesting}
                  disabled={deleteSupportTicketRequesting}
                >
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>

            <Modal size="large" open={isSpecificTicketChatModalVisible}>
              <Header
                icon="chat"
                content={`TicketId: ${this.state.ticketIdToChat}`}
              />

              <Modal.Content scrolling>
                <Chat
                  onReply={this._onReply}
                  handleOnMessageType={this._handleOnMessageType}
                  messageList={this.props.fetchAllSpecificTicketMessageResponse.toJS()}
                  loadingMessage={
                    this.props.fetchAllSpecificTicketMessageRequesting
                  }
                />
              </Modal.Content>

              <Modal.Actions>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Input
                        fluid
                        iconPosition="left"
                        placeholder="Reply"
                        icon="paper plane outline"
                        onChange={this._handleOnMessageType}
                        value={this.state.typedMessage || ''}
                      />
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Button
                        disabled={
                          this.props.fetchAllSpecificTicketMessageRequesting
                        }
                        onClick={this._onReply}
                      >
                        Reply
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Button
                        color="green"
                        onClick={() => this._handleSpecificTickeChatModal()}
                      >
                        Close
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Actions>
            </Modal>
          </div>
        </div>

        {this.state.ticketIdToChat === '' ? (
          <div>
            <div className="ui pointing secondary menu overflow__x">
              <a
                className={`${
                  this.state.queryParams.status === '' ? 'active' : ''
                } item `}
                onClick={() => this._onTicketStatusRequest('')}
              >
                All Ticket
              </a>
              <a
                className={`${
                  this.state.queryParams.status === 'pending' ? 'active' : ''
                } item `}
                onClick={() => this._onTicketStatusRequest('pending')}
              >
                Pending Ticket
              </a>
              <a
                className={`${
                  this.state.queryParams.status === 'reopen' ? 'active' : ''
                } item `}
                onClick={() => this._onTicketStatusRequest('reopen')}
              >
                Reopen Ticket
              </a>
              <a
                className={`${
                  this.state.queryParams.status === 'resolve' ? 'active' : ''
                } item `}
                onClick={() => this._onTicketStatusRequest('resolve')}
              >
                Resolved Ticket
              </a>
            </div>
            <div className="ui segment active tab">
              {' '}
              <SupportTicketTable
                count={
                  this.props.getAllSupportTicketForUserResponse.toJS() &&
                  this.props.getAllSupportTicketForUserResponse.toJS()
                    .pagination_data &&
                  this.props.getAllSupportTicketForUserResponse.toJS()
                    .pagination_data.total_count
                    ? this.props.getAllSupportTicketForUserResponse.toJS()
                        .pagination_data.total_count
                    : 0
                }
                pagelimit={perpage}
                tableHead={tableHead}
                tableData={tableData}
                handlePagination={this._handlePagination}
                getAllSupportTicketForUserRequesting={
                  getAllSupportTicketForUserRequesting
                }
              />
              {/*

              <Table.Cell>
                    <Icon color="green" name="lock" />
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <Menu>
                        <Menu.Item>
                          <Icon color="purple" name="chat" size="large" />

                          <Label color="orange" floating>
                            3
                          </Label>
                        </Menu.Item>
                      </Menu>
                    </div>
                  </Table.Cell>
            */}
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={() => this._handleSpecificTickeChatModal('')}>
              Back to List
            </Button>

            <Popup
              trigger={
                <Icon
                  circular
                  color="blue"
                  className="mx-2"
                  name="ticket alternate"
                  size="large"
                />
              }
              flowing
              hoverable
            >
              <Grid>
                <Grid.Column>
                  <Header>Ticket id:</Header>
                  {/* <a target="blank" href={exchange.officialLink}>
                    {exchange.officialLink}
                  </a> */}
                  <span>{this.state.ticketIdToChat}</span>
                </Grid.Column>
              </Grid>
            </Popup>

            <Grid className="mt-3">
              <Grid.Column mobile={16} tablet={8} computer={16}>
                {this.props.getTicketDetailByIdResponse &&
                  this.props.getTicketDetailByIdResponse.toJS() && (
                    <Message
                      positive
                      icon="mail outline"
                      header={`Subject: ${this.props.getTicketDetailByIdResponse.toJS() &&
                        this.props.getTicketDetailByIdResponse.toJS().subject}`}
                      content={`Message: ${this.props.getTicketDetailByIdResponse.toJS() &&
                        this.props.getTicketDetailByIdResponse.toJS().message}`}
                    />
                  )}
                <Chat
                  handleOnKeyPress={this._handleOnKeyPress}
                  onReply={this._onReply}
                  typedMessage={this.state.typedMessage}
                  handleOnMessageType={this._handleOnMessageType}
                  messageList={this.props.fetchAllSpecificTicketMessageResponse.toJS()}
                  loadingMessage={
                    this.props.fetchAllSpecificTicketMessageRequesting
                  }
                />
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userInfo: makeSelectUserInfo(),
  createSupportTicketSuccess: makeSelectCreateSupportTicketSuccess(),
  createSupportTicketFailure: makeSelectCreateSupportTicketFailure(),
  createSupportTicketSuccessMsg: makeSelectCreateSupportTicketSuccessMsg(),
  createSupportTicketFailureMsg: makeSelectCreateSupportTicketFailureMsg(),
  createSupportTicketRequesting: makeSelectCreateSupportTicketRequesting(),
  createSupportTicketSuccessResponse: makeSelectCreateSupportTicketSuccessResponse(),
  getAllSupportTicketForUserSuccess: makeSelectGetAllSupportTicketForUserSuccess(),
  getAllSupportTicketForUserFailure: makeSelectGetAllSupportTicketForUserFailure(),
  getAllSupportTicketForUserResponse: makeSelectGetAllSupportTicketForUserResponse(),
  getAllSupportTicketForUserSuccessMsg: makeSelectGetAllSupportTicketForUserSuccessMsg(),
  getAllSupportTicketForUserFailureMsg: makeSelectGetAllSupportTicketForUserFailureMsg(),
  getAllSupportTicketForUserRequesting: makeSelectGetAllSupportTicketForUserRequesting(),
  fetchSupportTicketCategorySuccess: makeSelectFetchSupportTicketCategorySuccess(),
  fetchSupportTicketCategoryFailure: makeSelectFetchSupportTicketCategoryFailure(),
  fetchSupportTicketCategoryResponse: makeSelectFetchSupportTicketCategoryResponse(),
  fetchSupportTicketCategorySuccessMsg: makeSelectFetchSupportTicketCategorySuccessMsg(),
  fetchSupportTicketCategoryFailureMsg: makeSelectFetchSupportTicketCategoryFailureMsg(),
  fetchSupportTicketCategoryRequesting: makeSelectFetchSupportTicketCategoryRequesting(),

  fetchTicketStatusOptionSuccess: makeSelectFetchTicketStatusOptionSuccess(),
  fetchTicketStatusOptionFailure: makeSelectFetchTicketStatusOptionFailure(),
  fetchTicketStatusOptionResponse: makeSelectFetchTicketStatusOptionResponse(),
  fetchTicketStatusOptionSuccessMsg: makeSelectFetchTicketStatusOptionSuccessMsg(),
  fetchTicketStatusOptionFailureMsg: makeSelectFetchTicketStatusOptionFailureMsg(),
  fetchTicketStatusOptionRequesting: makeSelectFetchTicketStatusOptionRequesting(),
  updateSupportTicketStatusSuccess: makeSelectUpdateSupportTicketStatusSuccess(),
  updateSupportTicketStatusFailure: makeSelectUpdateSupportTicketStatusFailure(),
  updateSupportTicketStatusSuccessMsg: makeSelectUpdateSupportTicketStatusSuccessMsg(),
  updateSupportTicketStatusFailureMsg: makeSelectUpdateSupportTicketStatusFailureMsg(),
  updateSupportTicketStatusRequesting: makeSelectUpdateSupportTicketStatusRequesting(),
  deleteSupportTicketSuccess: makeSelectDeleteSupportTicketSuccess(),
  deleteSupportTicketFailure: makeSelectDeleteSupportTicketFailure(),
  deleteSupportTicketSuccessMsg: makeSelectDeleteSupportTicketSuccessMsg(),
  deleteSupportTicketFailureMsg: makeSelectDeleteSupportTicketFailureMsg(),
  deleteSupportTicketRequesting: makeSelectDeleteSupportTicketRequesting(),

  fetchAllSpecificTicketMessageResponse: makeSelectFetchAllSpecificTicketMessageResponse(),
  fetchAllSpecificTicketMessageRequesting: makeSelectFetchAllSpecificTicketMessageRequesting(),
  fetchAllSpecificTicketMessageSuccess: makeSelectFetchAllSpecificTicketMessageSuccess(),
  fetchAllSpecificTicketMessageSuccessMsg: makeSelectFetchAllSpecificTicketMessageSuccessMsg(),
  fetchAllSpecificTicketMessageFailure: makeSelectFetchAllSpecificTicketMessageFailure(),
  fetchAllSpecificTicketMessageFailureMsg: makeSelectFetchAllSpecificTicketMessageFailureMsg(),
  replyChatRequesting: makeSelectReplyChatRequesting(),
  replyChatSuccess: makeSelectReplyChatSuccess(),
  replyChatSuccessMsg: makeSelectReplyChatSuccessMsg(),
  replyChatFailure: makeSelectReplyChatFailure(),
  replyChatFailureMsg: makeSelectReplyChatFailureMsg(),

  getTicketDetailByIdSuccess: makeSelectGetTicketDetailByIdSuccess(),
  getTicketDetailByIdFailure: makeSelectGetTicketDetailByIdFailure(),
  getTicketDetailByIdResponse: makeSelectGetTicketDetailByIdResponse(),
  getTicketDetailByIdSuccessMsg: makeSelectGetTicketDetailByIdSuccessMsg(),
  getTicketDetailByIdFailureMsg: makeSelectGetTicketDetailByIdFailureMsg(),
  getTicketDetailByIdRequesting: makeSelectGetTicketDetailByIdRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getAllSupportTicketForUserRequest: queryParams =>
    dispatch(getAllSupportTicketForUserRequest(queryParams)),
  fetchSupportTicketCategoryRequest: () =>
    dispatch(fetchSupportTicketCategoryRequest()),
  createSupportTicketRequest: (reqData, userId) =>
    dispatch(createSupportTicketRequest(reqData, userId)),
  resetCreateSupportTicketToInitialState: () =>
    dispatch(resetCreateSupportTicketToInitialState()),
  fetchTicketStatusOptionRequest: () =>
    dispatch(fetchTicketStatusOptionRequest()),
  updateSupportTicketStatusRequest: reqData =>
    dispatch(updateSupportTicketStatusRequest(reqData)),
  deleteSupportTicketRequest: ticketId =>
    dispatch(deleteSupportTicketRequest(ticketId)),
  fetchAllSpecificTicketMessageRequest: ticketId =>
    dispatch(fetchAllSpecificTicketMessageRequest(ticketId)),
  listenNewMessageRequest: reqObj => dispatch(listenNewMessageRequest(reqObj)),
  replyChatRequest: reqObj => dispatch(replyChatRequest(reqObj)),
  listenFirstMessage: ticketId => dispatch(listenFirstMessage(ticketId)),
  getTicketDetailByIdRequest: reqObj =>
    dispatch(getTicketDetailByIdRequest(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'helpDesk', reducer });
const withSaga = injectSaga({ key: 'helpDesk', saga });

export default compose(withReducer, withSaga, withConnect)(HelpDesk);
