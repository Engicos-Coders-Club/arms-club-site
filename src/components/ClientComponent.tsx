"use client";

import { useEffect, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const ClientComponent = ({ userId }: { userId: string }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const passwordFromDatabase = useQuery(api.database.getPass);
  useEffect(() => {
    if (userId && passwordFromDatabase) {
      if (passwordFromDatabase[0].userId === userId) {
        setisAuthenticated(true);
      } else {
        setisAuthenticated(false);
      }
    }
  }, [userId, passwordFromDatabase]);
  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black text-6xl">
        <h1>YOU ARE NOT MEANT TO BE HERE :)</h1>
      </div>
    );
  else {
    return (
      <div className="bg-white w-full min-h-screen p-20">
        <Events />
      </div>
    );
  }
};

type Event = {
  _id: Id<"events">;
  name: string;
  organizer: string;
  attendees: number;
  date: string;
  description: string;
  image: string;
  isCompleted: boolean;
};

type Product = {
  _id: Id<"products">;
  title: string;
  price: number;
  description: string;
  image: string;
};

export const Events = () => {
  const events = useQuery(api.database.getEvent);
  const products = useQuery(api.database.getProduct);
  const updateCompleition = useMutation(api.database.update);
  const updateProduct = useMutation(api.database.updateProduct);
  const addEvent = useMutation(api.database.createEvent);
  const addProduct = useMutation(api.database.createProduct);
  const deleteProduct = useMutation(api.database.deleteProductId);
  const deleteEvent = useMutation(api.database.deleteById);
  const [formData, setFormData] = useState<Event>({
    _id: { __tableName: "events" } as Id<"events">,
    name: "",
    organizer: "",
    attendees: 0,
    date: "",
    description: "",
    image: "",
    isCompleted: false,
    ...events,
  });

  const [selectedEvent, setSelectedEvent] = useState<{
    _id: Id<"events">;
    name: string;
    organiser: string;
    attendees: number;
    date: string;
    isCompleted: boolean;
  } | null>(null);

  const [productData, setProductData] = useState<Product>({
    _id: { __tableName: "products" } as Id<"products">,
    title: "",
    price: 0,
    description: "",
    image: "",
    ...products,
  });
  const [selectedProduct, setSelectedProduct] = useState<{
    _id: Id<"products">;
    title: string;
    price: number;
    description: string;
    image: string;
  } | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (event: {
    _id: Id<"events">;
    name: string;
    organiser: string;
    attendees: number;
    date: string;
    description: string;
    image: string;
    isCompleted: boolean;
  }) => {
    setSelectedEvent(event);
    setFormData({
      _id: event._id,
      name: event.name,
      organizer: event.organiser,
      attendees: event.attendees,
      date: event.date,
      description: event.description,
      image: event.image,
      isCompleted: event.isCompleted,
    });
    setIsDialogOpen(true);
  };

  const update = async (storageId: Id<"events">) => {
    const x = await deleteEvent({ storageId });
  };
  const handleDeleteProduct = async (productId: Id<"products">) => {
    await deleteProduct({ storageId: productId });
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: {
    _id: Id<"products">;
    title: string;
    price: number;
    description: string;
    image: string;
  }) => {
    setSelectedProduct(product);
    setProductData({
      _id: product._id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setIsProductDialogOpen(true);
    console.log("Edit product:", product);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsProductDialogOpen(true);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Event Page
      </h1>
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300 mb-6"
      >
        + Create New Event
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <div
            key={event._id}
            className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              {event.name}
            </h2>
            <p className="text-gray-700">
              <strong>Organizer:</strong> {event.organiser}
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
                onClick={() => update(event._id)}
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
            <h2 className="text-2xl font-semibold mb-4 text-black">
              {selectedEvent ? "Edit Event" : "Create New Event"}
            </h2>
            <form
              onSubmit={() => {
                if (selectedEvent) {
                  updateCompleition({
                    name: formData.name,
                    description: formData.description,
                    image: formData.image,
                    date: formData.date,
                    attendees: formData.attendees,
                    isCompleted: formData.isCompleted,
                    organiser: formData.organizer,
                    storageId: formData._id,
                  });
                  setSelectedEvent(null);
                  setFormData({
                    _id: { __tableName: "events" } as Id<"events">,
                    name: "",
                    organizer: "",
                    attendees: 0,
                    date: "",
                    description: "",
                    image: "",
                    isCompleted: false,
                  });
                } else {
                  addEvent({
                    name: formData.name,
                    description: formData.description,
                    image: formData.image,
                    date: formData.date,
                    attendees: formData.attendees,
                    isCompleted: formData.isCompleted,
                    organiser: formData.organizer,
                  });
                }
                setIsDialogOpen(false);
              }}
              className="bg-white shadow-md rounded-lg p-10 max-w-lg mx-auto space-y-6 text-black"
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
                className="w-full border text-gray-500 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date"
                type="date"
                required
                className="w-full border text-gray-500 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <input
                name="isCompleted"
                type="checkbox"
                checked={formData.isCompleted}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    isCompleted: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isCompleted" className="ml-2 text-gray-700">
                Is Completed
              </label>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Event
                </button>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFormData({
                      _id: { __tableName: "events" } as Id<"events">,
                      name: "",
                      organizer: "",
                      attendees: 0,
                      date: "",
                      description: "",
                      image: "",
                      isCompleted: false,
                    });
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold my-6 mt-40 text-gray-800 text-center">
        Product Page
      </h1>
      <button
        onClick={handleCreateProduct}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300 mb-6"
      >
        + Create New Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product._id} className="">
            <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                {product.title}
              </h2>
              <p className="text-gray-700">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-700">{product.description}</p>
              <div className="mt-6 flex justify-between">
                <button
                  className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isProductDialogOpen && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                {selectedProduct ? "Edit Product" : "Create New Product"}
              </h2>
              <form
                onSubmit={() => {
                  if (selectedProduct) {
                    updateProduct({
                      storageId: selectedProduct._id,
                      title: productData.title,
                      price: productData.price,
                      description: productData.description,
                      image: productData.image,
                    });
                    setSelectedProduct(null);
                    setProductData({
                      _id: { __tableName: "products" } as Id<"products">,
                      title: "",
                      description: "",
                      image: "",
                      price: 0,
                    });
                  } else {
                    addProduct({
                      title: productData.title,
                      price: productData.price,
                      description: productData.description,
                      image: productData.image,
                    });
                  }
                  setIsProductDialogOpen(false);
                }}
                className="bg-white shadow-md rounded-lg p-10 max-w-lg mx-auto space-y-6 text-black"
              >
                <input
                  name="title"
                  value={productData.title}
                  onChange={(e) =>
                    setProductData((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Product Title"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="price"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData((prevData) => ({
                      ...prevData,
                      price: parseFloat(e.target.value),
                    }))
                  }
                  placeholder="Product Price"
                  type="number"
                  required
                  className="w-full border text-gray-500 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="description"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData((prevData) => ({
                      ...prevData,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Product Description"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="image"
                  value={productData.image}
                  onChange={(e) =>
                    setProductData((prevData) => ({
                      ...prevData,
                      image: e.target.value,
                    }))
                  }
                  placeholder="Product Image URL"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Product
                  </button>
                  <button
                    onClick={() => {
                      setIsProductDialogOpen(false);
                      setProductData({
                        _id: { __tableName: "products" } as Id<"products">,
                        title: "",
                        price: 0,
                        description: "",
                        image: "",
                      });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
  );
};
