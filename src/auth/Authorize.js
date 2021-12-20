import { isExpired, decodeToken } from 'react-jwt';
export const adminToken = 'ZilisAdminToken';

/**
 * Get Token from LocalStorage.
 * No Param Required
 */
export const getToken = () => {
  return localStorage.getItem(adminToken);
};

/**
 * Adds Token from LocalStorage.
 * Token Param Required
 */
export const setToken = (token) => {
  localStorage.setItem(adminToken, token);
};

/**
 * Removes Token from LocalStorage.
 * No Params Required
 */
export const removeToken = () => {
  localStorage.removeItem(adminToken);
};

/**
 * Validated Current Stored Token
 * No Params Required
 */
export const validateToken = () => {
  //TODO: Implement refresh tokens
  const token = getToken();
  const expired = isExpired(token);
  return expired;
};
