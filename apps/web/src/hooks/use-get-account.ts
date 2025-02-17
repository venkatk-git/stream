import React from 'react';
import axios from 'axios';

import { DEPLOYED_API_BASE_URL } from '../lib/constants';
import { AccountState, ApiResponse } from '../lib/types';

export default function useGetAccount() {
  /**
   * TODO: Handle loading state explicitly to avoid `Account Context cannot be used outside of Account Context Provider` error
   *
   * TODO: Change the AccountState to accept loading property
   */
  const [account, setAccount] = React.useState<AccountState | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        console.log('fetching');
        const res = await axios.get<ApiResponse>(
          `${DEPLOYED_API_BASE_URL}/reqAuth`,
          {
            withCredentials: true,
          }
        );

        console.log(res);

        if (res.status === 200 && res.data) {
          setAccount({
            isValid: true,
            account: res.data.data,
          });
        } else {
          console.error('Unexpected response:', res);
          setAccount({
            isValid: false,
            account: null,
          });
        }
      } catch (error) {
        console.log(error);

        setAccount({
          isValid: false,
          account: null,
        });
      }
    }

    fetchData();
  }, []);

  return account;
}
