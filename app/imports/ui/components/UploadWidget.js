import React, { useEffect, useRef } from 'react';

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'ddfut4ysa',
      uploadPreset: 'okgh7uas',
    }, function (error, result) {
      console.log(result);
    });
  }, []);
  return (
    // eslint-disable-next-line react/button-has-type,react/jsx-filename-extension
    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  );
};

export default UploadWidget;
