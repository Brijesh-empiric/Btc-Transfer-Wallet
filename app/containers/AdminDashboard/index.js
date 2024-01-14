import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import jwtDecode from 'jwt-decode';
import { Button } from 'semantic-ui-react';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import ProfilePic from 'assets/images/avatar.png';
import { makeSelectUser, makeSelectLocation } from '../App/selectors';
import { logoutRequest } from '../Login/actions';
import TopNavigation from './components/TopNavigation';
import SideBar from './components/SideBar';

import {
  makeSelectFetchAllAdminNotificationResponse,
  makeSelectFetchAllAdminNotificationSuccess,
  makeSelectFetchAllAdminNotificationFailure,
  makeSelectFetchAllAdminNotificationSuccessMsg,
  makeSelectFetchAllAdminNotificationFailureMsg,
  makeSelectFetchAllAdminNotificationRequesting,
  makeSelectSeeMoreAdminNotificationRequesting,
  makeSelectAllAdminNotificationCount,
  makeSelectUnreadAdminNotificationCount,
} from './selectors';

import {
  fetchAllAdminNotificationRequestAction,
  deleteAdminNotificationRequestAction,
  seeMoreAdminNotificationRequestAction,
  seenAdminNotificationRequestAction,
  decreaseNotificationCountRequestAction,
} from './actions';

import Routes from './Routes';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';

import GoogleAnalyticsReport from './containers/GoogleAnalytics/AnalyticsReport';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser(),

  fetchAllAdminNotificationSuccess: makeSelectFetchAllAdminNotificationSuccess(),
  fetchAllAdminNotificationFailure: makeSelectFetchAllAdminNotificationFailure(),
  fetchAllAdminNotificationResponse: makeSelectFetchAllAdminNotificationResponse(),
  fetchAllAdminNotificationSuccessMsg: makeSelectFetchAllAdminNotificationSuccessMsg(),
  fetchAllAdminNotificationFailureMsg: makeSelectFetchAllAdminNotificationFailureMsg(),
  fetchAllAdminNotificationRequesting: makeSelectFetchAllAdminNotificationRequesting(),
  seeMoreAdminNotificationRequesting: makeSelectSeeMoreAdminNotificationRequesting(),
  allAdminNotificationCount: makeSelectAllAdminNotificationCount(),
  unreadAdminNotificationCount: makeSelectUnreadAdminNotificationCount(),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  navigateToProfilePage: () => dispatch(push('/admin/dashboard/profile')),

  fetchAllAdminNotificationRequestAction: queryParams =>
    dispatch(fetchAllAdminNotificationRequestAction(queryParams)),
  seenAdminNotificationRequestAction: reqObj =>
    dispatch(seenAdminNotificationRequestAction(reqObj)),
  seeMoreAdminNotificationRequestAction: queryParams =>
    dispatch(seeMoreAdminNotificationRequestAction(queryParams)),
  deleteAdminNotificationRequestAction: reqObj =>
    dispatch(deleteAdminNotificationRequestAction(reqObj)),
  decreaseNotificationCountRequestAction: () =>
    dispatch(decreaseNotificationCountRequestAction()),
});

class AdminDashboard extends React.Component {
  state = {
    username: '',
    menuVisible: false,
    ProfilePic,
    moduleList: [],
    isNotificationBarOpen: false,
    queryParams: {
      perPage: 10,
      currentPage: 1,
    },
  };

  componentDidMount() {
    let username;
    const { queryParams } = this.state;
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
    this.props.fetchAllAdminNotificationRequestAction(queryParams);
  }

  _reloadNotification = () => {
    this.props.fetchAllAdminNotificationRequestAction({
      perPage: 10,
      currentPage: 1,
    });
    this.setState({
      queryParams: {
        perPage: 10,
        currentPage: 1,
      },
    });
    return;
  };

  _handleNotifcationList = () => {
    this.setState({
      isNotificationBarOpen: !this.state.isNotificationBarOpen,
    });
    return;
  };

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

  handleLogout = () => {
    this.props.logout();
  };

  _listenEvent = notification => {
    this.props.seenAdminNotificationRequestAction({
      notificationId: notification.id,
    });
    if (!notification.is_read) {
      this.props.decreaseNotificationCountRequestAction();
    }
    switch (notification.event) {
      case 'CHAT':
        this.props.history.push(
          `/admin/dashboard/inbox?ticketId=${notification.ticket}`,
        );
        break;
      case 'SUPPORT_TICKET':
        this.props.history.push(
          `/admin/dashboard/inbox?ticketId=${notification.ticket}`,
        );
        break;
      case 'KYC':
        this.props.history.push(
          `/admin/dashboard/kyc/detail/${notification.kyc_id}`,
        );
        break;
      default:
        break;
    }
  };

  _loadMoreMessage = () => {
    this.props.seeMoreAdminNotificationRequestAction({
      ...this.state.queryParams,
      currentPage: this.state.queryParams.currentPage + 1,
    });
    this.setState({
      queryParams: {
        ...this.state.queryParams,
        currentPage: this.state.queryParams.currentPage + 1,
      },
    });

    return;
  };

  _deleteNotification = notificationId => {
    this.props.deleteAdminNotificationRequestAction({ notificationId });
    return;
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <div className="dashboard__main">
        <SideBar
          email={this.state.email}
          username={this.state.username}
          // userRole={this.state.userRole}
          ProfilePic={this.state.ProfilePic}
        />
        <div className="admin__content">
          <TopNavigation
            {...this.props}
            handleLogout={this.handleLogout}
            ProfilePic={this.state.ProfilePic}
            listenEvent={this._listenEvent}
            reloadNotification={this._reloadNotification}
            isNotificationBarOpen={this.state.isNotificationBarOpen}
            handleNotificationList={this._handleNotifcationList}
            deleteNotification={this._deleteNotification}
            loadMoreMessage={this._loadMoreMessage}
          />
          <div className="admin__view">
            {(pathname === '/admin/dashboard' ||
              pathname === '/admin/dashboard/') && (
              <GoogleAnalyticsReport {...this.props} />
            )}
            <Routes location={this.props.location} />
          </div>
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'adminDashboard', reducer });
const withSaga = injectSaga({ key: 'adminDashboard', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(AdminDashboard);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(AdminDashboard),
// );
