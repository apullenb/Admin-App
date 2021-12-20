import { isExpired } from 'react-jwt';

export const aZAdminToken = 'AzAdminToken';
export const zilisAdminToken = 'ZilisAdminToken';

/**
 * Get Token from LocalStorage.
 * Token Name Param Required
 *  @param {string tokenName} - token name
 */
export const getToken = (tokenName) => {
  return localStorage.getItem(tokenName);
};

/**
 * Adds Token from LocalStorage.
 * Token Name and Token Params Required
 * @param {string} tokenName - token name
 * @param {string} token - token
 */
export const setToken = (tokenName, token) => {
  localStorage.setItem(tokenName, token);
};

/**
 * Removes Token from LocalStorage.
 * Token Name Param Required
 * @param {string} tokenName - token name
 */
export const removeToken = (tokenName) => {
  localStorage.removeItem(tokenName);
};

/**
 * Validated Current Stored Token
 * Token Name Param Required
 * @param {string} tokenName - token name
 */
export const validateToken = (tokenName) => {
  //TODO: Implement refresh tokens
  const token = getToken(tokenName);
  const expired = isExpired(token);
  return expired;
};

//https://jsdoc.app/tags-param.html
