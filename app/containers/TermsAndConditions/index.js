/**
 *
 * TermsAndConditions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import { Header, Breadcrumb, Container, Grid, Image } from 'semantic-ui-react';
import makeSelectTermsAndConditions from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Img from '../../assets/images/static/banner.jpg';

/* eslint-disable react/prefer-stateless-function */
export class TermsAndConditions extends React.Component {
  render() {
    return (
      <>
        <section className="inner-banner">
          <div className="bg-img">
            <Image src={Img} alt="bitcoin tech background image" />
          </div>

          <Breadcrumb>
            <Header>Terms and Conditions</Header>
            <Link to="/">
              <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>TermsAndConditions</Breadcrumb.Section>
          </Breadcrumb>
        </section>
        <section className="about-page-content">
          <Container>
            <Grid className="justify-content-center">
              <Grid.Column width={10}>
                <p>
                  You agree to be of legal age in your country to partake in
                  this program, and in all the cases your minimal age must be 18
                  years. BTC Transfer Wallet is not available to the general
                  public and is opened only to the qualified members the use of
                  this site is restricted to our members and to individuals
                  personally invited by them. Every deposit is considered to be
                  a private transaction between BTC Transfer Wallet and its
                  Member. As a private transaction, this program is exempted
                  from all US Citizens or Permanent residents of USA. We are not
                  FDIC insured. We are not a licensed bank or a security firm.
                </p>
                <h3>Identify verification</h3>
                <p>
                  BTC Transfer Wallet implements and maintains the highest
                  standards of Know Your Customer (“KYC”) processes and controls
                  as part of our commitment to combating fraud and in the
                  prevention of money laundering and terrorist financing. While
                  our industry is largely unregulated, BTC Transfer Wallet
                  voluntarily adheres to local and international compliance
                  standards in relation to customer due diligence. To ensure we
                  meet these standards, our customers are required to provide
                  certain personal details and documents when opening a BTC
                  Transfer Wallet Account (“Identity Verification”). The nature
                  and extent of the Identity Verification required will depend
                  on us, and the deposit and withdrawal limits that you wish to
                  apply to your Account.
                </p>
                <h2 className="section-header text-center">
                  Please read the following rules carefully before signing in.
                </h2>
                <p>
                  You agree that all information, communications, materials
                  coming from BTC Transfer Wallet are unsolicited and must be
                  kept private, confidential and protected from any disclosure.
                  Moreover, the information, communications and materials
                  contained herein are not to be regarded as an offer, nor a
                  solicitation for investments in any jurisdiction which deems
                  non-public offers or solicitations unlawful, nor to any person
                  to whom it will be unlawful to make such offer or
                  solicitation.
                </p>
                <p>
                  All the data giving by a member to BTC Transfer Wallet will be
                  only privately used and not disclosed to any third parties.
                  BTC Transfer Wallet is not responsible or liable for any loss
                  of data.ou agree to hold all principals and members harmless
                  of any liability. You are investing at your own risk and you
                  agree that a past performance is not an explicit guarantee for
                  the same future performance. You agree that all information,
                  communications and materials you will find on this site are
                  intended to be regarded as an informational and educational
                  matter and not an investment advice.
                </p>
                <p>
                  We reserve the right to change the rules, commissions and
                  rates of the program at any time and at our sole discretion
                  without notice, especially in order to respect the integrity
                  and security of the members' interests. You agree that it is
                  your sole responsibility to review the current terms.
                </p>
                <p>
                  BTC Transfer Wallet is not responsible or liable for any
                  damages, losses and costs resulting from any violation of the
                  conditions and terms and/or use of our website by a member.ou
                  guarantee to BTC Transfer Wallet that you will not use this
                  site in any illegal way and you agree to respect your local,
                  national and international laws.
                </p>
                <p>
                  Don't post bad vote on Public Forums and at Gold Rating Site
                  without contacting the administrator of our program FIRST.
                  Incase there was a technical problem with your transaction,
                  please ensure you always CLEAR things out with the
                  administrator.
                </p>
                <p>
                  We will not tolerate SPAM of any type in this program. SPAM
                  violators will be immediately and permanently removed from the
                  program.TCWallet reserves the right to accept or decline any
                  member for membership without explanation.
                </p>
                <h3>RISK</h3>
                <p>
                  Before using the Global BTC wallet Site, you should ensure
                  that you understand the risks involved in buying, selling or
                  trading cryptocurrencies. Cryptocurrency markets can be
                  volatile and prices can fluctuate significantly, which could
                  result in sudden and significant increases or decreases in the
                  value of your assets. To know more make research about market
                  volatility and other risks involved in buying, selling or
                  trading cryptocurrencies. There may be additional risks not
                  identified in these Terms. You should carefully assess whether
                  your financial situation and risk tolerance is suitable for
                  buying, selling or trading cryptocurrency. You accept and
                  agree that you are solely responsible for any decision to buy,
                  sell, trade or otherwise hold or deal with cryptocurrency.
                </p>
              </Grid.Column>
            </Grid>
          </Container>
        </section>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  termsAndConditions: makeSelectTermsAndConditions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'termsAndConditions', reducer });
const withSaga = injectSaga({ key: 'termsAndConditions', saga });

export default compose(withReducer, withSaga, withConnect)(TermsAndConditions);
