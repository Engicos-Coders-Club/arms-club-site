import React from 'react'
import {events} from '../../../../public/events'

const page = ({ params }: { params: { events: string } }) => {
  const postId = Number(params.events);
  const event = events.find((post) => post.id === postId);
  console.log(event)
  if (!event) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4 text-black">{event.name}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-lg">Organizer: {event.organizer}</p>
            <p className="text-gray-500 text-lg">Attendees: {event.attendees}</p>
          </div>
          <p className="text-gray-400 text-sm">Date: {new Date(event.date).toDateString()}</p>
        </div>
      </div>
    </main>
  );
}

export default page