const environment = process.env.REACT_APP_ENV || 'development';

const handleSetProductsURL = () => {
  switch (environment) {
    case 'development':
      return 'http://localhost:4000';
    case 'test':
      return 'https://zilis-general-api-be.azurewebsites.net';
    case 'production':
      return 'https://zilis-general-api-be.azurewebsites.net';
    default:
      return 'http://localhost:4000';
  }
};

const handleSkinCareEnvURL = () => {
  switch (environment) {
    case 'development':
      return 'http://localhost:4000';
    case 'test':
      return 'https://skincarechallangedev-be.azurewebsites.net';
    case 'production':
      return 'https://skincarechallange-be.azurewebsites.net';
    default:
      return 'http://localhost:4000';
  }
};

const handleSCTargetURL = () => {
  switch (environment) {
    case 'development':
      return 'http://localhost:4000';
    case 'test':
      return 'https://skincarechallangedev-fe.azurewebsites.net';
    case 'production':
      return 'https://skincarechallange-be.azurewebsites.net';
    default:
      return 'http://localhost:4000';
  }
};

const handleOrderAPIURL = () => {
  switch (environment) {
    case 'development':
      return 'https://zorderapidev.azurewebsites.net/graphql';
    case 'test':
      return 'https://zorderapidev.azurewebsites.net/graphql';
    case 'production':
      return 'https://zorderapi.azurewebsites.net/graphql';
    default:
      return 'https://localhost:5051';
  }
};

const skincareUser = {
  username: 'AdminApp',
  password: 'vHIsAQ7FWR1tDz',
};

const config = {
  PRODUCTSBASEURL: handleSetProductsURL(),
  SKINCAREBASEURL: handleSkinCareEnvURL(),
  SCTARGETURL: handleSCTargetURL(),
  ORDERAPIURL: handleOrderAPIURL(),
  SKINCAREUSER: skincareUser,
};

export default config;
