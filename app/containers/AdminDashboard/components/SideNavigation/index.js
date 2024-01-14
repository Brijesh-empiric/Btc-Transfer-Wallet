import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Menu, Image } from 'semantic-ui-react';
import Logo from 'assets/Btcwallet_logo/logo.png';
import Logo2 from 'assets/Btcwallet_logo/logo-half.png';

const mainMenu = [
  // {
  //   title: 'Overview',
  //   path: '/admin/dashboard/',
  //   icon: 'icon dashboard',
  // },
  {
    title: 'User Management',
    path: '/admin/dashboard/user-management/customer',
    icon: 'icon user',
  },
  {
    title: 'Admin Management',
    path: '/admin/dashboard/user-management/admin',
    icon: 'icon user',
  },
  {
    title: 'Support Ticket Management',
    path: '/admin/dashboard/inbox',
    icon: 'icon chat',
  },
  {
    title: 'Customer Queries',
    path: '/admin/dashboard/customer-queries',
    icon: 'icon help',
  },
  {
    title: 'KYC Management',
    path: '/admin/dashboard/kyc',
    icon: 'icon file alternate outline',
  },
  {
    title: 'Address Management',
    path: '/admin/dashboard/address-manangement',
    icon: 'icon address book',
  },
  // {
  //   title: 'Schedule',
  //   path: '/admin/dashboard/schedule-management',
  //   icon: 'icon clock outline',
  // },
  // {
  //   title: 'Payout',
  //   path: '/admin/dashboard/payout-management',
  //   icon: 'icon amazon pay',
  // },
];

class SideNavigation extends React.Component {
  state = {
    activeIndex: 0,
    setActive: '',
    //  userRole: this.props.userRole
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleClickActive = title => {
    this.setState({ setActive: title, subTitle: '' });
  };

  render() {
    const {
      // userRole,
      // activeIndex,
    } = this.state;
    return (
      <div>
        <div className="admin__logo">
          <Link to="/admin/dashboard">
            <Image src={Logo} alt="XAL" />
          </Link>
        </div>
        <div className="admin__logo__half">
          <Link to="/admin/dashboard">
            <Image src={Logo2} alt="XAL" />
          </Link>
        </div>
        {/* <h5 className="sub__text">CMS</h5> */}
        <Accordion as={Menu} vertical className="dashboard__sidenav">
          {mainMenu.map((menu, idx) => {
            return (
              <div
                onClick={() => this.handleClickActive(menu.title)}
                className={
                  this.state.setActive == menu.title ? 'menu-active' : ''
                }
                key={`menu${idx}`}
              >
                <Menu.Item>
                  <Link className="nav__link" to={`${menu.path}`}>
                    <span className="nav__icon">
                      <i className={`${menu.icon}`} />
                    </span>
                    <span className="nav__text">{`${menu.title}`}</span>
                  </Link>
                </Menu.Item>
              </div>
            );
          })}
          {/* {userRole === 'admin' &&
            mainMenu.map((main, idx) => {
              if (main.subMenues) {
                return (
                  <Menu.Item key={`sub${idx}`}>
                    <Accordion.Title
                      active={activeIndex === idx}
                      index={idx}
                      onClick={this.handleClick}
                    >
                      <span className="nav__link">
                        {main.icon && (
                          <span className="nav__icon">
                            <i className={main.icon} />
                          </span>
                        )}
                        <span className="nav__text">{main.title}</span>
                      </span>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === idx}>
                      {main.subMenues.map((menu, idx) => (
                        <div key={idx}>
                          <Link className="nav__link" to={menu.path}>
                            <span className="nav__icon">
                              <i className={menu.icon} />
                            </span>
                            <span className="nav__text">{menu.title}</span>
                          </Link>
                        </div>
                      ))}
                    </Accordion.Content>
                  </Menu.Item>
                );
              }
              return (
                <Menu.Item key={`main${idx}`}>
                  <Link className="nav__link" to={main.path}>
                    {main.icon && (
                      <span className="nav__icon">
                        <i className={main.icon} />
                      </span>
                    )}
                    <span className="nav__text">{main.title}</span>
                  </Link>
                </Menu.Item>
              );
            })} */}
        </Accordion>
      </div>
    );
  }
}
export default SideNavigation;
