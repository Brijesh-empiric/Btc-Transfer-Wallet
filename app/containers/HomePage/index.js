import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import reducer from './reducer';
import saga from './sagas';

import b1 from '../../assets/images/static/banner.png';
import Img from '../../assets/images/static/bitcoin.png';
// import Logo3 from '../../assets/Btcwallet_logo/Version 3/Btcwallet_logo_3-01.png';
import Logo from '../../assets/Btcwallet_logo/Version 4/logo.svg';

import MillionIcon from '../../assets/images/icons_why/svg/003-customer-review.svg';
import WalletIcon from '../../assets/images/icons_why/svg/002-purse.svg';
import EarthIcon from '../../assets/images/icons_why/svg/003-earth.svg';

import EarthIcon2 from '../../assets/images/icons_why/mycollection/002-globe.png';
import TrustIcon from '../../assets/images/icons_why/mycollection/003-honesty.png';
import VerifiedIcon from '../../assets/images/icons_why/mycollection/001-verified.png';

import { userSignUpRequests, clearState } from './actions';

// import GetInTouch from './components/GetInTouch.js';

import {
  makeSelectError,
  makeSelectRequesting,
  makeSelectSignUpResponse,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectSignUpResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
});

const mapDispatchToProps = dispatch => ({
  userSignUpRequests: data => dispatch(userSignUpRequests(data)),
  clearState: () => dispatch(clearState()),
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
      isTermsAndConditionChecked: false,
    };
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.successResponse != prevProps.successResponse) {
      // if (this.props.successResponse) {
      toast.success('User Registered Successfully');
      // this.props.history.push(`/login`);
      this.props.history.push(
        `/email-verification?email=${this.state.data.email &&
          this.state.data.email}`,
      );
      // }
    }
    if (this.props.errorResponse != prevProps.errorResponse) {
      if (this.props.errorResponse) {
        toast.error('User Already Exists');
      }
    }
  }

  handleChange = e => {
    e.persist();
    this.setState(state => ({
      data: { ...state.data, [e.target.name]: e.target.value },
    }));
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    // if (data.username && data.username.length > 26)
    //   errors.username = "Can't be more than 26 characters";
    // if (data.username && !/^[a-zA-Z]+$/.test(data.username))
    //   errors.username = 'Can only contain letters';
    if (!data.email) errors.email = "Can't be blank";
    if (!data.password) errors.password = 'password_error';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.userSignUpRequests(this.state.data);
    }
  };

  _handleTermsAndConditionChecked = () => {
    this.setState({
      isTermsAndConditionChecked: !this.state.isTermsAndConditionChecked,
    });
  };

  render() {
    const { data, errors } = this.state;
    const { errorResponse, isRequesting } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Wallet Homepage</title>
          <meta name="description" content="Wallet" />
        </Helmet>

        {/* banner section */}
        <section className="banner">
          <div className="bg-img">
            <img src={Img} alt="bitcoin tech background image" />
          </div>
          <div className="container ui two column stackable grid content">
            <div className="column">
              <h1>What is Bitcoin?</h1>
              <p>
                Bitcoin is a decentralized, peer-to-peer cryptocurrency system
                designed to allow online users to process transactions through
                digital units of exchange called bitcoins (BTC). It is known as
                the world’s first widely-adopted cryptocurrency.
              </p>
            </div>
            <div className="column text-center">
              <Link to="/register" className="ui button huge get-started">
                Get Started
              </Link>
              <Link
                to="/contact"
                className="ui button huge get-started black  "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* about secion */}

        <section className="about">
          <div className="container ui two column stackable grid align-items-center">
            <div className="column">
              <img
                className="logo__about"
                src={Logo}
                alt="btc wallet version 3"
              />
              <h3 className="section-header">
                {' '}
                BTC Transfer Wallet is known as one of the world’s most trusted
                and secured cryptocurrency platform. With BTC Transfer Wallet,
                people can securely, directly and anonymously send each other
                digital money on the internet with a low transaction fee. It
                allows you to safely and securely send, receive, store and spend
                your Bitcoin.
              </h3>
            </div>
            <div className="column">
              {/* {errorResponse && (
          <div className="invalid_cred_msg">
          <Message negative icon>
            <Icon name="warning circle" />
            <Message.Content>
              <Message.Header>Error !</Message.Header>
              <p>{errorResponse}</p>
            </Message.Content>
          </Message>
          </div>
      )} */}
              <img className="banner__about" src={b1} alt="" />
              {/* <Form className="ui form sign-up" onSubmit={this.handleSubmit}>
                <p>Sign Up</p>
                <FormField
                  className="field"
                  name="username"
                  value={data.username || ''}
                  onChange={this.handleChange}
                  placeholder="Username"
                  error={errors.username}
                />
                <FormField
                  name="email"
                  type="email"
                  value={data.email || ''}
                  onChange={this.handleChange}
                  placeholder="Email"
                  error={errors.email}
                />
                <FormField
                  name="password"
                  type="password"
                  value={data.password || ''}
                  onChange={this.handleChange}
                  placeholder="Password"
                  error={errors.password}
                />
                <div className="field">
                  <label className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      name="log_out_all_devices"
                      onChange={this._handleTermsAndConditionChecked}
                      checked={this.state.isTermsAndConditionChecked}
                    />
                    <span className="custom-control-description">
                      {' '}
                      I have read and agree to the{' '}
                      <Link to={'/terms-and-conditions'}>
                        Terms and Conditions.
                      </Link>
                    </span>
                  </label>
                </div>
                <div className="field">
                  <Button
                    className="ui button  "
                    fluid
                    type="submit"
                    disabled={!this.state.isTermsAndConditionChecked}
                    loading={isRequesting}
                  >
                    Sign Up
                  </Button>
                </div>
              </Form> */}
            </div>
          </div>
        </section>

        {/* why-section */}

        <section className="why">
          <div className="ui container">
            <div>
              <h3 className="section-header">
                Why are people from all over the world choosing Bitcoin?
              </h3>
            </div>

            <div className="ui three column stackable grid ">
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={MillionIcon} alt="customer satisdaction icon" />
                  </figure>
                  <figcaption className="card card-title">
                    <b>Decentralized</b>
                  </figcaption>
                  <p style={{ color: '#FF9A00' }}>
                    A key element of bitcoin is its decentralized status,
                    meaning that it is not controlled or regulated by any
                    central authority. This immediately distinguishes it from
                    fiat currencies. Bitcoins are not issued by a central bank
                    or government system like fiat currencies.
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={WalletIcon} alt="Wallet icon" />
                  </figure>
                  <figcaption className="card card-title">
                    <b>It is a better way to move money</b>
                  </figcaption>
                  <p style={{ color: '#FF9A00' }}>
                    All over the world people make use of bitcoin to send money
                    to friends and family, buy things online, or even send
                    anonymous transactions. It can be easier, faster,
                    untraceable and requires a very low transaction fee compared
                    to the use of ordinary money.
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={EarthIcon} alt="Earth icon" />
                  </figure>
                  <figcaption className="card card-title">
                    <b>Pseudonymous</b>
                  </figcaption>
                  <p style={{ color: '#FF9A00' }}>
                    Bitcoin transactions are protected by cryptography. This is
                    a type of encryption technology that hides the identity of
                    the sender and receiver involved in the transaction. That’s
                    why Bitcoin and cryptocurrencies in general are considered
                    pseudonymous.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link to="/register" className="ui button   buy-btn">
                BUY BITCOIN
              </Link>
            </div>
          </div>
        </section>

        {/* 100% section */}

        <section className="reasons">
          <div className="ui container">
            <div>
              <h2 className="section-header text-center">
                BTC Transfer Wallet is 100%
              </h2>
            </div>

            <div className="ui three column stackable grid ">
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={TrustIcon} />
                  </figure>
                  <figcaption>
                    <p className="card-title">Trusted and User-friendly</p>
                    <p>
                      BTC Transfer Wallet is trusted and People love our
                      easy-to-use platform. Using digital currency may seem
                      confusing sometimes especially to beginners but we are
                      here to help. While we might have built a simple concept,
                      we know that some aspects of cryptocurrency can seem a bit
                      complex. BTC Transfer Wallet customer support is available
                      to all customers worldwide by phone or email. We provide
                      customer support in many different languages, we certainly
                      make your Bitcoin experience the best one.
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={EarthIcon2} />
                  </figure>
                  <figcaption>
                    <p className="card-title">Fast and Efficient</p>
                    <p>
                      BTC Transfer Wallet is really awesome. It speeds up
                      processes, improves efficiency and lowers costs.
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={VerifiedIcon} />
                  </figure>
                  <figcaption>
                    <p className="card-title">Privacy and Security</p>
                    <p>
                      BTC Transfer Wallet is 100% secure. When we say your
                      wallet is secure and your privacy is guaranteed, we really
                      mean it. We’ve built some of the world’s most
                      sophisticated Bitcoin security systems and have never been
                      compromised.
                      <br />
                      BTC Transfer Wallet takes a comprehensive approach to
                      protecting and securing your wallet. Our team of experts
                      have built in a number of sophisticated measures to
                      prevent the theft of money or information.  
                    </p>
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <GetInTouch /> */}
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(HomePage);
