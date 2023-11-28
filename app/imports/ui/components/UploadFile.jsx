import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

const UploadFile = () => {
  const [imagesSelected, setImagesSelected] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleImageSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const images = [...imagesSelected, ...selectedFiles];

    // Combine existing file names with the new ones
    const names = [...fileNames, ...selectedFiles.map(file => file.name)];

    setImagesSelected(images);
    console.log(imagesSelected.length);
    setFileNames(names);
  };

  // add deletions to file array
  // const handleImageDeletion = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  const uploadImages = () => {
    console.log(imagesSelected);

    imagesSelected.forEach((image) => {
      console.log(image);
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'nuzvptao');

      Axios.post('https://api.cloudinary.com/v1_1/ddfut4ysa/image/upload', formData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    });
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
            <li key={index}>{fileName + index}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadFile;
