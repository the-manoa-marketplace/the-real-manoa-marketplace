import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UploadFile = ({ handleImagePreview }) => {
  const [imagesSelected, setImagesSelected] = useState([]);

  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImagesSelected = [...imagesSelected, ...selectedFiles];
    setImagesSelected(newImagesSelected);
    handleImagePreview(newImagesSelected);
  };

  return (
    <div>
      <input type="file" onChange={handleImageSelection} multiple />

      {/* Display file names */}
      <div>
        <h3>Selected Files:</h3>
      </div>
    </div>
  );
};

UploadFile.propTypes = {
  handleImagePreview: PropTypes.func.isRequired,
};
export default UploadFile;
