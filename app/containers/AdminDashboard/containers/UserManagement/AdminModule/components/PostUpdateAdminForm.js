import React from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import PasswordInputField from 'components/common/Forms/PasswordInputField';

const PostUpdateAdminForm = ({
  data,
  errors,
  requesting,
  handleSubmit,
  handleChange,
  userRoleOptions,
  handleOnUserRoleChange,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <InputField
          type="text"
          name="first_name"
          label="First Name"
          onChange={handleChange}
          placeholder="First Name"
          value={data.first_name || ''}
          error={errors.first_name ? 'first_name_error' : null}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          onChange={handleChange}
          value={data.last_name || ''}
          error={errors.last_name ? 'last_name_error' : null}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          type="text"
          label="Email ID"
          placeholder="Email"
          name="new_user_email"
          onChange={handleChange}
          value={data.new_user_email || ''}
          error={errors.new_user_email ? 'username_error' : null}
        />
      </Form.Field>
      <Form.Field>
        <label>{'User Role'}</label>
        <Dropdown
          selection
          fluid
          placeholder="Select Role"
          options={userRoleOptions}
          onChange={handleOnUserRoleChange}
          value={data.role}
        />
      </Form.Field>
      <Form.Field>
        <PasswordInputField
          name="password"
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          password={data.password || ''}
          error={errors.password ? 'password_error' : null}
        />
      </Form.Field>
      <Form.Field>
        <PasswordInputField
          onChange={handleChange}
          name="password_confirm"
          label="Confirm Password"
          placeholder="Confirm Password"
          password={data.password_confirm || ''}
          error={errors.password_confirm ? 'password_confirm_error' : null}
        />
      </Form.Field>

      <Form.Field>
        <Button
          fluid
          type="submit"
          color="violet"
          loading={requesting}
          disabled={requesting}
        >
          Create
        </Button>
      </Form.Field>
      {/* <Form.Field>
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        Not a Member? <Link to="/register">Register</Link>
      </p>
    </Form.Field> */}
    </Form>
  );
};

export default PostUpdateAdminForm;
