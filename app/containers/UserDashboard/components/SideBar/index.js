import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomScroll from 'react-custom-scroll';
import Logo from 'assets/Btcwallet_logo/logo.png';
import Logo2 from 'assets/Btcwallet_logo/logo-half.png';
import SideNavigation from './SideNavigation';

class SideBar extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="dashboard__sidebar">
          <div className="admin__logo">
            <Link to="/user/dashboard">
              <Image src={Logo} alt="XUL" />
            </Link>
          </div>
          <div className="admin__logo__half">
            <Link to="/user/dashboard">
              <Image src={Logo2} alt="XUL" />
            </Link>
          </div>
          <CustomScroll flex="1">
            <SideNavigation userRole={this.props.userRole} />
          </CustomScroll>
          <div className="sidebar__footer"></div>
        </div>
      </div>
    );
  }
}

export default SideBar;
