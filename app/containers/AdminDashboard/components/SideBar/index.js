import React from 'react';
import { Image, Icon, Button } from 'semantic-ui-react';
import SideNavigation from '../SideNavigation';
import CustomScroll from 'react-custom-scroll';

class SideBar extends React.PureComponent {
  render() {
    return (
      <div className="dashboard__sidebar">
        <CustomScroll flex="1">
          <SideNavigation
          // userRole={this.props.userRole}
          />
        </CustomScroll>
      </div>
    );
  }
}

export default SideBar;
