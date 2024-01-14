/**
 *
 * AdminModule
 *
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { Card, Grid, Button } from 'semantic-ui-react';

import saga from './saga';
import reducer from './reducer';

import { createAdminRequest, clearAdminModuleState } from './actions';
import {
  makeSelectCreateAdminSuccess,
  makeSelectCreateAdminFailure,
  makeSelectCreateAdminRequesting,
  makeSelectCreateAdminSuccessMsg,
  makeSelectCreateAdminFailureMsg,
} from './selectors';
import PostUpdateAdminForm from './components/PostUpdateAdminForm';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { validators } from 'utils/validators';

const USER_ROLE = [
  { key: 1, text: 'Admin', value: 2 },
  { key: 2, text: 'Manager', value: 3 },
  // { key: 3, text: 'Super Admin', value: 4 },
];

/* eslint-disable react/prefer-stateless-function */
export class AdminModule extends React.Component {
  state = {
    data: {
      role: 2,
      password: '',
      last_name: '',
      first_name: '',
      new_user_email: '',
      confirm_password: '',
    },
    errors: {},
    show: false,
    show_password: false,
    userRoleOptions: USER_ROLE,
  };

  componentDidMount() {
    this.props.clearAdminModuleState();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.createAdminSuccessMsg !== prevProps.createAdminSuccessMsg &&
      this.props.createAdminSuccess
    ) {
      this.setState({
        data: {
          role: 2,
          password: '',
          last_name: '',
          first_name: '',
          new_user_email: '',
          password_confirm: '',
        },
        errors: {},
        show: false,
        show_password: false,
      });
      toast.success(this.props.createAdminSuccessMsg);
    }

    if (
      this.props.createAdminFailureMsg !== prevProps.createAdminFailureMsg &&
      this.props.createAdminFailure
    ) {
      toast.error(this.props.createAdminFailureMsg);
    }
  }

  componentWillUnmount() {
    this.props.clearAdminModuleState();
  }

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.first_name) errors.first_name = "Can't be blank";
    if (!data.last_name) errors.last_name = "Can't be blank";
    if (!data.new_user_email) errors.new_user_email = "Can't be blank";
    if (data.new_user_email && !validators.emailValidator(data.new_user_email))
      errors.new_user_email = 'Please enter valid email';
    if (!data.password) errors.password = 'password_error';
    if (data.password !== data.password_confirm)
      errors.password = 'Password do not match.';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { createAdminRequest } = this.props;
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      createAdminRequest(data);
    }
  };

  handleOnUserRoleChange = (event, data) => {
    this.setState({
      data: {
        ...this.state.data,
        role: data.value,
      },
    });
  };

  render() {
    const { data, errors } = this.state;
    const { createAdminRequesting } = this.props;
    return (
      <div>
        <Helmet>
          <title>Admin Module</title>
          <meta name="description" content="Description of Admin Module" />
        </Helmet>
        <div>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <h2>Create Admin</h2>
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
          <Grid>
            <Grid.Column>
              <Card>
                <div className="flex">
                  <PostUpdateAdminForm
                    data={data}
                    errors={errors}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    requesting={createAdminRequesting}
                    userRoleOptions={this.state.userRoleOptions}
                    handleOnUserRoleChange={this.handleOnUserRoleChange}
                  />
                </div>
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

AdminModule.propTypes = {};

const mapStateToProps = createStructuredSelector({
  createAdminSuccess: makeSelectCreateAdminSuccess(),
  createAdminFailure: makeSelectCreateAdminFailure(),
  createAdminSuccessMsg: makeSelectCreateAdminSuccessMsg(),
  createAdminFailureMsg: makeSelectCreateAdminFailureMsg(),
  createAdminRequesting: makeSelectCreateAdminRequesting(),
});

const mapDispatchToProps = dispatch => ({
  clearAdminModuleState: () => dispatch(clearAdminModuleState()),
  createAdminRequest: formData => dispatch(createAdminRequest(formData)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'adminModule', saga });
const withReducer = injectReducer({ key: 'adminModule', reducer });

export default compose(withReducer, withSaga, withConnect)(AdminModule);
