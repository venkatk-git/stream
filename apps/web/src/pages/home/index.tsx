import Header from '../../components/header';

export function Home() {
  return (
    <h1 className="font-bold">
      <Header />
      <div className="h-24" />
      <main className="flex flex-col justify-center items-center overflow-auto size-full max-w-6xl mx-auto text-sm">
        <div className="my-7 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-semibold tracking-tight text-gray-200">
            Want to <span className="text-red-600">watch</span> videos{' '}
            <span className="text-red-600">together?</span>
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
    </h1>
  );
}
