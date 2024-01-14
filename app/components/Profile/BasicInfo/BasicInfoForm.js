import React from 'react';
import {
  Button,
  Form,
  Segment,
  Radio,
  Dropdown,
  Message,
  Grid,
  Label,
  Image,
  Placeholder,
} from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import Countries from 'components/common/countries';
import FileDropZone from 'components/FileDropZone';
import {
  birthYearOption,
  birthMonthOption,
  birthDayOption,
} from 'utils/constants';

const countriesOption = Countries.map((country, index) => ({
  key: index + 1,
  text: country.name,
  value: country.name,
}));

const BasicInfoForm = ({
  handleDropDown,
  user,
  fetchedData,
  handleChange,
  handleSubmit,
  dataLoading,
  handleGenderChange,
  isLoading,
  handleOnDrop,
  handleOnDropRejected,
  files,
  handleFileRemove,
  errors,
  documentType,
  handleOnDocumentTypeChange,
  isKycFormEditable,
}) => (
  <Form onSubmit={handleSubmit} className="py-2 form">
    <div className="form__elements">
      <Segment className="p-4">
        <Grid className="py-4">
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>1. Personal Info</h2>
            </Grid.Column>
            {/* <Grid.Column width={11} textAlign="left">
              <h2>Customer Detail </h2>
            </Grid.Column> */}
            <Grid.Column textAlign="right">
              {fetchedData &&
              fetchedData.status &&
              fetchedData.status === 'pending' ? (
                <Label color="yellow">Pending</Label>
              ) : fetchedData.status === 'approve' ? (
                <Label color="green">Verified</Label>
              ) : fetchedData.status === 'reject' ? (
                <Label color="red">Rejected</Label>
              ) : (
                ''
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Form.Group widths="equal">
          <Form.Field>
            <label>First Name</label>
            <input
              name="first_name"
              placeholder="First Name"
              value={user.first_name || ''}
              onChange={handleChange}
              disabled={isLoading || !isKycFormEditable}
            />
            {errors.first_name && (
              <span style={{ color: 'red' }}>{errors.first_name}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              name="last_name"
              placeholder="Last Name"
              value={user.last_name || ''}
              onChange={handleChange}
              disabled={isLoading || !isKycFormEditable}
            />
            {errors.last_name && (
              <span style={{ color: 'red' }}>{errors.last_name}</span>
            )}
          </Form.Field>
          {/* <Form.Field>
            <label>Gender:</label>
            <Radio
              label="Male"
              name="gender"
              value="Male"
              className="mr-2"
              checked={(user.gender || '').toLowerCase() === 'male'}
              onChange={handleGenderChange}
            />
            <Radio
              className="mr-2"
              label="Female"
              name="gender"
              value="Female"
              checked={(user.gender || '').toLowerCase() === 'female'}
              onChange={handleGenderChange}
            />
            <Radio
              className="mr-2"
              label="Other"
              name="gender"
              value="Other"
              checked={(user.gender || '').toLowerCase() === 'other'}
              onChange={handleGenderChange}
            />
            {errors.gender && (
              <span style={{ color: 'red' }}>{errors.gender}</span>
            )}
          </Form.Field> */}
        </Form.Group>
        {/* <Form.Group widths="equal">
          <Form.Field>
            <label>Birth Year:</label>
            <Dropdown
              placeholder="Select Birth Year"
              name="dob_year"
              search
              selection
              value={user.dob_year}
              options={birthYearOption}
              onChange={handleDropDown}
            />
            {errors.dob_year && (
              <span style={{ color: 'red' }}>{errors.dob_year}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Birth Month:</label>
            <Dropdown
              placeholder="Select Birth Month"
              name="dob_month"
              search
              selection
              value={user.dob_month || ''}
              options={birthMonthOption}
              onChange={handleDropDown}
            />
            {errors.dob_month && (
              <span style={{ color: 'red' }}>{errors.dob_month}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Birth Day:</label>
            <Dropdown
              name="dob_date"
              search
              selection
              value={user.dob_date || ''}
              options={birthDayOption}
              onChange={handleDropDown}
              placeholder="Select Birth Day"
            />
            {errors.dob_date && (
              <span style={{ color: 'red' }}>{errors.dob_date}</span>
            )}
          </Form.Field>
        </Form.Group> */}
        <Form.Group widths="equal">
          {/* <Form.Field>
            <label>User Name</label>
            <input
              name="username"
              placeholder="User Name"
              value={user.username || ''}
              onChange={handleChange}
              disabled
            />
            {errors.username && (
              <span style={{ color: 'red' }}>{errors.username}</span>
            )}
          </Form.Field> */}
          {/* <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={user.email || ''}
              onChange={handleChange}
              disabled
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </Form.Field> */}
          <Form.Field>
            <label>Country:</label>
            <Dropdown
              placeholder="Select a Country"
              name="resident"
              search
              selection
              value={user.resident}
              options={countriesOption}
              onChange={handleDropDown}
              disabled={isLoading || !isKycFormEditable}
            />
            {errors.resident && (
              <span style={{ color: 'red' }}>{errors.resident}</span>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          {/* <Form.Field>
            <label>Nationality:</label>
            <Dropdown
              placeholder="Select a Country"
              name="Nationality"
              search
              selection
              value={user.country}
              options={countriesOption}
              onChange={handleDropDown}
            />
            {errors.country && (
              <span style={{ color: 'red' }}>{errors.country}</span>
            )}
          </Form.Field> */}
          <Form.Field>
            <label>Document Type</label>
            <Dropdown
              search
              selection
              name="Document Type"
              placeholder="Document Type"
              value={user.verification_type}
              options={documentType.toJS()}
              onChange={handleOnDocumentTypeChange}
              disabled={isLoading || !isKycFormEditable}
            />
            {errors.verification_type && (
              <span style={{ color: 'red' }}>{errors.verification_type}</span>
            )}
          </Form.Field>
          {/* <Form.Field>
            <label>Nationality</label>
            <Dropdown
              placeholder="Select a Country"
              name="Nationality"
              search
              selection
              value={user.country}
              options={countriesOption}
              onChange={handleDropDown}
            />
            {errors.country && (
              <span style={{ color: 'red' }}>{errors.country}</span>
            )}
          </Form.Field> */}
          {/* <Form.Field>
            <InputField
              type="text"
              label="Zip/Postal Code"
              placeholder="ZIP/Postal Code"
              name="zip"
              value={user.zip || ''}
              onChange={handleChange}
            />
            {errors.zip && <span style={{ color: 'red' }}>{errors.zip}</span>}
          </Form.Field> */}

          <Form.Field>
            <InputField
              type="text"
              label="Document Id Number"
              placeholder="Document Id Number"
              name="id_number"
              value={user.id_number || ''}
              onChange={handleChange}
              disabled={isLoading || !isKycFormEditable}
            />
            {errors.id_number && (
              <span style={{ color: 'red' }}>{errors.id_number}</span>
            )}
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment className="p-4">
        <h2>2. Personal Document</h2>
        <p>Upload a clear image of your document to each category.</p>
        <Form.Group widths="equal">
          <Form.Field>
            <div>
              <h5>Document front image</h5>
              <FileDropZone
                files={files}
                errors={errors}
                handleOnDrop={handleOnDrop}
                handleOnDropRejected={handleOnDropRejected}
                handleFileRemove={handleFileRemove}
                fileName="identification_verification_front"
                disabled={isLoading || !isKycFormEditable}
              />
              {errors.identification_verification_front && (
                <span style={{ color: 'red' }}>
                  {errors.identification_verification_front}
                </span>
              )}
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <h5>Document back image</h5>

              <FileDropZone
                files={files}
                errors={errors}
                handleOnDrop={handleOnDrop}
                handleOnDropRejected={handleOnDropRejected}
                handleFileRemove={handleFileRemove}
                fileName="identification_verification_back"
                disabled={isLoading || !isKycFormEditable}
              />
              {errors.identification_verification_back && (
                <span style={{ color: 'red' }}>
                  {errors.identification_verification_back}
                </span>
              )}
            </div>
          </Form.Field>
          <Form.Field>
            <div>
              <h5>Selfie with Document</h5>

              <FileDropZone
                files={files}
                errors={errors}
                handleOnDrop={handleOnDrop}
                handleOnDropRejected={handleOnDropRejected}
                handleFileRemove={handleFileRemove}
                fileName="hand_held_identification"
                disabled={isLoading || !isKycFormEditable}
              />
              {errors.hand_held_identification && (
                <span style={{ color: 'red' }}>
                  {errors.hand_held_identification}
                </span>
              )}
            </div>
          </Form.Field>
        </Form.Group>

        {fetchedData &&
          fetchedData.status &&
          fetchedData.status === 'reject' && (
            <Message
              info
              icon="ban"
              header="Reason Of Rejection"
              content="Get the best news in your e-mail every day."
            />
          )}
      </Segment>

      <Segment className="p-4">
        <h2>Uploaded Document</h2>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <h5>Identification Verification Front</h5>
              {dataLoading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              ) : (
                <div>
                  {fetchedData &&
                  fetchedData.identification_verification_front &&
                  fetchedData.identification_verification_front ? (
                    <Image
                      src={fetchedData.identification_verification_front}
                      as="a"
                      size="medium"
                      href={fetchedData.identification_verification_front}
                      target="_blank"
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              )}
            </Grid.Column>

            <Grid.Column>
              <h5>Identification Verification Back</h5>
              {dataLoading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              ) : (
                <div>
                  {fetchedData &&
                  fetchedData.identification_verification_back &&
                  fetchedData.identification_verification_back ? (
                    <Image
                      src={fetchedData.identification_verification_back}
                      as="a"
                      size="medium"
                      href={fetchedData.identification_verification_back}
                      target="_blank"
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              )}
            </Grid.Column>

            <Grid.Column>
              <h5>Hand Held Identification</h5>
              {dataLoading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              ) : (
                <div>
                  {fetchedData &&
                  fetchedData.hand_held_identification &&
                  fetchedData.hand_held_identification ? (
                    <Image
                      src={fetchedData.hand_held_identification}
                      as="a"
                      size="medium"
                      href={fetchedData.hand_held_identification}
                      target="_blank"
                    />
                  ) : (
                    'N/A'
                  )}
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ width: '150px', borderRadius: '50px' }}
          size="big"
          type="submit"
          loading={isLoading}
          disabled={isLoading || !isKycFormEditable}
        >
          Save
        </Button>
      </div>
    </div>
  </Form>
);

export default BasicInfoForm;
