import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CloudinaryUpload from '../services/CloudinaryUpload';

const UploadFile = ({ handleImagePreview }) => {
  const [imagesSelected, setImagesSelected] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const images = [...imagesSelected, ...selectedFiles];

    // Combine existing file names with the new ones
    const names = [...fileNames, ...selectedFiles.map((file) => file.name)];

    setImagesSelected(images);
    setFileNames(names);
  };

  const uploadImages = async () => {
    try {
      const uploadedImageURLs = await Promise.all(
        imagesSelected.map((image) => CloudinaryUpload.postImage(image)),
      );
      console.log(uploadedImageURLs);
      handleImagePreview(uploadedImageURLs);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageSelection} multiple />
      <Button onClick={uploadImages}>Upload Images</Button>

      {/* Display file names */}
      <div>
        <h3>Selected Files:</h3>
        <ul>
          {fileNames.map((fileName, index) => (
            <li key={index}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

UploadFile.propTypes = {
  handleImagePreview: PropTypes.func.isRequired,
};
export default UploadFile;
