/**
 *
 * CustomerDetail
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import {
  Tab,
  Card,
  Grid,
  Label,
  Button,
  Loader,
  Divider,
  Dropdown,
  Message,
  Modal,
  Header,
  Form,
  Checkbox,
  Placeholder,
} from 'semantic-ui-react';
import cryptojs from 'crypto-js';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import CustomTable from 'components/CustomTable';
import TextArea from 'components/common/Forms/TextArea';
import InputField from 'components/common/Forms/InputField';
import PasswordInputField from 'components/common/Forms/PasswordInputField';

import saga from './saga';
import reducer from './reducer';
import {
  makeSelectGetCustomerDetailSuccess,
  makeSelectGetCustomerDetailFailure,
  makeSelectGetCustomerDetailResponse,
  makeSelectGetCustomerDetailFailureMsg,
  makeSelectGetCustomerDetailSuccessMsg,
  makeSelectGetCustomerDetailRequesting,
  makeSelectGetCustomerStatusListSuccess,
  makeSelectGetCustomerStatusListFailure,
  makeSelectGetCustomerStatusListResponse,
  makeSelectGetCustomerStatusListSuccessMsg,
  makeSelectGetCustomerStatusListFailureMsg,
  makeSelectGetCustomerStatusListRequesting,
  makeSelectUpdateCustomerStatusSuccess,
  makeSelectUpdateCustomerStatusFailure,
  makeSelectUpdateCustomerStatusSuccessMsg,
  makeSelectUpdateCustomerStatusFailureMsg,
  makeSelectUpdateCustomerStatusRequesting,
  makeSelectImportWatchAddressSuccess,
  makeSelectImportWatchAddressFailure,
  makeSelectImportWatchAddressSuccessMsg,
  makeSelectImportWatchAddressFailureMsg,
  makeSelectImportWatchAddressRequesting,
  makeSelectDisable2faSuccess,
  makeSelectDisable2faFailure,
  makeSelectDisable2faSuccessMsg,
  makeSelectDisable2faFailureMsg,
  makeSelectDisable2faRequesting,
  makeSelectDeleteWatchAddressSuccess,
  makeSelectDeleteWatchAddressFailure,
  makeSelectDeleteWatchAddressSuccessMsg,
  makeSelectDeleteWatchAddressFailureMsg,
  makeSelectDeleteWatchAddressRequesting,
  makeSelectCreateTicketForUserSuccess,
  makeSelectCreateTicketForUserFailure,
  makeSelectCreateTicketForUserSuccessMsg,
  makeSelectCreateTicketForUserFailureMsg,
  makeSelectCreateTicketForUserRequesting,
  makeSelectFetchSupportTicketCategoryForAdminSuccess,
  makeSelectFetchSupportTicketCategoryForAdminFailure,
  makeSelectFetchSupportTicketCategoryForAdminResponse,
  makeSelectFetchSupportTicketCategoryForAdminSuccessMsg,
  makeSelectFetchSupportTicketCategoryForAdminFailureMsg,
  makeSelectFetchSupportTicketCategoryForAdminRequesting,
} from './selectors';
import {
  disable2faRequest,
  getCustomerDetailRequest,
  deleteWatchAddressRequest,
  importWatchAddressRequest,
  createTicketForUserRequest,
  updateCustomerStatusRequest,
  getCustomerStatusListRequest,
  fetchSupportTicketCategoryForAdminRequest,
  resetCreateSupportTicketForUserInitialState,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class CustomerDetail extends React.Component {
  state = {
    label: '',
    address: '',
    errors: {},
    createSupportTicketDataObj: {
      subject: '',
      message: '',
      category: '',
      user_id: '',
    },
    statusList: [],
    selectedStatusType: '',
    watchAddressToDelete: '',
    supportTicketCategory: [],
    isDecrpytModalVisible: false,
    is2faDisableModalVisible: false,
    isRaiseTicketModalVisible: false,
    showDeleteWatchAddressModal: false,
    isImportWatchAddressModalVisible: false,
    passwordToDecryptWalletKey: '',
    decryptedMemo: '',
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.getCustomerDetailRequest(this.props.match.params.id);
    }
    this.props.getCustomerStatusListRequest();
    this.props.fetchSupportTicketCategoryForAdminRequest();
    return;
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.importWatchAddressSuccess &&
      this.props.importWatchAddressSuccessMsg !==
        prevProps.importWatchAddressSuccessMsg
    ) {
      toast.success(this.props.importWatchAddressSuccessMsg);
      this.setState({
        label: '',
        address: '',
        isImportWatchAddressModalVisible: false,
      });
      if (this.props.match.params && this.props.match.params.id) {
        this.props.getCustomerDetailRequest(this.props.match.params.id);
      }
      return;
    }

    if (
      this.props.importWatchAddressFailure &&
      this.props.importWatchAddressFailureMsg !==
        prevProps.importWatchAddressFailureMsg
    ) {
      toast.error(this.props.importWatchAddressFailureMsg);
      return;
    }

    if (
      this.props.disable2faSuccess &&
      this.props.disable2faSuccessMsg !== prevProps.disable2faSuccessMsg
    ) {
      toast.success(this.props.disable2faSuccessMsg);
      this.setState({
        is2faDisableModalVisible: false,
      });
      if (this.props.match.params && this.props.match.params.id) {
        this.props.getCustomerDetailRequest(this.props.match.params.id);
      }
      return;
    }

    if (
      this.props.disable2faFailure &&
      this.props.disable2faFailureMsg !== prevProps.disable2faFailureMsg
    ) {
      toast.error(this.props.disable2faFailureMsg);
      return;
    }

    if (
      this.props.deleteWatchAddressSuccess &&
      this.props.deleteWatchAddressSuccessMsg !==
        prevProps.deleteWatchAddressSuccessMsg
    ) {
      toast.success(this.props.deleteWatchAddressSuccessMsg);
      this.setState({
        showDeleteWatchAddressModal: false,
      });
      if (this.props.match.params && this.props.match.params.id) {
        this.props.getCustomerDetailRequest(this.props.match.params.id);
      }
      return;
    }

    if (
      this.props.deleteWatchAddressFailure &&
      this.props.deleteWatchAddressFailureMsg !==
        prevProps.deleteWatchAddressFailureMsg
    ) {
      toast.error(this.props.deleteWatchAddressFailureMsg);
      return;
    }

    if (
      this.props.getCustomerStatusListFailureMsg !==
        prevProps.getCustomerStatusListFailureMsg &&
      this.props.getCustomerStatusListFailure
    ) {
      toast.error(this.props.getCustomerStatusListFailureMsg);
      return;
    }
    if (
      this.props.updateCustomerStatusFailureMsg !==
        prevProps.updateCustomerStatusFailureMsg &&
      this.props.updateCustomerStatusFailure
    ) {
      toast.error(this.props.updateCustomerStatusFailureMsg);
      this.setState({
        selectedStatusType:
          this.props.getCustomerDetailResponse.toJS() &&
          this.props.getCustomerDetailResponse.toJS().user_info &&
          this.props.getCustomerDetailResponse.toJS().user_info.user_status,
      });
      return;
    }
    if (
      this.props.updateCustomerStatusSuccessMsg !==
        prevProps.updateCustomerStatusSuccessMsg &&
      this.props.updateCustomerStatusSuccess
    ) {
      toast.success(this.props.updateCustomerStatusSuccessMsg);
      return;
    }
    if (
      this.props.getCustomerStatusListResponse !==
      prevProps.getCustomerStatusListResponse
    ) {
      this.setState({
        statusList: this.props.getCustomerStatusListResponse.toJS(),
      });
    }
    if (
      this.props.getCustomerDetailResponse !==
        prevProps.getCustomerDetailResponse &&
      this.props.getCustomerDetailResponse
    ) {
      this.setState({
        selectedStatusType:
          this.props.getCustomerDetailResponse.toJS() &&
          this.props.getCustomerDetailResponse.toJS().user_info &&
          this.props.getCustomerDetailResponse.toJS().user_info.user_status,
      });
    }

    if (
      this.props.fetchSupportTicketCategoryForAdminResponse !==
        prevProps.fetchSupportTicketCategoryForAdminResponse &&
      this.props.fetchSupportTicketCategoryForAdminSuccess
    ) {
      this.setState({
        supportTicketCategory: this.props.fetchSupportTicketCategoryForAdminResponse.toJS(),
      });
    }

    if (
      this.props.createTicketForUserFailureMsg !==
        prevProps.createTicketForUserFailureMsg &&
      this.props.createTicketForUserFailure
    ) {
      toast.error(this.props.createTicketForUserFailureMsg);
    }

    if (
      this.props.createTicketForUserSuccessMsg !==
        prevProps.createTicketForUserSuccessMsg &&
      this.props.createTicketForUserSuccess
    ) {
      toast.success(this.props.createTicketForUserSuccessMsg);
      this.setState({
        isRaiseTicketModalVisible: false,
        createSupportTicketDataObj: {
          category: '',
          subject: '',
          message: '',
          user_id: '',
        },
      });
      if (this.props.match.params && this.props.match.params.id) {
        this.props.getCustomerDetailRequest(this.props.match.params.id);
      }
    }
  };

  handleOnStatusChange = (event, data) => {
    this.setState({
      selectedStatusType: data.value,
    });
    this.props.updateCustomerStatusRequest({
      status: data.value,
      uuid: this.props.getCustomerDetailResponse.toJS().user_info.uuid,
    });
  };

  _handleImportWatchAddressModal = () => {
    this.setState({
      isImportWatchAddressModalVisible: !this.state
        .isImportWatchAddressModalVisible,
    });
  };

  _handle2faDisableModal = () => {
    this.setState({
      is2faDisableModalVisible: !this.state.is2faDisableModalVisible,
    });
  };

  _handleOnTextChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      [e.target.name]: e.target.value,
    }));
  };

  _handleOnToggleChange = (e, data) => {
    this._handle2faDisableModal();
  };

  _disable2fa = () => {
    this.props.disable2faRequest({
      email: this.props.getCustomerDetailResponse.toJS().user_info.email,
    });
  };

  validate = () => {
    const { address, label } = this.state;
    const errors = {};
    if (address === '') errors.address = "Can't be blank";
    if (label === '') errors.label = "Can't be blank";

    return errors;
  };

  _onImportButtonClicked = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.importWatchAddressRequest({
        label: this.state.label,
        address: this.state.address,
        email: this.props.getCustomerDetailResponse.toJS().user_info.email,
      });
    }
  };

  _handleDeleteAddressModal = (address = '') => {
    this.setState({
      showDeleteWatchAddressModal: !this.state.showDeleteWatchAddressModal,
      watchAddressToDelete: address,
    });
  };

  _deleteAddress = () => {
    this.props.deleteWatchAddressRequest({
      email: this.props.getCustomerDetailResponse.toJS().user_info.email,
      address: this.state.watchAddressToDelete,
    });
  };

  _handleRaiseTicketModal = () => {
    this.setState({
      isRaiseTicketModalVisible: !this.state.isRaiseTicketModalVisible,
      // createTicketForUserId: userId
    });
    this.props.resetCreateSupportTicketForUserInitialState();
  };

  _handleOnSupportTicketCategorySelect = event => {
    event.persist();
    this.setState(state => ({
      createSupportTicketDataObj: {
        ...state.createSupportTicketDataObj,
        category: event.target.value,
      },
    }));
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
  };

  handlePasswordToDecryptWalletKeyChange = e => {
    e.persist();
    this.setState({
      passwordToDecryptWalletKey: e.target.value,
    });
  };

  _handleDecryptWalletKey = walletKey => {
    try {
      const bytes = cryptojs.AES.decrypt(
        walletKey,
        this.state.passwordToDecryptWalletKey,
      );
      const originalText = bytes.toString(cryptojs.enc.Utf8);
      if (originalText === '') {
        toast.error('Invalid Secret Key.');
        return;
      }
      this.setState({
        passwordToDecryptWalletKey: '',
        decryptedMemo: originalText,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  _clearMemo = () => {
    this.setState({
      decryptedMemo: '',
    });
  };

  _handleDecryptWalletKeyModal = () => {
    this.setState({
      decryptedMemo: '',
      isDecrpytModalVisible: !this.state.isDecrpytModalVisible,
    });
  };

  validateCreateTicketField = () => {
    const { createSupportTicketDataObj } = this.state;
    const errors = {};
    if (!createSupportTicketDataObj.subject) errors.subject = "Can't be blank";
    if (!createSupportTicketDataObj.message) errors.message = "Can't be blank";
    return errors;
  };

  _handleSubmitTicketField = e => {
    e.preventDefault();
    const { createTicketForUserRequest } = this.props;
    const { createSupportTicketDataObj } = this.state;
    const errors = this.validateCreateTicketField();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const userId = this.props.getCustomerDetailResponse.toJS().user_info.uuid;
      createTicketForUserRequest({
        ...createSupportTicketDataObj,
        user_id: userId,
      });
    }
  };

  render() {
    const {
      errors,
      getCustomerDetailResponse,
      getCustomerDetailRequesting,
      createTicketForUserRequesting,
    } = this.props;
    const {
      supportTicketCategory,
      isDecrpytModalVisible,
      isRaiseTicketModalVisible,
      createSupportTicketDataObj,
      showDeleteWatchAddressModal,
    } = this.state;
    const walletAddressData =
      getCustomerDetailResponse.toJS() &&
      getCustomerDetailResponse.toJS().wallet_address_data &&
      getCustomerDetailResponse.toJS().wallet_address_data.length > 0
        ? getCustomerDetailResponse
          .toJS()
          .wallet_address_data.map(({ address, label, balance }) => [
            address,
            label,
            balance,
          ])
        : [];
    const watchAddressData =
      getCustomerDetailResponse.toJS() &&
      getCustomerDetailResponse.toJS().watch_address_data &&
      getCustomerDetailResponse.toJS().watch_address_data.length > 0
        ? getCustomerDetailResponse
          .toJS()
          .watch_address_data.map(({ address, label, balance }) => [
            address,
            label,
            balance,
            <Button
              circular
              color="red"
              icon="trash alternate outline"
              onClick={() => this._handleDeleteAddressModal(address)}
            />,
          ])
        : [];
    return (
      <div>
        <Helmet>
          <title>Customer Detail</title>
          <meta name="description" content="Description of Customer Detail" />
        </Helmet>
        {/** Model to Raise Ticket by Admin */}
        <div className="ml-auto">
          <Modal
            closeIcon
            size="mini"
            open={isRaiseTicketModalVisible}
            onClose={this._handleRaiseTicketModal}
          >
            <Header icon="ticket" content="Raise a Ticket" />
            <Modal.Content>
              <Form onSubmit={this._handleSubmitTicketField}>
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
                    // error={errors.subject}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Message</label>
                  <TextArea
                    name="message"
                    value={createSupportTicketDataObj.message}
                    // error={errors.message}
                    onChange={this.handleChange}
                    placeholder="Write down the issue..."
                  />
                </Form.Field>
                <Button
                  type="submit"
                  loading={createTicketForUserRequesting}
                  disabled={
                    createSupportTicketDataObj.category === '' ||
                    !createSupportTicketDataObj.message ||
                    !createSupportTicketDataObj.subject ||
                    createTicketForUserRequesting
                  }
                >
                  Create ticket
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>

        {/** * Dcrypt Value Modal */}
        <div className="ml-auto">
          <Modal
            closeIcon
            size="mini"
            open={isDecrpytModalVisible}
            onClose={this._handleDecryptWalletKeyModal}
          >
            <Header icon="ticket" content="Decrypt Wallet" />
            <Modal.Content>
              <Form
                onSubmit={() =>
                  this._handleDecryptWalletKey(
                    getCustomerDetailResponse.toJS().walletKey,
                  )
                }
              >
                <Form.Field>
                  <PasswordInputField
                    label="Enter Your Secret Key."
                    placeholder="Enter Your Secret Key."
                    className="form-control"
                    password={this.state.passwordToDecryptWalletKey}
                    onChange={this.handlePasswordToDecryptWalletKeyChange}
                    // error={errors.subject}
                  />
                </Form.Field>

                {this.state.decryptedMemo !== '' && (
                  <Message onDismiss={this._clearMemo} positive>
                    <Message.Header>Decrypted Wallet Result</Message.Header>
                    <p>{this.state.decryptedMemo}</p>
                  </Message>
                )}

                <Button
                  disabled={this.state.passwordToDecryptWalletKey === ''}
                  type="submit"
                >
                  Confirm
                </Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={1}>
              <Button
                circular
                icon="arrow left"
                onClick={() =>
                  this.props.history.push(
                    `/admin/dashboard/user-management/customer`,
                  )
                }
              />
            </Grid.Column>
            <Grid.Column width={7} textAlign="left">
              <h2 className="flex row">
                Customer
                <div
                  onClick={() => {
                    this._handleDecryptWalletKeyModal();
                  }}
                >
                  &nbsp; &nbsp;
                </div>
                Detail
              </h2>
            </Grid.Column>
            <Grid.Column width={8} textAlign="left">
              <Grid>
                <Grid.Row columns={2}>
                  {/* <Grid.Column>
                    <Button
                      onClick={() => {
                        this._handleDecryptWalletKeyModal();
                      }}
                      size="large"
                      disabled={
                        this.props.fetchSupportTicketCategoryForAdminRequesting
                      }
                    >
                      View Wallet
                    </Button>
                  </Grid.Column> */}
                  <Grid.Column>
                    <Button
                      onClick={() => {
                        this._handleRaiseTicketModal();
                      }}
                      size="large"
                      disabled={
                        this.props.fetchSupportTicketCategoryForAdminRequesting
                      }
                    >
                      Raise a Ticket
                    </Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Dropdown
                      button
                      labeled
                      floating
                      icon="cogs"
                      className="icon"
                      options={this.state.statusList}
                      onChange={this.handleOnStatusChange}
                      value={this.state.selectedStatusType}
                      disabled={this.props.updateCustomerStatusRequesting}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div>
          <Grid>
            <Grid.Column>
              <Card>
                <div>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <h4>Account Detail</h4>
                      </Grid.Column>
                      {getCustomerDetailRequesting ? (
                        <Grid.Column textAlign="right">
                          <Loader active size="tiny" />
                        </Grid.Column>
                      ) : (
                        <Grid.Column textAlign="right">
                          {getCustomerDetailResponse.toJS() &&
                          getCustomerDetailResponse.toJS().user_info &&
                          getCustomerDetailResponse.toJS().user_info.verified &&
                          getCustomerDetailResponse.toJS().user_info
                            .verified === 1 ? (
                              <Label color="teal">Active</Label>
                            ) : (
                              <Label color="yellow">Not Active</Label>
                            )}
                        </Grid.Column>
                      )}
                    </Grid.Row>
                  </Grid>
                </div>
                <div>
                  <Grid stackable>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <div>Email</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().user_info &&
                            getCustomerDetailResponse.toJS().user_info.email
                              ? getCustomerDetailResponse.toJS().user_info.email
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Phone</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().user_info &&
                            getCustomerDetailResponse.toJS().user_info.phone
                              ? getCustomerDetailResponse.toJS().user_info.phone
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Joined Date</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().user_info &&
                            getCustomerDetailResponse.toJS().user_info
                              .user_created_at
                              ? new Date(
                                getCustomerDetailResponse.toJS().user_info.user_created_at,
                              )
                                .toISOString()
                                .slice(0, 10)
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                <Divider />
                <div>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <h4>KYC Detail</h4>
                      </Grid.Column>
                      {getCustomerDetailRequesting ? (
                        <Grid.Column textAlign="right">
                          <Loader active size="tiny" />
                        </Grid.Column>
                      ) : (
                        <Grid.Column textAlign="right">
                          {getCustomerDetailResponse.toJS() &&
                          getCustomerDetailResponse.toJS().kyc_detail &&
                          getCustomerDetailResponse.toJS().kyc_detail
                            .kyc_status &&
                          getCustomerDetailResponse.toJS().kyc_detail
                            .kyc_status === 'approve' ? (
                              <Label color="teal">Verified</Label>
                            ) : getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .kyc_status &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .kyc_status === 'reject' ? (
                                <Label color="red">Rejected</Label>
                              ) : (
                                <Label color="yellow">Pending</Label>
                              )}
                        </Grid.Column>
                      )}
                    </Grid.Row>
                  </Grid>
                </div>
                <div>
                  <Grid stackable>
                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>Full Name</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .first_name
                              ? `${
                                getCustomerDetailResponse.toJS().kyc_detail
                                  .first_name
                              } ${
                                getCustomerDetailResponse.toJS().kyc_detail
                                  .last_name
                              }`
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Resident</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail.resident
                              ? getCustomerDetailResponse.toJS().kyc_detail
                                .resident
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>KYC Submitted Date</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .kyc_created_at
                              ? new Date(
                                getCustomerDetailResponse.toJS().kyc_detail.kyc_created_at,
                              )
                                .toISOString()
                                .slice(0, 10)
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Verification Type</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .verification_type
                              ? getCustomerDetailResponse.toJS().kyc_detail
                                .verification_type
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>Document ID</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getCustomerDetailResponse.toJS() &&
                            getCustomerDetailResponse.toJS().kyc_detail &&
                            getCustomerDetailResponse.toJS().kyc_detail
                              .id_number
                              ? getCustomerDetailResponse.toJS().kyc_detail
                                .id_number
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>2FA Status</div>
                        {getCustomerDetailRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            <Checkbox
                              toggle
                              disabled={
                                !(
                                  getCustomerDetailResponse.toJS() &&
                                  getCustomerDetailResponse.toJS().user_info &&
                                  getCustomerDetailResponse.toJS().user_info
                                    .multi_factor_auth_status
                                )
                              }
                              checked={
                                getCustomerDetailResponse.toJS() &&
                                getCustomerDetailResponse.toJS().user_info &&
                                getCustomerDetailResponse.toJS().user_info
                                  .multi_factor_auth_status
                              }
                              onChange={(e, data) =>
                                this._handleOnToggleChange(e, data)
                              }
                            />
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  {getCustomerDetailResponse.toJS() &&
                    getCustomerDetailResponse.toJS().kyc_detail &&
                    getCustomerDetailResponse.toJS().kyc_detail.reject_reason &&
                    getCustomerDetailResponse.toJS().kyc_detail
                      .reject_reason !== '' && (
                    <Message
                      negative
                      icon="ban"
                      header="Reason Of Rejection"
                      content={
                        getCustomerDetailResponse.toJS().kyc_detail
                          .reject_reason
                      }
                    />
                  )}
                </div>
              </Card>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                  {
                    menuItem: 'Wallet Address',
                    render: () => (
                      <Tab.Pane attached={false}>
                        {' '}
                        <h4 className="px-3">Wallet Address</h4>
                        <CustomTable
                          tableData={walletAddressData}
                          loading={getCustomerDetailRequesting}
                          noDataAvailableMsg="No Data Available."
                          tableHead={['Address', 'Label', 'Balance']}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Watch Address',
                    render: () => (
                      <Tab.Pane attached={false}>
                        {' '}
                        <div className="flex row">
                          <h4 className="px-3">Watch Address</h4>
                          <Button
                            onClick={this._handleImportWatchAddressModal}
                            icon="add"
                            size="mini"
                            disabled={getCustomerDetailRequesting}
                          />
                        </div>
                        <CustomTable
                          tableData={watchAddressData}
                          loading={getCustomerDetailRequesting}
                          noDataAvailableMsg="No Data Available."
                          tableHead={['Address', 'Label', 'Balance', 'Action']}
                        />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />

              <Modal open={this.state.isImportWatchAddressModalVisible}>
                <Header icon="bitcoin" content="Import Watch Address" />
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label>Email</label>
                      <InputField
                        type="text"
                        name="email"
                        className="form-control"
                        value={
                          getCustomerDetailResponse.toJS() &&
                          getCustomerDetailResponse.toJS().user_info &&
                          getCustomerDetailResponse.toJS().user_info.email
                            ? getCustomerDetailResponse.toJS().user_info.email
                            : 'N/A'
                        }
                        readOnly
                        disabled
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Label</label>
                      <InputField
                        type="text"
                        name="label"
                        className="form-control"
                        value={this.state.label}
                        error={this.state.errors.label}
                        onChange={this._handleOnTextChange}
                        placeholder="Please enter label for watch address"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Watch Address</label>
                      <InputField
                        type="text"
                        name="address"
                        className="form-control"
                        value={this.state.address}
                        error={this.state.errors.address}
                        onChange={this._handleOnTextChange}
                        placeholder="Please dont test this method as we cannot mess around with addresses"
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="green"
                    onClick={this._onImportButtonClicked}
                    loading={this.props.importWatchAddressRequesting}
                    disabled={this.props.importWatchAddressRequesting}
                  >
                    Import
                  </Button>
                  <Button
                    color="red"
                    onClick={this._handleImportWatchAddressModal}
                    disabled={this.props.importWatchAddressRequesting}
                  >
                    Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
              {/** ********* Disable 2FA Modal */}

              <Modal open={this.state.is2faDisableModalVisible}>
                <Header icon="bitcoin" content="Disable 2FA" />
                <Modal.Content>Are You Sure!!!!</Modal.Content>
                <Modal.Actions>
                  <Button
                    color="green"
                    onClick={this._disable2fa}
                    loading={this.props.disable2faRequesting}
                    disabled={this.props.disable2faRequesting}
                  >
                    Disable
                  </Button>
                  <Button
                    color="red"
                    onClick={this._handle2faDisableModal}
                    disabled={this.props.disable2faRequesting}
                  >
                    Cancel
                  </Button>
                </Modal.Actions>
              </Modal>

              <Modal
                open={showDeleteWatchAddressModal}
                // onClose={this._handleDeleteModal}
                // onOpen={this._handleDeleteModal}
              >
                <Header icon="bitcoin" content="Delete Address" />
                <Modal.Content>
                  <p>Are you sure. You want to delete Address?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="red"
                    onClick={() => this._handleDeleteAddressModal()}
                    disabled={this.props.deleteWatchAddressRequesting}
                  >
                    No
                  </Button>

                  <Button
                    color="green"
                    onClick={this._deleteAddress}
                    loading={this.props.deleteWatchAddressRequesting}
                    disabled={this.props.deleteWatchAddressRequesting}
                  >
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

CustomerDetail.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getCustomerDetailSuccess: makeSelectGetCustomerDetailSuccess(),
  getCustomerDetailFailure: makeSelectGetCustomerDetailFailure(),
  getCustomerDetailResponse: makeSelectGetCustomerDetailResponse(),
  getCustomerDetailSuccessMsg: makeSelectGetCustomerDetailSuccessMsg(),
  getCustomerDetailFailureMsg: makeSelectGetCustomerDetailFailureMsg(),
  getCustomerDetailRequesting: makeSelectGetCustomerDetailRequesting(),

  getCustomerStatusListSuccess: makeSelectGetCustomerStatusListSuccess(),
  getCustomerStatusListFailure: makeSelectGetCustomerStatusListFailure(),
  getCustomerStatusListResponse: makeSelectGetCustomerStatusListResponse(),
  getCustomerStatusListSuccessMsg: makeSelectGetCustomerStatusListSuccessMsg(),
  getCustomerStatusListFailureMsg: makeSelectGetCustomerStatusListFailureMsg(),
  getCustomerStatusListRequesting: makeSelectGetCustomerStatusListRequesting(),

  updateCustomerStatusSuccess: makeSelectUpdateCustomerStatusSuccess(),
  updateCustomerStatusFailure: makeSelectUpdateCustomerStatusFailure(),
  updateCustomerStatusSuccessMsg: makeSelectUpdateCustomerStatusSuccessMsg(),
  updateCustomerStatusFailureMsg: makeSelectUpdateCustomerStatusFailureMsg(),
  updateCustomerStatusRequesting: makeSelectUpdateCustomerStatusRequesting(),

  importWatchAddressSuccess: makeSelectImportWatchAddressSuccess(),
  importWatchAddressFailure: makeSelectImportWatchAddressFailure(),
  importWatchAddressSuccessMsg: makeSelectImportWatchAddressSuccessMsg(),
  importWatchAddressFailureMsg: makeSelectImportWatchAddressFailureMsg(),
  importWatchAddressRequesting: makeSelectImportWatchAddressRequesting(),

  disable2faSuccess: makeSelectDisable2faSuccess(),
  disable2faFailure: makeSelectDisable2faFailure(),
  disable2faSuccessMsg: makeSelectDisable2faSuccessMsg(),
  disable2faFailureMsg: makeSelectDisable2faFailureMsg(),
  disable2faRequesting: makeSelectDisable2faRequesting(),

  deleteWatchAddressSuccess: makeSelectDeleteWatchAddressSuccess(),
  deleteWatchAddressFailure: makeSelectDeleteWatchAddressFailure(),
  deleteWatchAddressSuccessMsg: makeSelectDeleteWatchAddressSuccessMsg(),
  deleteWatchAddressFailureMsg: makeSelectDeleteWatchAddressFailureMsg(),
  deleteWatchAddressRequesting: makeSelectDeleteWatchAddressRequesting(),

  createTicketForUserSuccess: makeSelectCreateTicketForUserSuccess(),
  createTicketForUserFailure: makeSelectCreateTicketForUserFailure(),
  createTicketForUserSuccessMsg: makeSelectCreateTicketForUserSuccessMsg(),
  createTicketForUserFailureMsg: makeSelectCreateTicketForUserFailureMsg(),
  createTicketForUserRequesting: makeSelectCreateTicketForUserRequesting(),

  fetchSupportTicketCategoryForAdminSuccess: makeSelectFetchSupportTicketCategoryForAdminSuccess(),
  fetchSupportTicketCategoryForAdminFailure: makeSelectFetchSupportTicketCategoryForAdminFailure(),
  fetchSupportTicketCategoryForAdminResponse: makeSelectFetchSupportTicketCategoryForAdminResponse(),
  fetchSupportTicketCategoryForAdminSuccessMsg: makeSelectFetchSupportTicketCategoryForAdminSuccessMsg(),
  fetchSupportTicketCategoryForAdminFailureMsg: makeSelectFetchSupportTicketCategoryForAdminFailureMsg(),
  fetchSupportTicketCategoryForAdminRequesting: makeSelectFetchSupportTicketCategoryForAdminRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getCustomerDetailRequest: id => dispatch(getCustomerDetailRequest(id)),
  updateCustomerStatusRequest: id => dispatch(updateCustomerStatusRequest(id)),
  getCustomerStatusListRequest: () => dispatch(getCustomerStatusListRequest()),
  importWatchAddressRequest: reqObj =>
    dispatch(importWatchAddressRequest(reqObj)),
  disable2faRequest: reqObj => dispatch(disable2faRequest(reqObj)),
  deleteWatchAddressRequest: reqObj =>
    dispatch(deleteWatchAddressRequest(reqObj)),
  fetchSupportTicketCategoryForAdminRequest: () =>
    dispatch(fetchSupportTicketCategoryForAdminRequest()),
  createTicketForUserRequest: reqObj =>
    dispatch(createTicketForUserRequest(reqObj)),
  resetCreateSupportTicketForUserInitialState: () =>
    dispatch(resetCreateSupportTicketForUserInitialState()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customerDetail', reducer });
const withSaga = injectSaga({ key: 'customerDetail', saga });

export default compose(withReducer, withSaga, withConnect)(CustomerDetail);
