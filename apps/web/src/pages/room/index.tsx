import Details from './details';

export default function RoomPage() {
  /**
   * TODO:
   *  - Check wheather the recieved room id is valid --> Yes proceed, No Throw back
   *  - Render the video with the recieved video id
   *  - Make a an api call for members in the room
   *  -
   *
   */

  /**
   * Room page Initializer
   */
  return (
    <section className="py-2 h-full w-full flex flex-col lg:flex-row gap-4">
      <div className="h-full w-full lg:flex-1 flex flex-col">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900">
          {/**
           * TODO: Insert the video
           */}
        </div>
      </div>
      <Details />
    </section>
  );
}
