import axios from 'axios';

const postImage = async (imagefile) => {
  try {
    const formData = new FormData();
    formData.append('file', imagefile);
    formData.append('upload_preset', 'nuzvptao');

    const response = await axios.post('https://api.cloudinary.com/v1_1/ddfut4ysa/image/upload', formData);
    const data = response.data.secure_url;
    console.log('data from postImage():', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { postImage };
