interface RoomFormProps {
  isDisabled: boolean;
}

export default function JoinRoomForm({ isDisabled }: RoomFormProps) {
  return (
    <>
      {/* Only medium and above medium screens */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="h-24 w-fit md:h-12 md:w-96 flex flex-col md:flex-row"
      >
        <div className="flex-1">
          <input
            disabled={isDisabled}
            className={`h-12 w-full px-4 py-1.5 border rounded-lg rounded-b-none md:rounded-md md:rounded-r-none md:border-r-0 focus:outline-none font-normal bg-black-300 text-gray-200 border-gray-800 placeholder-gray-500 ${
              isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            placeholder="What is your room id?"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className={`h-12 px-4 py-1.5 transition bg-red-600 hover:bg-red-500 text-gray-200 text-sm rounded-md rounded-t-none md:rounded-md md:rounded-l-none border-l-0 outline-accent-500 border border-red-500 ${
            isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          Join room
        </button>
      </form>
    </>
  );
}
