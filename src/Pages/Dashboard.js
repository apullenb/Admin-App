import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ZilisCarousel from '../GlobalComponents/ZilisCarousel';
import * as Auth from '../auth/Authorize';
import * as AZACTIONTYPES from '../redux/actions/azure/azureActions';
import { useMsal } from '@azure/msal-react';

function Dashboard() {
  const dispatch = useDispatch();
  const { instance } = useMsal();
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
    if (!loggedIn && !Auth.validateToken(Auth.aZAdminToken)) {
      //token is valid
      login();
    } else if (loggedIn && Auth.validateToken(Auth.aZAdminToken)) {
      //token is expired
      dispatch(AZACTIONTYPES.handleLogout(instance));
    }
  };

  const login = async () => {
    try {
      const success = await dispatch(AZACTIONTYPES.handleLogin(instance));
      if (success.account) {
        dispatch(AZACTIONTYPES.handleLoginZilis(instance, success.account));
      } else {
        throw new Error('Cannot get Zilis access token');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!loggedIn && (
        <div>
          <h1>Admin App Dashboard</h1>
          <p>Please log in</p>
        </div>
      )}

      {loggedIn && (
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative' }}
        >
          <h1>Admin App</h1>
          <h4>Welcome to the Dashboard</h4>
          <ZilisCarousel carouselData={carouselData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
