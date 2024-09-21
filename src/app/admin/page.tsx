"use client";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";

interface Event {
  id: number;
  name: string;
  organizer: string;
  attendees: number;
  date: string;
  description: string;
  image: string;
}

const EventAdminPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createEvent = useMutation(api.database.createEvent);

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleSave = (event: Event) => {
    if (selectedEvent) {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents([...events, { ...event, id: events.length + 1 }]);
    }
    setIsDialogOpen(false);
    setEvents([...events, event]);
    // console.log(events)
    //write her the save logic add it to data base
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Event Admin Page
      </h1>
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300 mb-6"
      >
        + Create New Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              {event.name}
            </h2>
            <p className="text-gray-700">
              <strong>Organizer:</strong> {event.organizer}
            </p>
            <p className="text-gray-700">
              <strong>Attendees:</strong> {event.attendees}
            </p>
            <p className="text-gray-700">
              <strong>Date:</strong> {event.date}
            </p>
            <div className="mt-6 flex justify-between">
              <button
                className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedEvent ? "Edit Event" : "Create New Event"}
            </h2>
            <EventForm
              event={selectedEvent}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface EventFormProps {
  event: Event | null;
  onSave: (event: Event) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Event>({
    id: 0,
    name: "",
    organizer: "",
    attendees: 0,
    date: "",
    description: "",
    image: "",
    ...event,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    console.log(formData)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-10 max-w-lg mx-auto space-y-6"
    >
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Event Name"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="organizer"
        value={formData.organizer}
        onChange={handleChange}
        placeholder="Organizer"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="attendees"
        value={formData.attendees}
        onChange={handleChange}
        placeholder="Attendees"
        type="number"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
        type="date"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Event
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const page = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false); 
  
    // The hardcoded password
    const correctPassword = 'test123';
  
    useEffect(() => {
      setIsClient(true);
  
      const auth = localStorage.getItem('isAuthenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }, []);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === correctPassword) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        setError('Incorrect password, please try again.');
      }
    };
  
    const handleLogout = () => {
      if (isClient) {
        localStorage.removeItem('isAuthenticated');
    }
    router.push('/')
    };

    if (!isAuthenticated) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-black">Enter Password</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        );
      }
  return (
    <div className="bg-white w-screen min-h-screen text-black flex justify-start items-start p-28 relative">
         <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 absolute top-20 right-14"
        onClick={handleLogout}
      >
        Logout
      </button>
      <EventAdminPage />
    </div>
  );
};

export default page;
