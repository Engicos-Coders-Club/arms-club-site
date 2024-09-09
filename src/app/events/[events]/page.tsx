"use client";
import React, { useState } from "react";
import { events } from "../../../../public/events";

const Page = ({ params }: { params: { events: string } }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const postId = Number(params.events);
  const event = events.find((post) => post.id === postId);

  const handleRegisterClick = () => {
    setShowForm(true);
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
            <p className="text-gray-500 text-lg">
              Organizer: {event.organizer}
            </p>
            <p className="text-gray-500 text-lg">
              Attendees: {event.attendees}
            </p>
          </div>
          {!showForm && (
            <div
              className="text-xl font-bold mb-4 text-black h-10 w-40 rounded-full border flex justify-center items-center cursor-pointer"
              onClick={handleRegisterClick}
            >
              Register
            </div>
          )}

          {showForm && (
            <div className="mt-4">
              <form className="flex flex-col space-y-4">
                <label className="text-black text-lg">
                  Name:
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="text-black text-lg">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={
                      (e) => setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                    placeholder="Enter your email"
                  />
                </label>
                <div className=" flex justify-center items-center">
                  <button
                    type="submit"
                    className="text-xl font-bold mb-4 text-black h-10 w-40 rounded-full border cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Registered successfully");
                      console.log(formData);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          <p className="text-gray-400 text-sm mt-4">
            Date: {new Date(event.date).toDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
