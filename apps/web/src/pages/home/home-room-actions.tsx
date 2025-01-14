import React from 'react';
import useAuth from '../../hooks/use-auth';
import JoinRoomForm from './join-room-form';
import axios from 'axios';
import { API_BASE_URL } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { ApiResponseRoom } from '../../lib/types';

export default function HomeRoomActions() {
  const navigate = useNavigate();
  const isAuth = useAuth().account;
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Creates the Room and redirect it to the room page
   */
  const handleCreateRoom = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponseRoom>(`${API_BASE_URL}/r/`, {
        withCredentials: true,
      });

      if (response.status >= 400) {
        alert('Bad Request');
        console.log('bad');
        return;
      }

      if (response.data.data) {
        navigate(`r/${response.data.data.roomId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 ">
      <div className="h-12 w-full md:w-96">
        <button
          disabled={!isAuth}
          onClick={() => {
            handleCreateRoom();
          }}
          className={`h-full w-full transition bg-red-600 hover:bg-red-500 text-gray-200 text-sm px-4 py-1.5 rounded-md outline-accent-500 border border-red-500 ${
            isAuth ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Instant Room'}
        </button>
      </div>
      <div className="w-full border-t border-gray-700" />
      <JoinRoomForm isDisabled={!isAuth} />
    </div>
  );
}
