import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { loggedIn } = useSelector((state) => state.app);
  return (
    <div>
      {!loggedIn && (
        <div>
          <h1>Admin App Dashboard</h1>
          <h4>Welcome to the Dashboard</h4>
          <p>Please log in.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
