export const handleErrorMessage = (error) => {
  console.log(error);
  const status = error.status;

  switch (status) {
    case 400:
      return 'Invalid or malformed request';
    case 401:
      return 'You are not Authorized';
    case 403:
      return 'You cannot view the content';
    case 404:
      return 'Content not found';
    case 500:
      return 'Server error, please contact your admin';
    default:
      return error.message;
  }
};

export const logError = (error) => {
  console.error(error);
};
