/*
  Created by: ui_monkey 11/11/2020
 */
import React, { useEffect } from 'react';
import { Form, Button, Icon, Message, Image } from 'semantic-ui-react';
import Captcha from 'components/Captcha';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import FormField from 'components/common/Forms/FormField';
import PasswordIndicator from 'components/PasswordIndicator';
import { Link } from 'react-router-dom';
import 'assets/scss/components/register.scss'
import Logo from '../../../assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png';

const UserRegistrationForm = ({
  handleSubmit,
  handleChange,
  data,
  errors,
  isRequesting,
  errorResponse,
  handleTermsAndConditionChecked,
  isTermsAndConditionChecked,
}) => {
  // Country Code Selection
  useEffect(() => {
    const input = document.getElementById('phone_number');
    const iti = window.intlTelInput(input, {
      initialCountry: 'us',
      separateDialCode: true,
    });

    input.addEventListener('countrychange', e => {
      const countryData = iti.getSelectedCountryData();

      handleChange({
        persist: () => 0,
        target: {
          name: 'country_code',
          value: countryData.dialCode,
        },
      });
    });

    return () => {
      iti.destroy();
    };
  }, []);
  return (
    <div className="login__box  ">
      {/* <div className="login__logo">
        <Link to="/">
              <Image
                src={Logo}
                alt="XAL"
                centered
              />
          </Link>
            </div> */}
      <p className="title">Create free account</p>
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
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Username"
          name="username"
          value={data.username || ''}
          onChange={handleChange}
          placeholder="Username"
          error={errors.username}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={data.email || ''}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={data.phone || ''}
          onChange={handleChange}
          placeholder="Phone Number"
          error={errors.phone}
          id="phone_number"
        />
        <div className="pos-rel">
          {/* check error case */}
          <PasswordInputField
            password={data.password || ''}
            placeholder="Password"
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div className="field">
          <label className="custom-control custom-checkbox">
            <input
              className="custom-control-input"
              type="checkbox"
              name="log_out_all_devices"
              onChange={handleTermsAndConditionChecked}
              checked={isTermsAndConditionChecked}
            />
            <span className="custom-control-description">
              {' '}
              I have read and agree to the{' '}
              <Link to={'/terms-and-conditions'}>Terms and Conditions.</Link>
            </span>
          </label>
        </div>
        <div className="field">
          <Button
            className="button"
            color="purple"
            fluid
            type="submit"
            disabled={!isTermsAndConditionChecked}
            loading={isRequesting}
          >
            Register
          </Button>
        </div>
      </Form>

      {window.location.pathname.split('/')[1] != 'guest-detail' && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          Already a Member? <Link to="/login">Login</Link>
        </p>
      )}
    </div>
  );
};

export default UserRegistrationForm;
