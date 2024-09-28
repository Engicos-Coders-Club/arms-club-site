'use client'
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Page = () => {
  const product = useQuery(api.database.getProduct);
  return (
    <div className="bg-[#FAFAFA] w-full h-auto min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-5xl font-medium text-center text-black my-14 ">Our Products</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {product?.map((item) => (
            <Link
              href={`/product/${item._id}`}
              key={item._id}
              className="p-6 transition-shadow duration-300 ease-in-out border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="object-contain w-full h-48 mb-4 rounded-lg mix-blend-multiply"
              />
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="mb-2 text-lg font-bold text-gray-800">
                ${item.price}
              </p>
              <p className="mb-4 text-gray-500">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
