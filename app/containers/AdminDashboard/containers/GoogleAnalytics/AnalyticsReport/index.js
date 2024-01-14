import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import injectSaga from 'utils/injectSaga';
import {
  Card,
  Grid,
  Segment,
  Message,
  List,
  Button,
  Feed,
  Icon,
} from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import saga from '../sagas';
import reducer from '../reducer';
import avatarImg from 'assets/images/avatar.png';
import moment from 'moment';

import {
  loadAnalyticsReportRequest,
  clearMessage,
  // getAllNotificationRequest,
  // readNotificationRequest,
  // loadMoreNotificationRequest,
  // deleteNotificationRequest,
} from '../actions';

import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectReportData,
} from '../selector';

import PieChartData from './PieChartData';
import LineChartData from './LineChartData';
import CountData from './CountData';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  reportData: makeSelectReportData(),
});

const mapDispatchToProps = dispatch => ({
  loadAnalyticsReport: () => dispatch(loadAnalyticsReportRequest()),
  clearMessage: () => dispatch(clearMessage()),
});

class GoogleAnalyticsReport extends React.Component {
  state = {
    data: {},
    queryParams: {
      perPage: 5,
      currentPage: 1,
    },
  };

  componentWillUnMount() {
    this.props.clearMessage();
  }

  componentDidMount() {
    this.props.loadAnalyticsReport();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportData !== this.props.reportData) {
      this.setState(state => ({
        data: this.props.reportData.toJS(),
      }));
    }
  }

  _listenEvent = notification => {};

  _loadMoreMessage = () => {};

  _deleteNotification = notificationId => {};

  render() {
    const { data } = this.state;
    const {
      successResponse,
      errorResponse,
      requesting,
      getAllNotificationSuccess,
      getAllNotificationRequesting,
      getAllNotificationFailure,
      getAllNotificationResponse,
      getAllNotificationSuccessMsg,
      getAllNotificationFailureMsg,
    } = this.props;
    let message = null;
    if (successResponse) {
      message = <Toaster message={successResponse} timeout={5000} success />;
    }
    if (errorResponse) {
      message = <Toaster message={errorResponse} timeout={5000} error />;
    }

    return (
      <div>
        {message && message}
        <h2>Overview</h2>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <h4>Wallet Data</h4>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Segment className="announcements p-4">
                <div className="sm-heading">
                  <p className="title mb-4">Notification </p>
                </div>
                <div>
                  {getAllNotificationRequesting && (
                    <div className="loader_wallet m-5"></div>
                  )}
                  {!getAllNotificationRequesting &&
                    getAllNotificationFailure && (
                      <Message>{getAllNotificationFailureMsg}</Message>
                    )}

                  {!getAllNotificationRequesting &&
                    getAllNotificationSuccess &&
                    getAllNotificationResponse.toJS() &&
                    getAllNotificationResponse.toJS().length === 0 && (
                      <Message>{'No Notification Available'}</Message>
                    )}
                  {!getAllNotificationRequesting &&
                    getAllNotificationSuccess &&
                    getAllNotificationResponse.toJS() &&
                    getAllNotificationResponse.toJS().length > 0 && (
                      <List celled>
                        {getAllNotificationResponse
                          .toJS()
                          .map((notification, idx) => {
                            return (
                              <div
                                key={idx}
                                clearing
                                className={`bb1 px-3 py-1 new__notification ${
                                  notification.is_read ? 'red' : 'blue'
                                }`}
                              >
                                <div className="flex justify-content-sm-between">
                                  <Feed
                                    className="mt-3"
                                    onClick={() =>
                                      this._listenEvent(notification)
                                    }
                                  >
                                    <Feed.Event>
                                      {/* <Feed.Label image={avatarImg} />{' '} */}
                                      <div className=" icon__holder icon__holder--primary">
                                        <Icon name="bell outline" />
                                      </div>{' '}
                                      <Feed.Content>
                                        <Feed.Date
                                          content={moment(
                                            notification.timestamp,
                                          )
                                            .startOf('hour')
                                            .fromNow()}
                                        />
                                        <Feed.Summary>
                                          {notification.username && (
                                            <a>{notification.username}</a>
                                          )}{' '}
                                          {notification.notification}
                                        </Feed.Summary>
                                      </Feed.Content>
                                    </Feed.Event>
                                  </Feed>
                                  <div>
                                    <Button
                                      circular
                                      color="red"
                                      icon="close"
                                      onClick={() =>
                                        this._deleteNotification(
                                          notification.id,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {this.props.allNotificationCount !==
                          this.props.getAllNotificationResponse.toJS()
                            .length && (
                          <div className="text-center mt-4">
                            <Button
                              size="large"
                              color="black"
                              onClick={() => this._loadMoreMessage()}
                              disabled={
                                this.props.loadMoreNotificationRequesting
                              }
                            >
                              Load More
                            </Button>
                          </div>
                        )}
                      </List>
                    )}
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'googleAnalytics', reducer });
const withSaga = injectSaga({ key: 'googleAnalytics', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GoogleAnalyticsReport);
