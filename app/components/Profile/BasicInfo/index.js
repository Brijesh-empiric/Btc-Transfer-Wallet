import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import { makeSelectUser, makeSelectUserInfo } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
// import * as action from '../../../utils/api';
// import getToken from 'utils/getToken';
import { toast } from 'react-toastify';
import reducer from './reducer';
import saga from './sagas';
import BasicInfoForm from './BasicInfoForm';
import {
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectSuccess,
  makeSelectGetKycInfoRequest,
  makeSelectGetKycInfoResponse,
  makeSelectGetKycInfoSuccess,
  makeSelectGetKycInfoFailure,
  makeSelectGetKycInfoSuccessMsg,
  makeSelectGetKycInfoFailureMsg,
  makeSelectFetchDocumentTypeRequest,
  makeSelectFetchDocumentTypeResponse,
  makeSelectFetchDocumentTypeSuccess,
  makeSelectFetchDocumentTypeFailure,
  makeSelectFetchDocumentTypeSuccessMsg,
  makeSelectFetchDocumentTypeFailureMsg,
} from './selectors';
import {
  updateBasicInfoRequest,
  basicInfoClearState,
  getKycInfoRequest,
  fetchDocumentTypeRequest,
} from './actions';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userInfo: makeSelectUserInfo(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess(),

  getKycInfoRequesting: makeSelectGetKycInfoRequest(),
  getKycInfoData: makeSelectGetKycInfoResponse(),
  getKycInfoSuccess: makeSelectGetKycInfoSuccess(),
  getKycInfoFailure: makeSelectGetKycInfoFailure(),
  getKycInfoSuccessMsg: makeSelectGetKycInfoSuccessMsg(),
  getKycInfoFailureMsg: makeSelectGetKycInfoFailureMsg(),

  fetchDocumentTypeRequesting: makeSelectFetchDocumentTypeRequest(),
  fetchDocumentTypeResponse: makeSelectFetchDocumentTypeResponse(),
  fetchDocumentTypeSuccess: makeSelectFetchDocumentTypeSuccess(),
  fetchDocumentTypeFailure: makeSelectFetchDocumentTypeFailure(),
  fetchDocumentTypeSuccessMsg: makeSelectFetchDocumentTypeSuccessMsg(),
  fetchDocumentTypeFailureMsg: makeSelectFetchDocumentTypeFailureMsg(),
});

const mapDispatchToProps = dispatch => ({
  updateBasicInfoRequest: (user, image) =>
    dispatch(updateBasicInfoRequest(user, image)),
  clearState: () => dispatch(basicInfoClearState()),
  getKycInfoRequest: reqObj => dispatch(getKycInfoRequest(reqObj)),
  fetchDocumentTypeRequest: () => dispatch(fetchDocumentTypeRequest()),
});

class BasicInfo extends React.Component {
  static propTypes = {
    updateBasicInfoRequest: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  state = {
    data: {
      // username: localStorage.getItem('username') || '',
      // email: localStorage.getItem('email') || '',
    },
    files: {},
    fetchedData: {},
    avatarImage: this.props.user.get('image_name')
      ? `${DOCUMENT_URL_UPDATE}${this.props.user.get('image_name')}`
      : null,
    errors: {},
    isKycFormEditable: true,
  };

  componentDidMount() {
    // if (this.props.user.size > 0) {
    //   const userObj = this.props.user.toJS();
    //   this.setState(state => ({ data: { ...userObj } }));
    // }
    this.props.fetchDocumentTypeRequest();
    this.props.getKycInfoRequest({ email: this.props.userInfo.toJS().email });
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.user !== this.props.user) {
    //   const userObj = this.props.user && this.props.user.toJS();
    //   this.setState(state => ({ data: { ...userObj } }));
    // }

    if (
      this.props.errorResponse !== prevProps.errorResponse &&
      this.props.errorResponse
    ) {
      toast.error(this.props.errorResponse);
    }

    if (this.props.successResponse !== prevProps.successResponse) {
      this.setState({
        isKycFormEditable: false,
      });
      toast.success('User Info Updated Successfully.');
    }

    if (this.props.getKycInfoSuccessMsg !== prevProps.getKycInfoSuccessMsg) {
      // toast.success('User KYC info fetch successfully.');
    }

    if (this.props.getKycInfoFailureMsg !== prevProps.getKycInfoFailureMsg) {
      toast.error(this.props.getKycInfoFailureMsg);
    }

    if (this.props.getKycInfoData !== prevProps.getKycInfoData) {
      const kycInfo =
        this.props.getKycInfoData && this.props.getKycInfoData.toJS();
      this.setState({
        isKycFormEditable:
          kycInfo && kycInfo.status === 'pending'
            ? false
            : !!(kycInfo && kycInfo.status === 'reject'),
        fetchedData: {
          status: (kycInfo && kycInfo.status) || '',
          identification_verification_back:
            (kycInfo && kycInfo.identification_verification_back) || '',
          identification_verification_front:
            (kycInfo && kycInfo.identification_verification_front) || '',
          hand_held_identification:
            (kycInfo && kycInfo.hand_held_identification) || '',
        },
        data: {
          ...this.state.data,
          // address1:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.address1) ||
          //   '',
          // address2:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.address2) ||
          //   '',
          // city:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.city) ||
          //   '',
          resident: (kycInfo && kycInfo.resident) || '',
          // dob_date:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.dob &&
          //     kycInfo.data.kyc_data.dob.split('-')[2]) ||
          //   '',
          // dob_month:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.dob &&
          //     kycInfo.data.kyc_data.dob.split('-')[1]) ||
          //   '',
          // dob_year:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.dob &&
          //     kycInfo.data.kyc_data.dob.split('-')[0]) ||
          //   '',
          // email:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.email) ||
          //   this.state.data.email,
          first_name: (kycInfo && kycInfo.first_name) || '',
          verification_type: (kycInfo && kycInfo.verification_type) || '',
          id_number: (kycInfo && kycInfo.id_number) || '',

          // gender:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.gender) ||
          //   '',
          last_name: (kycInfo && kycInfo.last_name) || '',

          // state:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.state) ||
          //   '',
          // username:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.username) ||
          //   this.state.data.username,
          // zip:
          //   (kycInfo &&
          //     kycInfo.data &&
          //     kycInfo.data.kyc_data &&
          //     kycInfo.data.kyc_data.zip) ||
          //   '',
        },
      });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleCheckBox = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: !this.state.data[e.target.name],
      },
    }));
  };

  handleChange = e => {
    e.persist();
    const { errors } = this.state;
    delete errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleFileRemove = (imageName, errorName) => {
    delete this.state.files[imageName];
    delete this.state.errors[errorName];
    this.setState({
      files: {
        ...this.state.files,
      },
    });
    this.setState({
      errors: {
        ...this.state.errors,
      },
    });
  };

  handleOnDropRejected = (receivedFiles, errorName) => {
    if (receivedFiles && receivedFiles.length > 0) {
      this.setState({
        ...this.state.errors,
        [errorName]: receivedFiles[receivedFiles.length - 1].errors[0].message,
      });
    }
  };

  handleOnDrop = (receivedFiles, fileName) => {
    // if (receivedFiles.length === 1) {
    const { errors } = this.state;
    delete errors[fileName];
    receivedFiles[0].file_name = fileName;
    this.setState({
      files: {
        ...this.state.files,
        [fileName]: receivedFiles,
      },
    });
    // }
    if (this.state.errors.submissionError) {
      delete this.state.errors.submissionError;
      this.setState({
        errors: {
          ...this.state.errors,
        },
      });
    }
  };

  handleDropDown = (e, se) => {
    const { errors } = this.state;
    delete errors[se.name];
    this.setState({
      data: {
        ...this.state.data,
        [se.name]: se.value,
      },
    });
  };

  handleOnDocumentTypeChange = (e, data) => {
    this.setState({
      data: {
        ...this.state.data,
        verification_type: data.value,
      },
    });
  };

  handleRadioChange = (e, { name, value }) => {
    const { errors } = this.state;
    delete errors[name];
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data, files } = this.state;
    // const token = getToken();
    const errors = this.validateForm();
    let multipartData;
    multipartData = new FormData();
    Object.keys(data).forEach(key => {
      multipartData.append(key, data[key]);
    });
    if (Object.keys(errors).length === 0) {
      if (
        !!files &&
        files.identification_verification_front &&
        files.identification_verification_back &&
        files.hand_held_identification
      ) {
        this.props.updateBasicInfoRequest(data, files);
        // multipartData.append('file', files.kycFile[0]);
        // action.multiPartPostData(`http://3.137.188.44/api/kyc/`, multipartData, token)
        // action
        //   .multiPartPostData(
        //     `https://btcwallet.uk.com/api/kyc/`,
        //     multipartData,
        //     token,
        //   )
        //   .then(res => {
        //     if (res.status === 200) {
        //       toast.success('Successfully submitted');
        //     } else {
        //       toast.error('Error while submitting');
        //     }
        //   });
      } else {
        this.props.updateBasicInfoRequest(data);
        // action.multiPartPostData(`http://3.137.188.44/api/kyc/`, multipartData, token)
        // action
        //   .multiPartPostData(
        //     `https://btcwallet.uk.com/api/kyc/`,
        //     multipartData,
        //     token,
        //   )
        //   .then(res => {
        //     if (res.status === 200) {
        //       toast.success('Successfully submitted');
        //     } else {
        //       toast.error('Error while submitting');
        //     }
        //   });
      }
    }
  };

  validateForm = () => {
    const { data, files } = this.state;
    const errors = {};
    if (!data.first_name) errors.first_name = 'Please enter your first name';
    if (!data.last_name) errors.last_name = 'Please enter your last name';
    // if (!data.gender) errors.gender = 'Please enter your gender';
    // if (!data.dob_date) errors.dob_date = 'Please enter your dob date';
    // if (!data.dob_month) errors.dob_month = 'Please enter your dob month';
    // if (!data.dob_year) errors.dob_year = 'Please enter your dob year';
    if (!data.resident) errors.resident = 'Please enter your country';
    // if (!data.state) errors.state = 'Please enter your state';
    // if (data.state.length > 50)
    //   errors.state = `Ensure this value has at most 50 characters (it has ${data.state.length}).`;
    // if (!data.city) errors.city = 'Please enter your city';
    // if (data.city.length > 50)
    //   errors.city = `Ensure this value has at most 50 characters (it has ${data.city.length}).`;
    // if (!data.zip) errors.zip = 'Please enter your zip';
    // if (!data.username) errors.username = 'Please enter your username';
    // if (!data.address1) errors.address1 = 'Please enter your address';
    // if (data.address1.length > 50)
    //   errors.address1 = `Ensure this value has at most 50 characters (it has ${data.address1.length}).`;
    // if (data.address2.length > 50)
    //   errors.address2 = `Ensure this value has at most 50 characters (it has ${data.address2.length}).`;
    // if (!data.email) errors.email = 'Please enter your email';
    if (!data.verification_type)
      errors.verification_type = 'Please select document type.';
    if (!data.id_number) errors.id_number = 'Please enter document id';
    // if (Object.keys(files).length === 0) {
    //   errors.identification_verification_front =
    //     'Please upload a file to submit';
    //   errors.identification_verification_back =
    //     'Please upload a file to submit';
    //   errors.hand_held_identification = 'Please upload a file to submit';
    // }
    if (!files.identification_verification_front) {
      errors.identification_verification_front =
        'Please upload a file to submit';
    }
    if (!files.identification_verification_back) {
      errors.identification_verification_back =
        'Please upload a file to submit';
    }
    if (!files.hand_held_identification) {
      errors.hand_held_identification = 'Please upload a file to submit';
    }
    this.setState({ errors });
    return errors;
  };

  render() {
    const { data, avatarImage, files, errors, isKycFormEditable } = this.state;
    const {
      successResponse,
      errorResponse,
      requesting,
      fetchDocumentTypeResponse,
      getKycInfoRequesting,
    } = this.props;

    return (
      <div className="segment">
        <BasicInfoForm
          user={data}
          fetchedData={this.state.fetchedData}
          dataLoading={getKycInfoRequesting}
          handleOnDocumentTypeChange={this.handleOnDocumentTypeChange}
          avatarImage={avatarImage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isLoading={requesting}
          handleCheckBox={this.handleCheckBox}
          handleGenderChange={this.handleRadioChange}
          handleFileRemove={this.handleFileRemove}
          handleOnDropRejected={this.handleOnDropRejected}
          handleOnDrop={this.handleOnDrop}
          handleDropDown={this.handleDropDown}
          files={files}
          errors={errors}
          documentType={fetchDocumentTypeResponse}
          isKycFormEditable={isKycFormEditable}
        />
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'updateBasicInfo', reducer });
const withSaga = injectSaga({ key: 'updateBasicInfo', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withReducer, withSaga, withConnect)(BasicInfo);
