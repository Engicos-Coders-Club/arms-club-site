"use client";
import React, { useState } from "react";
import { events } from "../../../../public/events";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const Page = ({ params }: { params: { events: Id<"events"> } }) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const event  = useQuery(api.database.getSingleEvent,{Id: params.events});


  const handleRegisterClick = () => {
    setShowForm(true);
  };
  const handleBackClick = () => {
    router.back();
  };

  if (!event) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto min-w-96">
      <div className="p-4">
          <button
            onClick={handleBackClick}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            &larr; Back
          </button>
        </div>
        <img
          src={event.image && event.image.startsWith('http') ? event.image : 'https://makebot.in/images/news/Events-1.png'}
          alt={event.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4 text-black">{event.name}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-lg">
              Organiser: {event.organiser}
            </p>
            <p className="text-gray-500 text-lg">
              Attendees: {event.attendees}
            </p>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Date: {new Date(event.date).toDateString()}
          </p>
        </div>
          {event.isCompleted && <div>
            hello
          </div>}
      </div>
    </main>
  );
};

export default Page;
