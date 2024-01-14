import React from 'react';
import Header from 'components/Header';
class HeaderLayout extends React.Component {
  render() {
    return (
      <div className="web__wrap">
        <Header {...this.props} />
        <div className="web__main">{this.props.children}</div>
      </div>
    );
  }
}

export default HeaderLayout;
