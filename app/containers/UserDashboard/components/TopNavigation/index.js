import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  Dropdown,
  Icon,
  Message,
  List,
  Button,
  Feed,
} from 'semantic-ui-react';
import avatarImg from 'assets/images/avatar.png';

import moment from 'moment';

const avatar = <Image src={avatarImg} avatar />;

class TopNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    data: {},
    queryParams: {
      perPage: 5,
      currentPage: 1,
    },
  };

  componentWillUnMount() {
    this.props.clearMessage();
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidMount() {
    const { queryParams } = this.state;
    document.addEventListener('mousedown', this.handleClickOutside);
    // this.props.fetchAllNotificationRequest(queryParams);
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.reportData !== this.props.reportData) {
    //   this.setState(state => ({
    //     data: this.props.reportData.toJS(),
    //   }));
    // }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.props.isNotificationBarOpen
    ) {
      this.props.handleNotificationList();
    }
  }

  render() {
    const {
      successResponse,
      errorResponse,
      requesting,
      fetchAllUserNotificationFailure,
      fetchAllUserNotificationSuccess,
      fetchAllUserNotificationResponse,
      fetchAllUserNotificationFailureMsg,
      fetchAllUserNotificationRequesting,
    } = this.props;

    return (
      <div className="main-header">
        <ul className="main-header__menu align-items-center">
          {/* <li className="nav__item notification active"> */}
          <li
            ref={this.setWrapperRef}
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
              {this.props.unreadUserNotificationCount}
            </span>
            <div className="notification__block">
              <div className="sm-heading">
                <p className="title my-4 px-3">
                  {' '}
                  Notification{' '}
                  <Icon
                    onClick={() => this.props.reloadNotification()}
                    name="redo"
                    size="large"
                  />{' '}
                </p>
              </div>
              <div>
                {fetchAllUserNotificationRequesting && (
                  <div className="loader_wallet m-5"></div>
                )}
                {!fetchAllUserNotificationRequesting &&
                  fetchAllUserNotificationFailure && (
                    <Message>{fetchAllUserNotificationFailureMsg}</Message>
                  )}

                {!fetchAllUserNotificationRequesting &&
                  fetchAllUserNotificationSuccess &&
                  fetchAllUserNotificationResponse.toJS() &&
                  fetchAllUserNotificationResponse.toJS().length === 0 && (
                    <Message>No Notification Available</Message>
                  )}
                {!fetchAllUserNotificationRequesting &&
                  fetchAllUserNotificationSuccess &&
                  fetchAllUserNotificationResponse.toJS() &&
                  fetchAllUserNotificationResponse.toJS().length > 0 && (
                    <List celled>
                      {fetchAllUserNotificationResponse
                        .toJS()
                        .map((notification, idx) => (
                          <div
                          key={idx}
                            // attached
                            // clearing
                            className={`bb1 px-3 py-1 ${
                              notification.is_read ? '' : 'new__notification'
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
                                  <div className=" icon__holder icon__holder--primary">
                                  <Icon name="bell outline" />
                                  </div>
                                  <Feed.Content>
                                    <Feed.Date
                                    content={moment(notification.timestamp)
                                        // .startOf('hour')
                                      .fromNow()}
                                    />
                                  <Feed.Summary>
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
                                // floated="right"
                                onClick={() =>
                                    this.props.deleteNotification(
                                    notification.id,
                                    )
                                  }
                              />
                              </div>
                            </div>
                          </div>
                        ))}

                      {this.props.allUserNotificationCount !==
                        this.props.fetchAllUserNotificationResponse.toJS()
                          .length && (
                        <div className="text-center mt-4">
                          <Button
                            size="large"
                            color="black"
                            onClick={() => this.props.loadMoreMessage()}
                            disabled={
                              this.props.seeMoreUserNotificationRequesting
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
                  to="/user/dashboard/profile/basic-info"
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
    );
  }
}

// const withReducer = injectReducer({ key: 'dashboardMain', reducer });
// const withSaga = injectSaga({ key: 'dashboardMain', saga });
// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(withReducer, withConnect)(TopNavigation);

export default TopNavigation;
