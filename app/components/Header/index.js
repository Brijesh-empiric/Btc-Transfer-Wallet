/* eslint-disable react/prop-types */
import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
// import Logo from '../../assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png';
// import Logo from '../../assets/Btcwallet_logo/Version 4/logo.svg';
import Logo from '../../assets/Btcwallet_logo/Version 4/logo.png';
// import Logo from '../../assets/Btcwallet_logo/logo.png';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { makeSelectBtcPriceList } from '../../containers/App/selectors';

const settings = {
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  autoplay: true,
  speed: 10000,
  autoplaySpeed: 0,
  cssEase: 'linear',
  pauseOnHover: true,
  rtl: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        pauseOnHover: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: true,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
      },
    },
  ],
};
class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      sticky: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  };

  handleToggle = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  };

  // console.log(this.props,"friom the consoel");
  render() {
    const formatNumber = amount => {
      const formatter = new Intl.NumberFormat('en-US');
      return formatter.format(amount);
    };
    const isDataAvailable =
      this.props.btcPriceList.toJS() &&
      this.props.btcPriceList.toJS().dataList &&
      this.props.btcPriceList.toJS().dataList.length > 0;
    const { show, sticky } = this.state;
    const sliderData = isDataAvailable
      ? this.props.btcPriceList
          .toJS()
          .dataList.map(
            (
              {
                image,
                name,
                current_price,
                price_change_percentage_1h_in_currency,
              },
              index,
            ) => (
              <div key={index + 1} style={{ backgroundColor: 'aliceblue' }}>
                <div className="d-flex align-items-center mb-3">
                  <img
                    className="mr-2"
                    src={image}
                    style={{ width: '24px', maxHeight: '24px' }}
                    alt={name}
                  />
                  <span style={{ color: '#ffc800' }}> {name}</span>
                  &nbsp;
                  <span style={{ color: 'white' }}>{`$ ${formatNumber(
                    current_price,
                  )}`}</span>
                  &nbsp;
                  <span
                    style={{
                      color: `${
                        price_change_percentage_1h_in_currency > 0
                          ? 'green'
                          : 'red'
                      }`,
                    }}
                  >
                    {price_change_percentage_1h_in_currency?.toFixed(3)} %
                  </span>
                </div>
              </div>
            ),
          )
      : [];
    return (
      <header id="header" className={sticky ? 'home bg-black' : 'home'}>
        {isDataAvailable && (
          <div
            style={{
              maxHeight: '4px',
            }}
          >
            <Slider {...settings}>{sliderData}</Slider>
          </div>
        )}
        <div className="ui secondary  menu">
          <Link to="/" className="brand">
            <img src={Logo} width="300px" alt="BTC Transfer Wallet logo " />
          </Link>

          <div className="right menu main-menu">
            {/* <Link to="/" className="item">
              Exchange
            </Link> */}
            <Link to="/btc-price" className="item">
              Market Cap
            </Link>
            <Link to="/btc-converter" className="item">
              Price Calculator
            </Link>
            <Link to="/where-to-buy" className="item">
              Where To Buy
            </Link>
            <Link to="/about" className="active item">
              About Us
            </Link>
            <Link to="/contact" className="item">
              Contact Us
            </Link>
            <Link className="ui button  item login" to="/login">
              Sign In
            </Link>
          </div>
          <div className="right menu mobile-view">
            <div>
              <Button onClick={this.handleToggle} className="hamburger-menu">
                <Icon name="bars" />
              </Button>
            </div>
            <div
              className={show ? 'mobile-navigation show' : 'mobile-navigation '}
            >
              {/* <Link to="/" className="item">
                Exchange
              </Link> */}
              <Link to="/btc-price" className="item">
                Market Cap
              </Link>
              <Link to="/btc-converter" className="item">
                Price Calculator
              </Link>
              <Link to="/where-to-buy" className="item">
                Where To Buy
              </Link>
              <Link to="/about" className="active item">
                About Us
              </Link>
              <Link className="ui button  item login" to="/login">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  btcPriceList: makeSelectBtcPriceList(),
});

export default connect(mapStateToProps)(Header);
