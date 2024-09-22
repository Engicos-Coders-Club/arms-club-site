"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { product: Id<"products"> } }) => {
  const router = useRouter();
  const post = useQuery(api.database.getSingleProduct, { Id: params.product });
  if (!post) {
    return (
      <main className="min-h-screen w-full bg-white">
       
      </main>
    );
  }
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="w-full bg-[#FAFAFA] h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBackClick}
         className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer "
      >
        &larr; Back
      </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image Section */}
          <div className="flex-1">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-contain rounded-lg  mix-blend-multiply"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex-1 flex gap-6 flex-col">
            {/* Product Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Price Section */}
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ${post.price}{" "}
              <span className="text-gray-500 text-sm line-through">
                ${post.price}
              </span>
            </div>

            {/* Product Description */}
            <div className="flex gap-2 flex-col">
              <p className="text-black uppercase text-xl font-semibold">
                Description
              </p>
              <p className="text-gray-800 font-light">{post.description}</p>
            </div>
            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                Buy Now
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                // onClick={() => handleAddToCartClick(post)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
