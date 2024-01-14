import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import avatarImg from 'assets/images/avatar.png';
import verify from 'assets/images/verification.jpg';
import TradingViewWidget from 'react-tradingview-widget';

import getUserInfo from 'utils/getUserInfo';
// import { makeSelectUser as userInfo } from '../../../App/selectors';

// import {makeSelectUser} from '../../../../components/Settings/MultiFactorAuth/selectors';
import {
  Grid,
  Segment,
  Message,
  Divider,
  Icon,
  Feed,
  Accordion,
  Header,
  Button,
  Modal,
} from 'semantic-ui-react';
import Chart from 'react-apexcharts';
import moment from 'moment';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import BTCCalculator from '../../../../components/BTCConverter';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
  makeSelectBitcoinExchangeRequesting,
  makeSelectBitcoinExchangeData,
  makeSelectStopShowing2faAlertMessage,
  // makeSelectFetchAllNotificationResponse,
  // makeSelectFetchAllNotificationSuccess,
  // makeSelectFetchAllNotificationFailure,
  // makeSelectFetchAllNotificationSuccessMsg,
  // makeSelectFetchAllNotificationFailureMsg,
  // makeSelectFetchAllNotificationRequesting,
  // makeSelectSeeMoreNotificationRequesting,
  // makeSelectAllNotificationCount,
} from './selectors';
import saga from './sagas';
import reducer from './reducer';

import {
  loadBasicInfoRequest,
  getBitcoinExchangesRequest,
  stopShowing2faAlertMessageRequest,
} from './actions';
am4core.useTheme(am4themes_animated);

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  user: makeSelectUser(),
  // userInfo: userInfo(),
  bitcoinExchangeRequesting: makeSelectBitcoinExchangeRequesting(),
  bitcoinExchangeData: makeSelectBitcoinExchangeData(),
  stopShowing2faAlertMessage: makeSelectStopShowing2faAlertMessage(),
});

const mapDispatchToProps = dispatch => ({
  dispatchLoadBasicInfoRequest: userEmail =>
    dispatch(loadBasicInfoRequest(userEmail)),
  dispatchGetBitcoinExchangesRequest: () =>
    dispatch(getBitcoinExchangesRequest()),
  stopShowing2faAlertMessageRequest: () =>
    dispatch(stopShowing2faAlertMessageRequest()),
});

class DashboardMain extends React.Component {
  // state = { activeIndex: 0 };

  // handleClick = (e, titleProps) => {
  //   const { index } = titleProps;
  //   const { activeIndex } = this.state;
  //   const newIndex = activeIndex === index ? -1 : index;

  //   this.setState({ activeIndex: newIndex });
  // };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isInfoModalOpen: false,
      notificationQueryParams: {
        perPage: 5,
        currentPage: 1,
      },
      userDetails: {},
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  }

  // componentWillMount() {
  //   this._handleOpen2FAInfoModal();
  // }
  componentDidMount() {
    this.props.dispatchLoadBasicInfoRequest();
    this.props.dispatchGetBitcoinExchangesRequest();
    this._handleOpen2FAInfoModal();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  _handleOpen2FAInfoModal = () => {
    const multi = localStorage.getItem('2fa');
    if (
      (multi === 'false' || multi === null) &&
      !this.props.stopShowing2faAlertMessage
    )
      this.setState({
        isInfoModalOpen: true,
      });
  };

  _handleClose2FAInfoModal = () => {
    this.setState({
      isInfoModalOpen: false,
    });
    this.props.stopShowing2faAlertMessageRequest();
  };

  renderBitcoinExchangesGraph({ values }) {
    // let chart = am4core.create('chartdiv', am4charts.XYChart);

    // let xAxis = chart.xAxes.push(new am4charts.DateAxis());
    // xAxis.title.text = 'Date';
    // xAxis.title.fontWeight = 'bold';

    // chart.paddingRight = 20;
    // chart.data = values;
    // chart.responsive.enabled = true;

    // let title = chart.titles.create();
    // title.text = 'Bitcoin Chart';
    // title.fontSize = 25;
    // title.marginBottom = 30;

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 15;

    // valueAxis.title.text = 'Price (USD)';
    // valueAxis.title.fontWeight = 'bold';
    // valueAxis.renderer.labels.template.adapter.add(
    //   'text',
    //   (label, target, key) => {
    //     return label + ' (USD)';
    //   },
    // );

    // let series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = 'date';
    // series.dataFields.valueY = 'value';

    // series.tooltipText = '${valueY.value}';
    // chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    // this.chart = chart;

    this.setState({
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
          categories: values.map(data => {
            const time = new Date(data.date);
            return time.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            });
          }),
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
      },
      series: [
        {
          // name: 'Amount (USD)',
          type: 'area',
          data: values.map(data => data.value),
        },
      ],
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const user = this.props.user.toJS();
      this.setState({
        userDetails: user,
      });
    }

    if (prevProps.bitcoinExchangeData !== this.props.bitcoinExchangeData) {
      const bitcoinExchangeData = this.props.bitcoinExchangeData.toJS();
      // ///////////////////////Graph logic here
      if (
        bitcoinExchangeData &&
        bitcoinExchangeData.values &&
        bitcoinExchangeData.values.length > 0
      ) {
        this.renderBitcoinExchangesGraph(bitcoinExchangeData);
      }
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { userDetails, activeIndex } = this.state;
    const {
      bitcoinExchangeRequesting,
      // fetchAllNotificationFailure,
      // fetchAllNotificationSuccess,
      // fetchAllNotificationResponse,
      // fetchAllNotificationFailureMsg,
      // fetchAllNotificationRequesting,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Dashboard" />
        </Helmet>
        <Grid divided="vertically" doubling stackable>
          <Grid.Row>
            <Grid.Column computer={11} tablet={16}>
              <div className="main-heading">
                <p className="title">
                  {' '}
                  <i className="icon tv"></i> Welcome,{' '}
                  <span className="text-muted">
                    {userDetails && userDetails.username
                      ? ` ${userDetails.username}`
                      : ''}
                  </span>
                </p>
              </div>
              <Segment className="welcome-dashboard p-4">
                <h2>Welcome Note:</h2>
                <div>
                  <p>
                    Welcome to your personal BTC Transfer Wallet account. Your
                    account is ready to securely send and receive bitcoin. To
                    enjoy full functionalities of this wallet, you may need to
                    verify your account by using the KYC Form in PROFILE. If you
                    need further assistance, please contact us through Help Desk
                    or you can send us an email at{' '}
                    <a
                      href="mailto:info@btctransferwallet.com"
                      referrerPolicy="no-referrer"
                    >
                      info@btctransferwallet.com
                    </a>
                    .
                  </p>
                  {/* <Divider clearing />
                  <p>
                    {' '}
                    To keep your account more secured, please enable your
                    Two-Factor Authenticator in SETTINGS.
                  </p> */}
                </div>
              </Segment>
              {/* <Segment>
                {!bitcoinExchangeRequesting ? (
                  <div
                    id="chartdiv"
                    style={{ width: '100%', height: '500px' }}
                  ></div>
                ) : (
                  <div className="loader_wallet m-5"></div>
                )}
              </Segment> */}

              {/* <Segment className="main-statistics">
                <div>
                  <p className="title">price</p>
                  <p className="value">$15,508.64</p>
                </div>
                <div>
                  <p className="title">
                    24 HOUR % CHANGE</p>
                  <p className="value text-green" ><i className="icon angle up"></i>3.49%</p>
                </div>
                <div>
                  <p className="title">MARKET CAP</p>
                  <p className="value">$287.95B</p>
                </div>
                <div>
                  <p className="title">VOLUME (24H)</p>
                  <p className="value">$39.44B</p>
                </div>
              </Segment> */}
            </Grid.Column>
            <Grid.Column computer={5} tablet={16}>
              <Segment className="announcements p-4">
                <div className="sm-heading">
                  <p className="title">Announcements</p>
                </div>
                <p>
                  With growing popularity for the use and storage of different
                  cryptocurrencies in recent times, BTC Transfer Wallet is
                  subject to update and upgrade its platform periodically.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={11} tablet={16}>
              <Segment className="p-4 trading_view">
                <h2>Chart:</h2>

                {bitcoinExchangeRequesting ? (
                  <div className="loader_wallet m-5"></div>
                ) : (
                  <TradingViewWidget className="aa" symbol="btcusdt" />
                  /*   <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    // width="1000"
                  /> */
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column computer={5} tablet={16}>
              <Segment className="p-4">
                <h2>BTC Calculator</h2>
                <p>
                  BTC Transfer Wallet&apos;s live crypto calculator does the
                  math so you don&apos;t have to, giving real rates in real
                  time. Convert fiat to crypto, plan your investment, and buy.
                  All with BTC Transfer Wallet.
                </p>
                <BTCCalculator />
              </Segment>
            </Grid.Column>
            {/* <Grid.Column computer={11} tablet={16}>
              <Segment className="p-4">
                <h2>FAQ</h2>
                <Accordion>
                  <Accordion.Title
                    // active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Am I too late to buy bitcoin?
                  </Accordion.Title>
                  <Accordion.Content
                  // active={activeIndex === 0}
                  >
                    <p>
                      The noise around Bitcoin has risen sharply in recent
                      months. With all the talk of its price going up and down,
                      it’s easy to feel like you’ve missed the boat, like
                      there’s this big party going on that you weren’t invited
                      to and now it’s full.
                      <br /> The good news? It’s not full and it never will be.
                      Cryptocurrency is here to stay and we’ll all be using it
                      in the years to come. <br />
                      It’s a party that you’re very much invited to. And by many
                      definitions, you’re actually early.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    // active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Here’s why you’re not too late to buy Bitcoin
                  </Accordion.Title>
                  <Accordion.Content
                  // active={activeIndex === 1}
                  >
                    <p>
                      Bitcoin’s fixed supply is well known. It’s built so that
                      just 21 million can ever be created. However, did you know
                      you don’t have to buy a whole bitcoin? Much like a dollar
                      can be broken up into cents, pounds into pence, and yen
                      into sen, Bitcoin is made up of satoshis.
                    </p>
                    <p>
                      Each bitcoin is made up of 100 million satoshis. This
                      means there are two quadrillion one hundred trillion
                      satoshis. This converts to nearly 275,000 satoshis for
                      every person on the planet. Plenty to go around, right?
                    </p>
                    <p>
                      The value of these satoshis will vary in line with the
                      bitcoin price. So if bitcoin is worth $50,000, that means
                      you can pick up one satoshi for just $0.0005. People
                      probably won’t limit themselves to 275,000, so it’s best
                      to get as many as you can while it’s at prices you think
                      are reasonable, as it could rise much higher in the
                      future. This is what people mean when they say they’re
                      ‘stacking SATs’.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    // active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Just how early am I?
                  </Accordion.Title>
                  <Accordion.Content
                  // active={activeIndex === 2}
                  >
                    <p>
                      From a technological standpoint, you’re certainly still
                      early and we’ve yet to reach anything like mass adoption —
                      though we’re certainly getting there.
                    </p>
                    <p>
                      Bitcoin has been around for just over 12 years now and
                      other cryptocurrencies for far less time. Pretty much any
                      new technology goes through a hype cycle before getting a
                      mainstream stamp of approval. You’ll have seen this play
                      out with technological innovations like the internet in
                      the 1990s.
                    </p>
                    <p>
                      The hype cycle dictates that a technology will first
                      develop and attract attention. Then, seemingly overnight,
                      everyone is talking about it. But the hype becomes
                      unsustainable, and after a while, the public loses
                      interest and becomes disillusioned.
                    </p>
                    <p>
                      With time though, the technology inches its way out of the
                      trough of disappointment and hits the plateau of
                      productivity.
                    </p>
                    <p>
                      Eventually, it fades into the background and becomes the
                      new ‘normal’ – an everyday part of our lives.
                    </p>{' '}
                  </Accordion.Content>
                  <Accordion.Title
                    // active={activeIndex === 2}
                    index={3}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    What Bitcoin brings to the party
                  </Accordion.Title>
                  <Accordion.Content
                  // active={activeIndex === 2}
                  >
                    <p>
                      At the end of the day, it’s not about being “too early” or
                      “too late”. What’s important is the problem Bitcoin is
                      solving.
                    </p>
                    <p>
                      Bitcoin is a new way of looking at our financial system;
                      one that’s more transparent, open, and fair. It makes
                      money more useful and helps it keep its value, providing a
                      hedge against rising inflation and currency devaluation —
                      an insurance policy against the decay of your money. It is
                      also considered by many to be the payment system of the
                      future - the main reason most Bitcoin holders have taken a
                      long-term view.
                    </p>
                    <p>
                      It’s impossible to predict the future, but in the past few
                      months, we’ve seen adoption mature, and the desire to
                      understand it and get involved only keeps growing.
                    </p>
                    <p>
                      Ultimately, cryptocurrency is just getting started. Will
                      you get in on the ground floor?
                    </p>
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Grid.Column>
          */}
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment className="welcome-dashboard p-4">
                <h2>Frequently Asked Questions:</h2>
                <Accordion fluid styled>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Am I too late to buy bitcoin?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <p>
                      The noise around Bitcoin has risen sharply in recent
                      months. With all the talk of its price going up and down,
                      it’s easy to feel like you’ve missed the boat, like
                      there’s this big party going on that you weren’t invited
                      to and now it’s full.
                    </p>
                    <p>
                      The good news? It’s not full and it never will be.
                      Cryptocurrency is here to stay and we’ll all be using it
                      in the years to come. It’s a party that you’re very much
                      invited to. And by many definitions, you’re actually
                      early.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    How am I not too late to buy Bitcoin?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                    <p>
                      Bitcoin’s fixed supply is well known. It’s built so that
                      just 21 million can ever be created. However, did you know
                      you don’t have to buy a whole bitcoin? Much like a dollar
                      can be broken up into cents, pounds into pence, and yen
                      into sen, Bitcoin is made up of satoshis.
                    </p>
                    <p>
                      Each bitcoin is made up of 100 million satoshis. This
                      means there are two quadrillion one hundred trillion
                      satoshis. This converts to nearly 275,000 satoshis for
                      every person on the planet. Plenty to go around, right?
                    </p>
                    <p>
                      The value of these satoshis will vary in line with the
                      bitcoin price. So if bitcoin is worth $50,000, that means
                      you can pick up one satoshi for just $0.0005. People
                      probably won’t limit themselves to 275,000, so it’s best
                      to get as many as you can while it’s at prices you think
                      are reasonable, as it could rise much higher in the
                      future. This is what people mean when they say they’re
                      ‘stacking SATs’.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    Just how early am I?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    <p>
                      From a technological standpoint, you’re certainly still
                      early and we’ve yet to reach anything like mass adoption —
                      though we’re certainly getting there.
                    </p>
                    <p>
                      Bitcoin has been around for just over 12 years now and
                      other cryptocurrencies for far less time. Pretty much any
                      new technology goes through a hype cycle before getting a
                      mainstream stamp of approval. You&apos;ll have seen this
                      play out with technological innovations like the internet
                      in the 1990s.
                    </p>
                    <p>
                      The hype cycle dictates that a technology will first
                      develop and attract attention. Then, seemingly overnight,
                      everyone is talking about it. But the hype becomes
                      unsustainable, and after a while, the public loses
                      interest and becomes disillusioned.
                    </p>
                    <p>
                      With time though, the technology inches its way out of the
                      trough of disappointment and hits the plateau of
                      productivity.
                    </p>
                    <p>
                      Eventually, it fades into the background and becomes the
                      new ‘normal’ – an everyday part of our lives.
                    </p>
                  </Accordion.Content>

                  <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={this.handleClick}
                  >
                    <Icon name="dropdown" />
                    What does Bitcoin bring to the party?
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 3}>
                    <p>
                      At the end of the day, it’s not about being “too early” or
                      “too late”. What’s important is the problem Bitcoin is
                      solving.
                    </p>
                    <p>
                      Bitcoin is a new way of looking at our financial system;
                      one that’s more transparent, open, and fair. It makes
                      money more useful and helps it keep its value, providing a
                      hedge against rising inflation and currency devaluation —
                      an insurance policy against the decay of your money. It is
                      also considered by many to be the payment system of the
                      future - the main reason most Bitcoin holders have taken a
                      long-term view.
                    </p>
                    <p>
                      It’s impossible to predict the future, but in the past few
                      months, we’ve seen adoption mature, and the desire to
                      understand it and get involved only keeps growing.
                    </p>
                    <p>
                      Ultimately, cryptocurrency is just getting started. Will
                      you get in on the ground floor?
                    </p>
                  </Accordion.Content>
                </Accordion>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          open={this.state.isInfoModalOpen}
          onClose={() => this._handleClose2FAInfoModal()}
        >
          <Header
            icon="info"
            content="Protect your account with 2-Step Verification"
          />
          <Modal.Content>
            <Grid>
              <Grid.Row className="align-items-center">
                <Grid.Column computer="6">
                  <div className="text-center">
                    <img style={{ width: '100%' }} src={verify} alt="" />
                  </div>
                </Grid.Column>
                <Grid.Column computer="10">
                  <p>
                    With 2-Step Verification (also known as two-factor
                    authentication), you add an extra layer of security to your
                    account in case your password is stolen. After you set up
                    2-Step Verification, you’ll sign in to your account in two
                    steps using:
                  </p>
                  <ol>
                    <li> Something you know ( Your password)</li>
                    <li> Something you have (Your phone)</li>
                  </ol>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Message
              info
              icon="help"
              header="How to turn on 2-Step Verification?"
              content=" In the left navigation panel, select SETTINGS. Select Two Factor
    Auth and then Get started. Follow the on-screen steps as shown
    there."
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              onClick={() => this._handleClose2FAInfoModal()}
            >
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'dashboardMain', reducer });
const withSaga = injectSaga({ key: 'dashboardMain', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(DashboardMain);
