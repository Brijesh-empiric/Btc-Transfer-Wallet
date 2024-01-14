/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
/*
  Created by: ui_monkey 11/11/2020
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { createStructuredSelector } from 'reselect';
import { loginByTokenRequest } from 'containers/Login/actions';
import Route from './Routes';
import {
  makeSelectLoading,
  makeSelectLocation,
  makeSelectError,
  makeSelectUser,
  makeSelectDialog,
} from './selectors';
import { setToken, setUser, getBtcPriceRequest } from './actions';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  loginByTokenRequest: userId => dispatch(loginByTokenRequest(userId)),
  setToken: token => dispatch(setToken(token)),
  setUser: userInfo => dispatch(setUser(userInfo)),
  getBtcPriceRequest: data => dispatch(getBtcPriceRequest(data)),
});

class App extends React.Component {
  static propTypes = {
    loginByTokenRequest: PropTypes.func.isRequired,
  };

  state = {
    ownDashboard: true,
  };

  componentDidMount() {
    this.props.getBtcPriceRequest({ perpage: 10 });
    const token =
      this.props.location.pathname.split('/')[1] === 'admin'
        ? localStorage.getItem('token')
        : sessionStorage.getItem('token')
        ? sessionStorage.getItem('token')
        : localStorage.getItem('token');
    if (token && token === sessionStorage.getItem('token')) {
      this.setState({ ownDashboard: false });
    }
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const user_id = localStorage.getItem('user_id');
    const multi_factor_auth_enable = localStorage.getItem(
      'multi_factor_auth_enable',
    );
    this.props.setToken(token);
    this.props.setUser({
      email,
      role,
      user_id,
      multi_factor_auth_enable,
    });
    // try {
    //   const decoded = jwtDecode(token);
    //   console.log(decoded);
    //   if (typeof decoded === 'object' && decoded.hasOwnProperty('user_id')) {
    //     if (decoded.user_id) this.props.loginByTokenRequest(decoded.user_id);
    //   }
    // } catch (error) {}
  }

  render() {
    return (
      <div id="wrapper">
        <Route location={this.props.location} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
