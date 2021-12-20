import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ZilisCarousel from '../GlobalComponents/ZilisCarousel';
import * as Auth from '../auth/Authorize';
import { handleLogin, handleLogout } from '../redux/actions/azure/azureActions';
import { useMsal } from '@azure/msal-react';

function Dashboard() {
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();
  const { loggedIn } = useSelector((state) => state.app);

  useEffect(() => {
    handleLoginStates();
  }, []);

  const carouselData = [
    {
      image: 'https://zilis.com/wp-content/uploads/2021/10/Group-791-1024x403.jpg',
      title: 'The Ultra Difference',
      description:
        'Unlike other hemp oils that draw upon isolated portions of the hemp plant, UltraCell™ is formulated with full spectrum hemp oil extract.',
    },
    {
      image: 'https://zilis.com/wp-content/uploads/2021/10/Group-795-1024x404.jpg',
      title: 'CHEMISTRY 101 OIL AND WATER DON’T MIX',
      description:
        'When you take oil-based supplements, the majority of their benefits are not absorbed by your body, leaving cannabinoids such as CBD with a bioavailability rate of less than 10%.',
    },
    {
      image: 'https://zilis.com/wp-content/uploads/2021/10/Group-788-1024x404.jpg',
      title: 'Fastest-Growing Hemp-Derived CBD Company',
      description:
        'Our brand provides complete endocannabinoid system support† driving Zilis™ to become the fastest growing hemp-derived CBD company in the United States. ',
    },
  ];

  const handleLoginStates = () => {
    if (!loggedIn && !Auth.validateToken()) {
      //token is valid
      dispatch(handleLogin(instance));
    } else if (loggedIn && Auth.validateToken()) {
      //token is expired
      dispatch(handleLogout(instance));
    }
  };

  const getToken = () => {
    const request = { scopes: ['api://226b21db-5c3f-4395-b3c1-48b2cebb06e6/access_as_user'], account: accounts[0] };
    instance
      .acquireTokenSilent(request)
      .then((res) => {
        console.log('token', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!loggedIn && (
        <div>
          <h1>Admin App Dashboard</h1>
          <p>Please log in.</p>
        </div>
      )}

      {loggedIn && (
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}
        >
          <h1>Admin App</h1>
          <h4>Welcome to the Dashboard</h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              getToken();
            }}
          >
            Get Token
          </button>
          <ZilisCarousel carouselData={carouselData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
