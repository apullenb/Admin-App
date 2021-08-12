import config from '../config/env-urls'

export const skincareLogin = async () => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config.skincareUser)
    };

    const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/login`, requestOptions);

    let authToken = null;

    if (response.status === 200) {
      const json = await response.json();

      authToken = json.token;
    }

    return authToken;

  } catch (err) {
    console.error(err.message);
  }
};
