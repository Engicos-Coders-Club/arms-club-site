'use client'
import { useCart } from '../../Context';
import { product } from '../../../../public/demoproduct';

interface Query {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// export const revalidate = 60;

// export async function generateStaticParams() {
//   return product.map((products) => ({
//     id: products.id.toString(),
//   }));
// }

const Page = ({ params }: { params: { product: string } }) => {
  const postId = Number(params.product);
  const post = product.find((post) => post.id === postId);
  const { addToCart } = useCart();

  const handleAddToCartClick = (product: Query) => {
    addToCart(product);
  };
  if (!post) {
    return (
      <main>
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <div className='w-full bg-[#FAFAFA] h-screen flex justify-center items-center'>
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Section */}
        <div className="flex-1">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-contain rounded-lg  mix-blend-multiply"
          />
        </div>

        {/* Product Details Section */}
        <div className="flex-1">
          {/* Product Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
          

          {/* Price Section */}
          <div className="text-3xl font-bold text-green-600 mb-2">
            ${post.price}
          </div>

          {/* Offers and Delivery Information */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Free delivery by <strong>Tuesday, Sept 7</strong></p>
            <p className="text-gray-500 text-sm">Get up to 10% off with select cards</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
              Buy Now
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out" onClick={()=>handleAddToCartClick(post)}>
              Add to Cart
            </button>
          </div>

          {/* Product Description */}
          <p className="text-gray-800">{post.description}</p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Page;
