import io from 'socket.io-client';
import { DEPLOYED_API_BASE_URL } from './lib/constants';

const socket = io(DEPLOYED_API_BASE_URL, {
  autoConnect: false,
  withCredentials: true,
} as any);

export default socket;
