import axios from 'axios';
import { logError } from './errorService';
import { getToken } from '../../auth/Authorize';

const customAxios = axios.create({
  timeout: 10000,
});

const requestHandler = (req) => {
  const token = getToken();
  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

const responseHandler = (res) => {
  return res;
};

const errorHandler = (err) => {
  logError(err);
  return Promise.reject(err);
};

customAxios.interceptors.request.use(
  (req) => requestHandler(req),
  (err) => errorHandler(err)
);

customAxios.interceptors.response.use(
  (res) => responseHandler(res),
  (err) => errorHandler(err)
);

export default customAxios;
