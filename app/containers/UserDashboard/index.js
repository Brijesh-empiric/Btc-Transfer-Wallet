import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import ProfilePic from 'assets/images/noProfile.svg';
import { makeSelectUserConfirmation } from 'containers/Login/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import SideBar from './components/SideBar';
import { makeSelectLocation, makeSelectUser } from '../App/selectors';
import { logoutRequest } from '../Login/actions';
import {
  resendConfirmationRequest,
  fetchAllUserNotificationRequestAction,
  seeMoreUserNotificationRequestAction,
  seenUserNotificationRequestAction,
  deleteUserNotificationRequestAction,
  decreaseUserNotificationCountRequestAction,
} from './actions';
import { DOCUMENT_URL_UPDATE } from '../App/constants';
import Routes from './Routes';
import TopNavigation from './components/TopNavigation';
import './assets/style.scss';
import DashboardMain from './containers/DashboardMain';

import {
  makeSelectError,
  makeSelectResponse,
  makeSelectRequesting,
  makeSelectSuccess,
  makeSelectStatus,
  makeSelectFetchAllUserNotificationResponse,
  makeSelectFetchAllUserNotificationSuccess,
  makeSelectFetchAllUserNotificationFailure,
  makeSelectFetchAllUserNotificationSuccessMsg,
  makeSelectFetchAllUserNotificationFailureMsg,
  makeSelectFetchAllUserNotificationRequesting,
  makeSelectSeeMoreUserNotificationRequesting,
  makeSelectAllUserNotificationCount,
  makeSelectUnreadUserNotificationCount,
} from './selectors';

import reducer from './reducer';
import saga from './sagas';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser(),
  userConfirmation: makeSelectUserConfirmation(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  resendEmailSuccess: makeSelectSuccess(),
  responseStatus: makeSelectStatus(),

  fetchAllUserNotificationSuccess: makeSelectFetchAllUserNotificationSuccess(),
  fetchAllUserNotificationFailure: makeSelectFetchAllUserNotificationFailure(),
  fetchAllUserNotificationResponse: makeSelectFetchAllUserNotificationResponse(),
  fetchAllUserNotificationSuccessMsg: makeSelectFetchAllUserNotificationSuccessMsg(),
  fetchAllUserNotificationFailureMsg: makeSelectFetchAllUserNotificationFailureMsg(),
  fetchAllUserNotificationRequesting: makeSelectFetchAllUserNotificationRequesting(),
  seeMoreUserNotificationRequesting: makeSelectSeeMoreUserNotificationRequesting(),
  allUserNotificationCount: makeSelectAllUserNotificationCount(),
  unreadUserNotificationCount: makeSelectUnreadUserNotificationCount(),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  resendConfirmation: () => dispatch(resendConfirmationRequest()),
  navigateToProfilePage: () =>
    dispatch(push('/user/dashboard/profile/basic-info')),

  fetchAllUserNotificationRequestAction: queryParams =>
    dispatch(fetchAllUserNotificationRequestAction(queryParams)),
  seenUserNotificationRequestAction: reqObj =>
    dispatch(seenUserNotificationRequestAction(reqObj)),
  seeMoreUserNotificationRequestAction: queryParams =>
    dispatch(seeMoreUserNotificationRequestAction(queryParams)),
  deleteUserNotificationRequestAction: reqObj =>
    dispatch(deleteUserNotificationRequestAction(reqObj)),
  decreaseUserNotificationCountRequestAction: () =>
    dispatch(decreaseUserNotificationCountRequestAction()),
});

// const concernedElement = document.querySelector(".clickme");

class UserDashboard extends React.Component {
  // wrapperRef = React.createRef();
  static propTypes = {
    logout: PropTypes.func.isRequired,
    resendConfirmation: PropTypes.func.isRequired,
    navigateToProfilePage: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  state = {
    duration: 'Weekly',
    username: '',
    isConfirmed: false,
    ProfilePic,
    roles: [],
    messageVisible: true,
    showSticky: false,
    sidebar: false,
    isNotificationBarOpen: false,
    data: {},
    queryParams: {
      perPage: 10,
      currentPage: 1,
    },
  };

  componentDidMount() {
    const { queryParams } = this.state;
    let username;
    const { user } = this.props;
    const userInfo = user && user;
    if (userInfo && userInfo.size !== 0) {
      const email = userInfo.get('email');
      const firstName = userInfo.get('first_name');
      const lastName = userInfo.get('last_name');
      username = `${firstName} ${lastName}`;
      this.setState({
        username,
        isConfirmed: userInfo.get('confirmed'),
        email,
      });
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo.get('image_name')}`,
        });
      }
    }
    // document
    // .addEventListener('mousedown', this.handleClickOutside);
    this.props.fetchAllUserNotificationRequestAction(queryParams);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user.get('confirmed')) {
        this.setState({ isConfirmed: true });
      }
      const userInfo = this.props.user;
      const email = userInfo.get('email');
      const firstName = userInfo.get('first_name');
      const lastName = userInfo.get('last_name');
      const username = `${firstName} ${lastName}`;
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo.get('image_name')}`,
        });
      }
      this.setState({
        email,
        username,
        isConfirmed: userInfo.get('confirmed'),
      });
    }
  }

  // componentWillUnmount(){
  //   document
  //     .removeEventListener('mousedown', this.handleClickOutside);
  // }

  //  handleClickOutside = (event) => {
  //   if (
  //     this.wrapperRef.current &&
  //     !this.wrapperRef.current.contains(event.target)
  //   ) {
  //     // this.props.onOutsideClick();
  //     console.log('dadadadara')
  //   }
  // }

  showSticky = () => {
    this.setState({
      showSticky: !this.state.showSticky,
    });
  };

  resendConfirmation = () => this.props.resendConfirmation();

  handleLogout = () => this.props.logout();

  handleMessageDismiss = () => {
    this.setState({ messageVisible: false });
  };

  handleToggle = (e, se) => {
    if (this.state.duration == 'Monthly') {
      this.setState({ duration: 'Weekly' }, () => {
        this.props.fetchAnalyticsScore();
      });
    } else {
      this.setState({ duration: 'Monthly' }, () => {
        const monthly = true;
        this.props.fetchAnalyticsScore(monthly);
      });
    }
  };

  _reloadNotification = () => {
    this.props.fetchAllUserNotificationRequestAction({
      perPage: 10,
      currentPage: 1,
    });
    this.setState({
      queryParams: {
        perPage: 10,
        currentPage: 1,
      },
    });
  };

  handleToggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  _handleNotifcationList = () => {
    this.setState({
      isNotificationBarOpen: !this.state.isNotificationBarOpen,
    });
  };

  _listenEvent = notification => {
    this.props.seenUserNotificationRequestAction({
      notificationId: notification.id,
    });
    if (!notification.is_read) {
      this.props.decreaseUserNotificationCountRequestAction();
    }
    switch (notification.event) {
      case 'CHAT':
        this.props.history.push(
          `/user/dashboard/help?ticketId=${notification.ticket}`,
        );
        break;
      case 'SUPPORT_TICKET':
        this.props.history.push(
          `/user/dashboard/help?ticketId=${notification.ticket}`,
        );
        break;
      case 'KYC':
        this.props.history.push(`/user/dashboard/profile/basic-info`);
        break;
      default:
        break;
    }
  };

  _loadMoreMessage = () => {
    this.props.seeMoreUserNotificationRequestAction({
      ...this.state.queryParams,
      currentPage: this.state.queryParams.currentPage + 1,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        currentPage: this.state.queryParams.currentPage + 1,
      },
    });
  };

  _deleteNotification = notificationId => {
    this.props.deleteUserNotificationRequestAction({ notificationId });
  };

  render() {
    const url = window.location.href.split('/');
    return (
      <div className="dashboard__main">
        <SideBar
          username={this.state.username}
          email={this.state.email}
          profilePic={this.state.ProfilePic}
          sidebar={this.state.sidebar}
          handleLogout={this.handleLogout}
          showSticky={this.showSticky}
        />

        <div className="dashboard__content-user">
          <TopNavigation
            {...this.props}
            isNotificationBarOpen={this.state.isNotificationBarOpen}
            handleNotificationList={this._handleNotifcationList}
            username={this.state.username}
            handleLogout={this.handleLogout}
            showSticky={this.showSticky}
            cartSize={this.state.cartSize}
            reloadNotification={this._reloadNotification}
            handleToggleSidebar={this.handleToggleSidebar}
            profilePic={this.state.ProfilePic}
            listenEvent={this._listenEvent}
            deleteNotification={this._deleteNotification}
            loadMoreMessage={this._loadMoreMessage}
          />
          <div className="content-wrap">
            {((url.length == 5 && url[3] == 'user' && url[4] == 'dashboard') ||
              (url[5] == '' && url.length == 6)) && <div></div>}
            {location.pathname === '/user/dashboard' && (
              <DashboardMain {...this.props} />
            )}
            <Routes location={this.props.location} />
          </div>
        </div>
      </div>
    );
  }
}
const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(UserDashboard);
