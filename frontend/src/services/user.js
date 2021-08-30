import axios from 'axios';

const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const updateCompleted = async (cipherId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl, { cipher: cipherId }, config);
  return response.data;
};

export default { updateCompleted, setToken };
