import Header from '../../components/header';

export function Home() {
  return (
    <h1 className="font-bold">
      <Header />
      <div className="h-24" />
      <main className="flex justify-center items-center overflow-auto size-full max-w-6xl mx-auto text-sm ">
        <div className="w-28 md:w-96 flex">
          <div className="flex-1">
            <input
              className="w-full h-12 `border rounded-lg rounded-r-none border-r-0 focus:outline-none px-3 font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500"
              placeholder="What is your room id?"
            />
          </div>
          <button className="bg-red-600 text-gray-200 text-sm px-4 py-1.5 rounded-md rounded-l-none border-l-0 outline-accent-500 border border-red-500">
            Join room
          </button>
        </div>
      </main>
    </h1>
  );
}
