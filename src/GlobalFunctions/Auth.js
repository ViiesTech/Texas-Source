import axios from 'axios';
import {baseUrl} from '../BaseUrl';

const Register = async (name, email, password) => {
  let data = JSON.stringify({
    name: name,
    email: email,
    password: password,
    // phone: '123456789',
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {Register};
