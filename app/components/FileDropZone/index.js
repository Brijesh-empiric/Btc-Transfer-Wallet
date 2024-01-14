/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import './styles.css';

const FileDropZone = ({
  files,
  errors,
  fileName,
  errorName,
  handleOnDrop,
  handleOnDropRejected,
  handleFileRemove,
  disabled,
}) => (
  <>
    <div>
      <Dropzone
        onDrop={file => {
          handleOnDrop(file, fileName);
        }}
        onDropRejected={file => {
          handleOnDropRejected(file, fileName);
        }}
        accept=".png, .jpg, .pdf, .csv, .xls, .xlsx, .xlsm, .jpeg"
        maxSize={10485760}
        disabled={disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <section {...getRootProps()} className="dropzone py-5">
            <Icon className="doc__icon" name="file image outline" />
            <div>
              <input {...getInputProps()} name="files" multiple />
              <span className="link">
                <strong>Click or Drop to upload.</strong>
              </span>
            </div>
          </section>
        )}
      </Dropzone>
      {files[fileName] && files[fileName].length === 1 && (
        <div className="text-center">
          <Button
            basic
            style={{ borderRadius: '20px' }}
            className="remove__file ml-2"
            title="remove file"
            type="reset"
            disabled={disabled}
            onClick={() => {
              console.log(fileName);
              handleFileRemove(fileName, errorName);
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
    {errors && Object.keys(errors).includes(errorName) && (
      <p style={{ color: 'red' }}>{errors[errorName]}</p>
    )}
    {files[fileName] && files[fileName].length === 1 && (
      <div
        className="card-md mt-3"
        key={`image_original_name_${JSON.stringify(files[fileName])}`}
      >
        <h6>
          Attached file:{' '}
          <span className="file__name">{files[fileName][0].name}</span>
        </h6>
      </div>
    )}
  </>
);

FileDropZone.propTypes = {
  files: PropTypes.object,
  errors: PropTypes.object,
  fileName: PropTypes.string,
  errorName: PropTypes.string,
  setMultiple: PropTypes.bool,
  uploadDocumentRequesting: PropTypes.bool,
  handleOnDrop: PropTypes.func,
  handleOnDropRejected: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default FileDropZone;
