import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';

import Profile from 'components/AdminProfile';
import Inbox from '../containers/Inbox';
import UserManagement from '../containers/UserManagement';
import CustomerQueries from '../containers/CustomerQueries';
import AdminModule from '../containers/UserManagement/AdminModule';
import AdminDetailModule from '../containers/UserManagement/AdminModule/AdminDetail';
import CustomerDetailModule from '../containers/UserManagement/CustomerModule/CustomerDetail';
import AdminKyc from '../containers/AdminKyc';
import AdminKycDetailById from '../containers/AdminKyc/components/AdminKycDetailById';
import AddressManagement from '../containers/AddressManagement';

function AdminRoutes({ location }) {
  return (
    <Suspense
      fallback={
        <Loader type="RevolvingDot" color="#00BFFF" height={0} width={0} />
      }
    >
      <Switch location={location}>
        <Route
          path="/admin/dashboard/profile"
          render={props => (
            <Profile
              tabs={[
                // {
                //   to: '/admin/dashboard/profile/basic-info',
                //   label: 'KYC',
                //   action_title: 'profile_basic_info',
                // },
                {
                  to: '/admin/dashboard/profile/password',
                  label: 'Password',
                  action_title: 'profile_password',
                },
                {
                  to: '/admin/dashboard/profile/multi-factor-auth',
                  label: 'Two Factor Auth',
                  action_title: 'profile_two_factor_auth',
                },
              ]}
              {...props}
            />
          )}
        />

        <Route
          exact
          path="/admin/dashboard/inbox"
          render={props => <Inbox {...props} />}
        />

        <Route
          exact
          path="/admin/dashboard/kyc"
          render={props => <AdminKyc {...props} />}
        />

        <Route
          exact
          path="/admin/dashboard/kyc/detail/:id"
          render={props => <AdminKycDetailById {...props} />}
        />

        <Route
          exact
          path="/admin/dashboard/customer-queries"
          render={props => <CustomerQueries {...props} />}
        />
        <Route
          exact
          path="/admin/dashboard/user-management/:userType"
          render={props => <UserManagement {...props} />}
        />
        <Route
          exact
          path="/admin/dashboard/user-management/create/admin"
          render={props => <AdminModule {...props} />}
        />
        <Route
          exact
          path="/admin/dashboard/user-management/admin-detail/:id"
          render={props => <AdminDetailModule {...props} />}
        />
        <Route
          exact
          path="/admin/dashboard/user-management/customer-detail/:id"
          render={props => <CustomerDetailModule {...props} />}
        />
        <Route
          exact
          path="/admin/dashboard/address-manangement"
          render={props => <AddressManagement {...props} />}
        />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps, {})(AdminRoutes);
