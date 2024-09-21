'use client'
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Page = () => {
  const product = useQuery(api.database.getProduct);
  return (
    <div className="bg-[#FAFAFA] w-full h-auto min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-medium text-center my-14 text-black ">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {product?.map((item) => (
            <Link
              href={`/product/${item._id}`}
              key={item._id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain mb-4 rounded-lg mix-blend-multiply"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-lg text-gray-800 font-bold mb-2">
                ${item.price}
              </p>
              <p className="text-gray-500 mb-4">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
