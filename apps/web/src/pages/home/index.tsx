import axios from 'axios';
import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import TagLine from '../../components/tag-line';
import { API_BASE_URL } from '../../lib/constants';

export function Home() {
  React.useEffect(() => {
    async function fetchData() {
      console.log();
      try {
        const response = await axios.get(`${API_BASE_URL}/auth`, {
          withCredentials: true,
        });
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error('Not Authorized');
      }
    }
    fetchData();
  }, []);
  return (
    <h1 className="h-full w-full px-8 py-2 font-bold flex flex-col">
      <Header />
      <div className="self-center mt-7">
        <TagLine>
          <div className="flex gap-2 items-center">
            <a
              href="https://github.com/venkatk-git/stream"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
            </a>
            This is the github repository of Stream
          </div>
        </TagLine>
      </div>
      <div className="h-24" />
      <main className="flex flex-col items-center overflow-auto size-full max-w-6xl mx-auto text-sm">
        <div className="my-7 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-semibold tracking-tight text-gray-200">
            Want to <span className="text-red-600 italic">watch</span> youtube{' '}
            <span className="text-red-600 italic">together?</span>
          </h1>
          <h3 className="text-sm md:text-lg lg:text-xl text-center font-semibold tracking-tight text-gray-300">
            Then create or join a room with your friends
          </h3>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="h-12 w-28 md:w-96">
            <button className="h-full w-full bg-red-600 text-gray-200 text-sm px-4 py-1.5 rounded-md outline-accent-500 border border-red-500">
              Create Instant Room
            </button>
          </div>
          {/* Only medium and above medium screens */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="h-12 w-28 md:w-96 hidden md:flex space"
          >
            <div className="flex-1">
              <input
                className="w-full h-full border rounded-lg rounded-r-none border-r-0 focus:outline-none px-3 font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500"
                placeholder="What is your room id?"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-gray-200 text-sm px-4 py-1.5 rounded-md rounded-l-none border-l-0 outline-accent-500 border border-red-500"
            >
              Join room
            </button>
          </form>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </h1>
  );
}
