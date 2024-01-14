import React from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
import InputField from 'components/common/Forms/InputField';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { multiFactorAuthAdminLoginRequest, clearState } from './actions';
import { adminLoginClearState } from '../actions';
import { makeSelectRequesting, makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toast } from 'react-toastify';

/* eslint-disable react/prefer-stateless-function */
export class AdminMultiFactorLogin extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  componentWillUnMount() {
    this.props.adminLoginClearState();
    this.props.clearState();
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.errorResponse !== this.props.errorResponse &&
      this.props.errorResponse
    ) {
      toast.error(this.props.errorResponse);
    }
    return;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      data: {
        [e.target.name]: e.target.value,
      },
    });
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.totp_token) errors.totp_token = 'Token required';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.multiFactorAuthAdminLoginRequest(
        this.props.userEmail,
        this.state.data,
        this.props.token,
      );
    }
  };
  render() {
    const { errors, data } = this.state;
    const { isRequesting, errorResponse } = this.props;
    return (
      <Modal
        open
        onClose={this.props.showMultifactorDialog}
        className="mini login__box"
      >
        <Modal.Content>
          {/* {errorResponse && toast.error(errorResponse)} */}

          <i className="icon-lock text-lg" />
          <br />
          <h3 className="thin">Multi Factor Auth Login</h3>
          <p>Enter the token from your authenticator app</p>
          <Form onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              name="totp_token"
              required
              placeholder="Token..."
              className="form-control"
              value={data.totp_token || ''}
              onChange={this.handleChange}
              error={errors.totp_token}
            />
            <div className="field clearfix align-right">
              <div className="inline-block">
                <Button
                  type="submit"
                  className="  button"
                  loading={isRequesting}
                  disabled={isRequesting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

AdminMultiFactorLogin.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectRequesting(),
  errorResponse: makeSelectError(),
});

const mapDispatchToProps = dispatch => ({
  multiFactorAuthAdminLoginRequest: (userId, data, token) =>
    dispatch(multiFactorAuthAdminLoginRequest(userId, data, token)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  clearState: () => dispatch(clearState()),
  adminLoginClearState: () => dispatch(adminLoginClearState()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminMultiFactorLogin', reducer });
const withSaga = injectSaga({ key: 'adminMultiFactorLogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminMultiFactorLogin);
