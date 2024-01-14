/**
 *
 * AdminDetail
 *
 */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Card, Grid, Divider, Button, Label } from 'semantic-ui-react';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import makeSelectAdminDetail from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class AdminDetail extends React.Component {
  render() {
    console.log(this.props.location.state);
    // {role: 2, email: "parishilanrayamajhi@gmail.com", verified: 1, last_name: "Admin", first_name: "Parin"}
    return (
      <div>
        <Helmet>
          <title>Admin Detail</title>
          <meta name="description" content="Description of Admin Detail" />
        </Helmet>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>Admin Detail</h2>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                circular
                icon="arrow left"
                onClick={() =>
                  this.props.history.push(
                    `/admin/dashboard/user-management/admin`,
                  )
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div>
          <Grid>
            <Grid.Column>
              <Card>
                <div>
                  <Grid>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <h4>Account Detail</h4>
                      </Grid.Column>
                      <Grid.Column textAlign="right">
                        {this.props.location.state &&
                        this.props.location.state.verified &&
                        this.props.location.state.verified === 1 ? (
                          <Label color="green">Verified</Label>
                        ) : (
                          <Label color="yellow">Not Verified</Label>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                <div>
                  <Grid>
                    <Grid.Row columns={4}>
                      <Grid.Column>
                        <div>Email</div>
                        {this.props.location.state &&
                        this.props.location.state.email
                          ? this.props.location.state.email
                          : 'N/A'}
                      </Grid.Column>
                      <Grid.Column>
                        <div>First Name</div>
                        {this.props.location.state &&
                        this.props.location.state.first_name
                          ? this.props.location.state.first_name
                          : 'N/A'}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Last Name</div>
                        {this.props.location.state &&
                        this.props.location.state.last_name
                          ? this.props.location.state.last_name
                          : 'N/A'}
                      </Grid.Column>
                      <Grid.Column>
                        <div>Role</div>
                        {this.props.location.state &&
                        this.props.location.state.role &&
                        this.props.location.state.role === 2
                          ? 'Admin'
                          : 'Manager'}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

AdminDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminDetail: makeSelectAdminDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminDetail', reducer });
const withSaga = injectSaga({ key: 'adminDetail', saga });

export default compose(withReducer, withSaga, withConnect)(AdminDetail);
