import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '../../components/Subs/Table';

const HolidayView = () => {
  const [subs, setSubs] = useState([]);
  const [inactive, setInactive] = useState();

  // Get the authentication token for API requests
  const AccessToken = sessionStorage.getItem('SecretToken');

  useEffect(() => {
    const fetchSubs = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/subscriptions`, {
        headers: {
          Authorization: AccessToken,
        },
      });
      setSubs(response.data);
      const inactiveSubs = response.data.filter((sub) => sub.active == false);
      setInactive(inactiveSubs);
    };

    fetchSubs();
  }, [setSubs, setInactive]);

  // const getInactive = () => {
  //   const inactiveSubs = subs.filter((sub) => sub.active == false);
  //   return <Table subs={inactiveSubs} />;
  // };

  return (
    <div>
      <h3>Inactive Subscriptions</h3>
      <br />
      <div className="bg-light shadow-sm rounded-3 border border-grey">{inactive && <Table subs={inactive} />}</div>
    </div>
  );
};

export default HolidayView;
