import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../lib/constants';
import { ApiResponseRoom } from '../../lib/types';
import { useNavigate } from 'react-router-dom';

interface RoomFormProps {
  isDisabled: boolean;
}

export default function JoinRoomForm({ isDisabled }: RoomFormProps) {
  const navigate = useNavigate();
  const [roomId, setRoomId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Joins the Room and redirect it to the room page
   */
  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponseRoom>(
        `${API_BASE_URL}/r/join/${roomId}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (!response.data.success) {
        window.alert('Bad Request');
        console.log('bad');
        return;
      }

      navigate(`r/${roomId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Only medium and above medium screens */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="h-24 w-fit md:h-12 md:w-96 flex flex-col md:flex-row"
      >
        <div className="flex-1">
          <input
            disabled={isDisabled || isLoading}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className={`h-12 w-full px-4 py-1.5 border rounded-lg rounded-b-none md:rounded-md md:rounded-r-none md:border-r-0 focus:outline-none font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500 ${
              isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            placeholder="What is your room id?"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled || isLoading}
          onClick={() => handleJoinRoom()}
          className={`h-12 w-32 px-4 py-1.5 transition bg-red-600 hover:bg-red-500 text-gray-200 text-sm rounded-md rounded-t-none md:rounded-md md:rounded-l-none border-l-0 outline-accent-500 border border-red-500 ${
            isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isLoading ? 'Joinning' : 'Join room'}
        </button>
      </form>
    </>
  );
}
