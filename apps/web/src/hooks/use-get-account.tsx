import React from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../lib/constants';
import { ApiResponse, UserData } from '../lib/types';

export default function useGetAccount() {
  const [account, setAccount] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<ApiResponse>(`${API_BASE_URL}/reqAuth`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data) {
          setAccount(res.data.data);
        } else {
          console.error('Unexpected response:', res);
          setAccount(null);
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
        setAccount(null);
      }
    }

    fetchData();
  }, []);

  return account;
}
