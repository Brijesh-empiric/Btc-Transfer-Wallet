import React from 'react';
import Routes from './Routes';
import { Helmet } from 'react-helmet';
import TabbedView from './components/TabView';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
  };
  state = {
    tabs: this.props.tabs ? this.props.tabs : [],
  };
  render() {
    return (
      <div className="wallet-n-address__tabs">
        <Helmet>
          <title>Wallet and Address</title>
          <meta
            name="description"
            content="Description of Wallet and Address"
          />
        </Helmet>
        <TabbedView items={this.state.tabs} />
        <Routes />
      </div>
    );
  }
}

export default Profile;
