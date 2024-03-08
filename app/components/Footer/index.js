import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
// import Logo3 from '../../assets/Btcwallet_logo/Version 3/Btcwallet_logo_3-01.png';
// import Logo from '../../assets/Btcwallet_logo/Version 4/logo.svg';
import Logo from '../../assets/Btcwallet_logo/Version 4/logo.png';

export class Footer extends React.PureComponent {
  _getCurrentYear = () => new Date().getFullYear();

  render() {
    return (
      <React.Fragment>
        <footer id="footer">
          <div className="ui container">
            <div>
              <Link to="/">
                <img src={Logo} alt="BTC Transfer Wallet logo " />
              </Link>
              <p>&copy; Copyright {this._getCurrentYear()}</p>
            </div>

            <div className="footer-menu">
              <Link to="/about" className="active item">
                About Us
              </Link>
              <Link to="/terms-and-conditions">Terms And Conditions</Link>
              <Link to="/btc-price" className="item">
                Market Cap
              </Link>
              <Link to="/btc-converter" target="_blank">
                Price Calculator
              </Link>
              <Link to="/where-to-buy" className="item">
                Where To Buy
              </Link>
              <Link to="/contact" target="_blank">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Footer);
