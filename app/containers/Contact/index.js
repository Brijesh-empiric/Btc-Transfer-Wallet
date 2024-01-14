import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './sagas';
import reducer from './reducer';
import { postCustomerQueriesRequest } from './actions';

import { validators } from 'utils/validators';

import TextArea from 'components/common/Forms/TextArea';
import InputField from 'components/common/Forms/InputField';

import whatsapp from 'assets/images/social_icons/whatsapp.svg';
import telegram from 'assets/images/social_icons/telegram.svg';

import mail from '../../assets/images/static/mail.svg';

import { Container, Grid, GridColumn } from 'semantic-ui-react';

import {
  makeSelectPostCustomerQueriesSuccess,
  makeSelectPostCustomerQueriesFailure,
  makeSelectPostCustomerQueriesSuccessMsg,
  makeSelectPostCustomerQueriesFailureMsg,
  makeSelectPostCustomerQueriesRequesting,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  postCustomerQueriesSuccess: makeSelectPostCustomerQueriesSuccess(),
  postCustomerQueriesFailure: makeSelectPostCustomerQueriesFailure(),
  postCustomerQueriesSuccessMsg: makeSelectPostCustomerQueriesSuccessMsg(),
  postCustomerQueriesFailureMsg: makeSelectPostCustomerQueriesFailureMsg(),
  postCustomerQueriesRequesting: makeSelectPostCustomerQueriesRequesting(),
});

const mapDispatchToProps = dispatch => ({
  postCustomerQueriesRequest: data =>
    dispatch(postCustomerQueriesRequest(data)),
});

class ContactPage extends Component {
  state = {
    data: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    phone_number: '+16024286055', // Replace with the specific phone number you want to message
    text_message: "Hello, I'm interested in your services", // Replace with your default message
    errors: {},
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.postCustomerQueriesSuccessMsg !==
        prevProps.postCustomerQueriesSuccessMsg &&
      this.props.postCustomerQueriesSuccess
    ) {
      toast.success(this.props.postCustomerQueriesSuccessMsg);
      this.setState({
        data: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
        errors: {},
      });
      return;
    }
    if (
      this.props.postCustomerQueriesFailureMsg !==
        prevProps.postCustomerQueriesFailureMsg &&
      this.props.postCustomerQueriesFailure
    ) {
      toast.error(this.props.postCustomerQueriesFailureMsg);
      return;
    }
  };

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
    if (!data.email) errors.email = "Can't be blank";
    if (data.email && !validators.emailValidator(data.email))
      errors.email = 'Please enter valid email';
    if (!data.name) errors.name = "Can't be blank";
    if (!data.subject) errors.subject = "Can't be blank";
    if (!data.message) errors.message = "Can't be blank";
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { postCustomerQueriesRequest } = this.props;
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      postCustomerQueriesRequest(data);
    }
  };

  render() {
    const { data, errors } = this.state;
    const { postCustomerQueriesRequesting } = this.props;
    return (
      <React.Fragment>
        <section className="contact">
          <Container className="py-section">
            <Grid className="justify-content-center align-items-center">
              <GridColumn mobile={16} computer={7}>
                <div className="d-flex flex-column  py-5 justify-content-center">
                  <h1 className="white">Contact Us</h1>
                  <p className="white">
                    Fill up the form and our Team will get back to you within 24
                    hours
                  </p>
                  <div className="my-5 d-flex align-items-center">
                    <img src={mail} alt="" />
                    <span
                      className="white"
                      style={{ fontSize: '24px', paddingLeft: '10px' }}
                    >
                      info@btctransferwallet.com
                    </span>
                  </div>
                  {/* <div className="social__media ">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${
                        this.state.phone_number
                      }&text=${encodeURIComponent(this.state.text_message)}`}
                      target="_blank"
                    >
                      <img
                        className="pr-1 m-1"
                        src={whatsapp}
                        alt="WhatsApp"
                        width={48}
                        height={48}
                      />
                    </a>
                    <a href="https://t.me/btctransferwallet">
                      <img
                        className="pr-1 m-1"
                        src={telegram}
                        alt="Telegram"
                        width={48}
                        height={48}
                      />
                    </a>
                  </div> */}
                </div>
              </GridColumn>
              <GridColumn mobile={16} computer={7}>
                <div className="login__box">
                  <Form className="form" onSubmit={this.handleSubmit}>
                    <Form.Field>
                      <label>Full Name</label>
                      {/* <input placeholder="First Name" /> */}
                      <InputField
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control"
                        value={data.name}
                        onChange={this.handleChange}
                        error={errors.name}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>

                      <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={data.email}
                        onChange={this.handleChange}
                        error={errors.email}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Subject</label>

                      <InputField
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="form-control"
                        value={data.subject}
                        onChange={this.handleChange}
                        error={errors.subject}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Message</label>
                      <TextArea
                        name="message"
                        value={data.message}
                        placeholder="Message"
                        error={errors.message}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Button
                      type="submit"
                      fluid
                      loading={postCustomerQueriesRequesting}
                      disabled={postCustomerQueriesRequesting}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </GridColumn>
            </Grid>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const withSaga = injectSaga({ key: 'contactPage', saga });
const withReducer = injectReducer({ key: 'contactPage', reducer });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(ContactPage);
