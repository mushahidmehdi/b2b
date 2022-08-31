import React, {useEffect} from 'react';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - ShipSavvy';
  }, []);

  return (
    <div>
      <>
        <h1>Dahboard Page</h1>
      </>
    </div>
  );
};

export default Dashboard;
