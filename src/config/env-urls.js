
  const environment = process.env.REACT_APP_ENV || 'development';
  var config;
  
  const handleSetProductsURL = () => {
      switch(environment){
          case 'development' : return 'https://localhost:4000';
          case 'test' : return 'https://zilis-general-api-be.azurewebsites.net';
          case 'production' : return 'https://zilis-general-api-be.azurewebsites.net';
          default : return 'https://localhost:4000';
      }
  }
  
  const handleSkinCareEnvURL = () => {
      switch(environment){
          case 'development' : return 'https://localhost:4000';
          case 'test' : return 'https://skincarechallangedev-be.azurewebsites.net';
          case 'production' : return 'https://skincarechallange-be.azurewebsites.net';
          default : return 'https://localhost:4000';
      }
  }
  



  export default config = {
  PRODUCTSBASEURL : handleSetProductsURL(),
  SKINCAREBASEURL : handleSkinCareEnvURL()
  };
  