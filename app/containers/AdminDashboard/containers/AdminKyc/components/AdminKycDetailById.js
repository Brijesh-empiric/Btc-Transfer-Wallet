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
  Card,
  Grid,
  Label,
  Image,
  Modal,
  Header,
  Form,
  Button,
  Loader,
  Divider,
  Message,
  Placeholder,
} from 'semantic-ui-react';
import TextArea from 'components/common/Forms/TextArea';
import InputField from 'components/common/Forms/InputField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from '../saga';
import reducer from '../reducer';
import {
  makeSelectGetKycByIdSuccess,
  makeSelectGetKycByIdFailure,
  makeSelectGetKycByIdSuccessMsg,
  makeSelectGetKycByIdFailureMsg,
  makeSelectGetKycByIdRequesting,
  makeSelectGetKycByIdResponse,
  makeSelectChangeKycStatusSuccess,
  makeSelectChangeKycStatusFailure,
  makeSelectChangeKycStatusSuccessMsg,
  makeSelectChangeKycStatusFailureMsg,
  makeSelectChangeKycStatusRequesting,
} from '../selectors';
import { getKycByIdRequest, changeKycStatusRequest } from '../actions';

/* eslint-disable react/prefer-stateless-function */
export class KycDetail extends React.Component {
  state = {
    // statusList: [],
    // selectedStatusType: '',
    reason: '',
    errors: '',
    isRejectionModalVisible: false,
  };
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.getKycByIdRequest(this.props.match.params.id);
    }
    return;
  }

  componentDidUpdate = prevProps => {
    const {
      match: {
        params: { id },
      },
    } = prevProps;
    if (this.props.match.params.id && this.props.match.params.id !== id) {
      this.props.getKycByIdRequest(this.props.match.params.id);
      return;
    }
    if (
      this.props.changeKycStatusSuccess &&
      this.props.changeKycStatusSuccessMsg !==
        prevProps.changeKycStatusSuccessMsg
    ) {
      toast.success(this.props.changeKycStatusSuccessMsg);
      this.setState({
        reason: '',
        isRejectionModalVisible: false,
      });
      if (this.props.match.params && this.props.match.params.id) {
        this.props.getKycByIdRequest(this.props.match.params.id);
      }
    }
    if (
      this.props.changeKycStatusFailure &&
      this.props.changeKycStatusFailureMsg !==
        prevProps.changeKycStatusFailureMsg
    ) {
      toast.error(this.props.changeKycStatusFailureMsg);
    }
  };

  _handleStatusButton = (status, reason = '') => {
    if (status === this.props.getKycByIdResponse.toJS().status) {
      toast.error(
        `Cannot perform ${status} action. Because already has been ${status}`,
      );
      return;
    }
    if (this.props.match.params && this.props.match.params.id) {
      this.props.changeKycStatusRequest({
        status,
        reason,
        kyc_id: this.props.match.params.id,
      });
    }
  };

  _openRejectionModal = () => {
    this.setState({
      isRejectionModalVisible: !this.state.isRejectionModalVisible,
    });
    return;
  };

  _handleOnReasonChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      [e.target.name]: e.target.value,
    }));
    return;
  };

  _onRejectionButtonClicked = () => {
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this._handleStatusButton('reject', this.state.reason);
    }
  };

  validate = () => {
    const { reason } = this.state;
    const errors = {};
    if (reason === '') errors.reason = "Can't be blank";
    return errors;
  };

  render() {
    const { getKycByIdRequesting, getKycByIdResponse } = this.props;
    return (
      <div>
        <Helmet>
          <title>Kyc Detail</title>
          <meta name="description" content="Description of Customer Detail" />
        </Helmet>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={1}>
              <Button
                circular
                icon="arrow left"
                onClick={() => this.props.history.push(`/admin/dashboard/kyc`)}
              />
            </Grid.Column>
            <Grid.Column width={11} textAlign="left">
              <h2>Kyc Detail </h2>
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
                      {getKycByIdRequesting ? (
                        <Grid.Column textAlign="right">
                          <Loader active size="tiny" />
                        </Grid.Column>
                      ) : (
                        <Grid.Column textAlign="right">
                          {getKycByIdResponse.toJS() &&
                          getKycByIdResponse.toJS().status &&
                          getKycByIdResponse.toJS().status === 'approve' ? (
                            <Label color="teal">Verified</Label>
                          ) : getKycByIdResponse.toJS().status === 'reject' ? (
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
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>Email</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().email &&
                            getKycByIdResponse.toJS().email
                              ? getKycByIdResponse.toJS().email
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Username</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().username &&
                            getKycByIdResponse.toJS().username
                              ? getKycByIdResponse.toJS().username
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
                    </Grid.Row>
                  </Grid>
                </div>
                <div>
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>First Name</div>
                        {console.log(getKycByIdResponse.toJS())}
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().first_name &&
                            getKycByIdResponse.toJS().first_name
                              ? getKycByIdResponse.toJS().first_name
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Last Name</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().last_name &&
                            getKycByIdResponse.toJS().last_name
                              ? getKycByIdResponse.toJS().last_name
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>

                      <Grid.Column>
                        <div>Resident</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().resident &&
                            getKycByIdResponse.toJS().resident
                              ? getKycByIdResponse.toJS().resident
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>KYC Submitted Date</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().timestamp &&
                            getKycByIdResponse.toJS().timestamp
                              ? new Date(getKycByIdResponse.toJS().timestamp)
                                  .toISOString()
                                  .slice(0, 10)
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>Verification Type</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <Grid.Column>
                            <div>
                              {getKycByIdResponse.toJS() &&
                              getKycByIdResponse.toJS().verification_type &&
                              getKycByIdResponse.toJS().verification_type
                                ? getKycByIdResponse.toJS().verification_type
                                : 'N/A'}
                            </div>
                          </Grid.Column>
                        )}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Document ID</div>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS().id_number &&
                            getKycByIdResponse.toJS().id_number
                              ? getKycByIdResponse.toJS().id_number
                              : 'N/A'}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>

                    <h1>Uploaded Document</h1>
                    <Grid.Row columns={3}>
                      <Grid.Column>
                        <h4>Identification Verification Front</h4>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS()
                              .identification_verification_front &&
                            getKycByIdResponse.toJS()
                              .identification_verification_front ? (
                              <Image
                                src={
                                  getKycByIdResponse.toJS()
                                    .identification_verification_front
                                }
                                as="a"
                                size="medium"
                                href={
                                  getKycByIdResponse.toJS()
                                    .identification_verification_front
                                }
                                target="_blank"
                              />
                            ) : (
                              'N/A'
                            )}
                          </div>
                        )}
                      </Grid.Column>

                      <Grid.Column>
                        <h4>Identification Verification Back</h4>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS()
                              .identification_verification_back &&
                            getKycByIdResponse.toJS()
                              .identification_verification_back ? (
                              <Image
                                src={
                                  getKycByIdResponse.toJS()
                                    .identification_verification_back
                                }
                                as="a"
                                size="medium"
                                href={
                                  getKycByIdResponse.toJS()
                                    .identification_verification_back
                                }
                                target="_blank"
                              />
                            ) : (
                              'N/A'
                            )}
                          </div>
                        )}
                      </Grid.Column>

                      <Grid.Column>
                        <h4>Hand Held Identification</h4>
                        {getKycByIdRequesting ? (
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        ) : (
                          <div>
                            {getKycByIdResponse.toJS() &&
                            getKycByIdResponse.toJS()
                              .hand_held_identification &&
                            getKycByIdResponse.toJS()
                              .hand_held_identification ? (
                              <Image
                                src={
                                  getKycByIdResponse.toJS()
                                    .hand_held_identification
                                }
                                as="a"
                                size="medium"
                                href={
                                  getKycByIdResponse.toJS()
                                    .hand_held_identification
                                }
                                target="_blank"
                              />
                            ) : (
                              'N/A'
                            )}
                          </div>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  {getKycByIdResponse.toJS().status === 'reject' && (
                    <Message
                      negative
                      icon="ban"
                      header="Reason Of Rejection"
                      content={getKycByIdResponse.toJS().reject_reason}
                    />
                  )}
                  <Button
                    primary
                    disabled={
                      this.props.getKycByIdRequesting ||
                      this.props.changeKycStatusRequesting
                    }
                    onClick={() => this._handleStatusButton('approve')}
                  >
                    Verfiy
                  </Button>
                  <Button
                    secondary
                    disabled={
                      this.props.getKycByIdRequesting ||
                      this.props.changeKycStatusRequesting
                    }
                    onClick={this._openRejectionModal}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            </Grid.Column>
          </Grid>

          <div>
            <Modal
              closeIcon
              size="mini"
              open={this.state.isRejectionModalVisible}
              onClose={this._openRejectionModal}
            >
              <Header icon="ticket" content="Rejection" />
              <Modal.Content>
                <Form onSubmit={() => this._onRejectionButtonClicked()}>
                  <Form.Field>
                    <label>Reason for KYC rejection</label>
                    <TextArea
                      name="reason"
                      value={this.state.reason}
                      error={this.state.errors.reason}
                      onChange={this._handleOnReasonChange}
                      placeholder="Write down the Reason for KYC rejection"
                    />
                  </Form.Field>
                  <Button
                    type="submit"
                    // loading={createSupportTicketRequesting}
                    disabled={
                      this.props.getKycByIdRequesting ||
                      this.props.changeKycStatusRequesting
                    }
                  >
                    Reject
                  </Button>
                </Form>
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

KycDetail.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getKycByIdSuccess: makeSelectGetKycByIdSuccess(),
  getKycByIdFailure: makeSelectGetKycByIdFailure(),
  getKycByIdSuccessMsg: makeSelectGetKycByIdSuccessMsg(),
  getKycByIdFailureMsg: makeSelectGetKycByIdFailureMsg(),
  getKycByIdRequesting: makeSelectGetKycByIdRequesting(),
  getKycByIdResponse: makeSelectGetKycByIdResponse(),

  changeKycStatusSuccess: makeSelectChangeKycStatusSuccess(),
  changeKycStatusFailure: makeSelectChangeKycStatusFailure(),
  changeKycStatusSuccessMsg: makeSelectChangeKycStatusSuccessMsg(),
  changeKycStatusFailureMsg: makeSelectChangeKycStatusFailureMsg(),
  changeKycStatusRequesting: makeSelectChangeKycStatusRequesting(),
});

const mapDispatchToProps = dispatch => ({
  getKycByIdRequest: id => dispatch(getKycByIdRequest(id)),
  changeKycStatusRequest: reqObj => dispatch(changeKycStatusRequest(reqObj)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'adminKyc', saga });
const withReducer = injectReducer({ key: 'adminKyc', reducer });

export default compose(withReducer, withSaga, withConnect)(KycDetail);
