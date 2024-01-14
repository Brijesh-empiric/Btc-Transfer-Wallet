import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  Dropdown,
  Label,
  Card,
  Grid,
  Segment,
  Message,
  List,
  Button,
  Feed,
  Icon,
} from 'semantic-ui-react';
import avatarImg from 'assets/images/avatar.png';
import moment from 'moment';

const avatar = <Image src={avatarImg} avatar />;
class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: {},
    queryParams: {
      perPage: 5,
      currentPage: 1,
    },
  };

  componentDidMount() {
    const { queryParams } = this.state;
    // this.props.getAllNotificationRequest(queryParams);
  }

  render() {
    const {
      fetchAllAdminNotificationFailure,
      fetchAllAdminNotificationSuccess,
      fetchAllAdminNotificationResponse,
      fetchAllAdminNotificationFailureMsg,
      fetchAllAdminNotificationRequesting,
    } = this.props;
    return (
      <div className="admin__header">
        <div className="ml-auto">
          <ul className="main-header__menu align-items-center">
            <li
              className={`nav__item notification ${
                this.props.isNotificationBarOpen ? 'active' : ''
              }`}
            >
              <Icon
                onClick={() => this.props.handleNotificationList()}
                name="bell outline"
                size="large"
              />
              <span className="count">
                {this.props.unreadAdminNotificationCount}
              </span>
              <div className="notification__block">
                <div className="sm-heading">
                  <p className="title my-4 px-3 ">
                    Notification{' '}
                    <Icon
                      onClick={() => this.props.reloadNotification()}
                      name="redo"
                      size="large"
                    />{' '}
                  </p>
                </div>
                <div>
                  {fetchAllAdminNotificationRequesting && (
                    <div className="loader_wallet m-5"></div>
                  )}
                  {!fetchAllAdminNotificationRequesting &&
                    fetchAllAdminNotificationFailure && (
                      <Message>{fetchAllAdminNotificationFailureMsg}</Message>
                    )}

                  {!fetchAllAdminNotificationRequesting &&
                    fetchAllAdminNotificationSuccess &&
                    fetchAllAdminNotificationResponse.toJS() &&
                    fetchAllAdminNotificationResponse.toJS().length === 0 && (
                      <Message>{'No Notification Available'}</Message>
                    )}
                  {!fetchAllAdminNotificationRequesting &&
                    fetchAllAdminNotificationSuccess &&
                    fetchAllAdminNotificationResponse.toJS() &&
                    fetchAllAdminNotificationResponse.toJS().length > 0 && (
                      <List celled>
                        {fetchAllAdminNotificationResponse
                          .toJS()
                          .map((notification, idx) => {
                            return (
                              <div
                                key={idx}
                                // clearing
                                className={`bb1 px-3 py-1 ${
                                  notification.is_read
                                    ? ''
                                    : 'new__notification'
                                }`}
                              >
                                <div className="flex justify-content-sm-between">
                                  <Feed
                                    className="mt-3"
                                    onClick={() =>
                                      this.props.listenEvent(notification)
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
                                            // .startOf('hour')
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
                                        this.props.deleteNotification(
                                          notification.id,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                        {this.props.allAdminNotificationCount !==
                          this.props.fetchAllAdminNotificationResponse.toJS()
                            .length && (
                          <div className="text-center mt-4">
                            <Button
                              size="large"
                              color="black"
                              onClick={() => this.props.loadMoreMessage()}
                              disabled={
                                this.props.seeMoreAdminNotificationRequesting
                              }
                            >
                              Load More
                            </Button>
                          </div>
                        )}
                      </List>
                    )}
                </div>
              </div>
            </li>
            <li>
              <Dropdown trigger={avatar} className="nav__link" direction="left">
                <Dropdown.Menu className="basic-nav-menu">
                  <Link
                    to="/admin/dashboard/profile"
                    role="option"
                    className="item"
                  >
                    <i className="icon user" />
                    <span className="text">Profile</span>
                  </Link>
                  <div
                    role="option"
                    className="item"
                    onClick={this.props.handleLogout}
                  >
                    <i className="icon sign-out" />
                    <span className="text">Log Out</span>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TopNavigation;
