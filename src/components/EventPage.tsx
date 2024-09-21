"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { v } from "convex/values";

const EventPage = ({
  params,
  userId,
}: {
  params: { events: Id<"events"> };
  userId: string;
}) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { isSignedIn, user } = useUser();
  const createUser = useMutation(api.database.createUser);
  const attendEvents = useMutation(api.database.attendEvent);
  const unAttendEvents = useMutation(api.database.unattendEvent);
  //   console.log(user)
  const [formData, setFormData] = useState({
    name: user?.fullName,
    email: user?.emailAddresses[0].emailAddress,
    branch: "",
    year: 1,
    rollNumber: "",
  });
  const event = useQuery(api.database.getSingleEvent, { Id: params.events });
  const userIdNew = userId as Id<"users">;
  const userDetail = useQuery(api.database.getSingleUSer, { Id: userIdNew });
  console.log(userDetail);
  const handleBackClick = () => {
    router.back();
  };
  const updateFormData = () => {
    setFormData((prevData) => ({
      ...prevData,
      name: userDetail?.name || "",
      email: userDetail?.email || "",
      branch: userDetail?.branch || "",
      year: userDetail?.year || 1,
      rollNumber: userDetail?.rollNo || "",
    }));
  };
  useEffect(() => {
    if (isSignedIn) {
      updateFormData();
    }
  }, [userDetail]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!event) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
      </main>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!userDetail?.detailsExist) {
        await createUser({
          userId: userId,
          name: formData.name || "",
          email: formData.email || "",
          branch: formData.branch,
          year: formData.year,
          rollNo: formData.rollNumber,
          detailsExist: true,
        });
      }
      if (userDetail?._id) {
        await attendEvents({ eventId: event._id, userId: userDetail._id });
      }
      setShowForm(false);
    } catch (error) {
      if (error) {
        console.error("Error attending event", error);
      }
      setShowForm(false);
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto min-w-96 p-6">
        <div className="p-4">
          <button
            onClick={handleBackClick}
            className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
          >
            &larr; Back
          </button>
        </div>
        <img
          src={
            event.image && event.image.startsWith("http")
              ? event.image
              : "https://makebot.in/images/news/Events-1.png"
          }
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
            {!event.isCompleted && (
              <p className="text-gray-500 text-lg">
                Seats Left : {event.attendees - event.participants.length}
              </p>
            )}
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Date: {new Date(event.date).toDateString()}
          </p>
        </div>
        {!event.isCompleted && (
          <div>
            {userDetail?._id && event.participants.includes(userDetail._id) ? (
              <button className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              onClick={()=>{
                unAttendEvents({eventId:event._id,userId:userDetail._id})
              }}>
                UnRegister
              </button>
            ) : (
              <button
                onClick={() => {
                  if (isSignedIn) {
                    setShowForm(true);
                  } else {
                    router.push("/sign-in");
                  }
                }}
                className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Register
              </button>
            )}

            {showForm && isSignedIn && (
              <div>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-black">
                      Register for the Event
                    </h2>
                    <form
                      className="bg-white shadow-md rounded-lg p-10 max-w-lg mx-auto space-y-6 text-black"
                      onSubmit={handleSubmit}
                    >
                      <input
                        name="name"
                        onChange={handleChange}
                        placeholder="Name"
                        value={formData?.name || ""}
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border text-gray-500 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={(e) =>
                          setFormData({ ...formData, branch: e.target.value })
                        }
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>
                          Select Branch
                        </option>
                        <option value="CSE">Computer</option>
                        <option value="ECE">Electronics</option>
                        <option value="ME">Electrical</option>
                        <option value="CE">Civil</option>
                        <option value="EE">Mechanical</option>
                        <option value="VL">Vlsi</option>
                      </select>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            year: Number(e.target.value),
                          })
                        }
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>
                          Select Year
                        </option>
                        <option value={1}>1st</option>
                        <option value={2}>2nd</option>
                        <option value={3}>3rd</option>
                        <option value={4}>4th</option>
                      </select>
                      <input
                        name="rollNumber"
                        placeholder="Roll Number"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Register
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          onClick={() => setShowForm(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default EventPage;
