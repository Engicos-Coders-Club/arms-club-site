"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context";

const Page = ({ params }: { params: { product: Id<"products"> } }) => {
  const router = useRouter();
  const post = useQuery(api.database.getSingleProduct, { Id: params.product });
  const { addToCart } = useCart();

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-white">
        <p>Loading...</p>
      </main>
    );
  }

  const handleBackClick = () => {
    router.back();
  };

  const handleAddToCartClick = (post: { 
    _id: import("convex/values").GenericId<"products">; 
    _creationTime: number; 
    description: string; 
    image: string; 
    title: string; 
    price: number; 
  }) => {
    addToCart({
      id: post._id,
      title: post.title,
      price: post.price,
      description: post.description,
      category: "Category",
      image: post.image,
    });
  };

  return (
    <div className="w-full bg-[#FAFAFA] h-screen flex justify-center items-center">
      <div className="container px-4 py-8 mx-auto">
        <button
          onClick={handleBackClick}
          className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700 "
        >
          &larr; Back
        </button>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* Product Image Section */}
          <div className="flex-1">
            <img
              src={post.image || "/placeholder.png"} // Fallback image
              alt={post.title || "Product Image"}
              className="w-full h-[400px] object-contain rounded-lg mix-blend-multiply"
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col flex-1 gap-6">
            {/* Product Title */}
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {post.title}
            </h1>

            {/* Price Section */}
            <div className="mb-2 text-3xl font-bold text-gray-900">
              ${post.price.toFixed(2)}{" "}
              {/* Conditionally render strikethrough only if there's a discount */}
              {/* Uncomment below if you have a discount price */}
              {/* <span className="text-sm text-gray-500 line-through">
                ${discountedPrice}
              </span> */}
            </div>

            {/* Product Description */}
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-black uppercase">
                Description
              </p>
              <p className="font-light text-gray-800">{post.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="px-6 py-2 font-bold text-white transition duration-300 ease-in-out bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600">
                Buy Now
              </button>
              <button
                className="px-6 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                onClick={() => handleAddToCartClick(post)}
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
