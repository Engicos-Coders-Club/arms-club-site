import Link from 'next/link';
import { product } from '../../../public/demoproduct';

const Page = () => {
    // console.log({ product });
    return (
        <div className='bg-[#FAFAFA] w-full'>
            <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.map((item) => (
                    <Link href={`/product/${item.id}`}
                        key={item.id} 
                        className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                    >
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-48 object-contain mb-4 rounded-lg mix-blend-multiply" 
                        />
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
                        <p className="text-lg text-green-600 font-bold mb-2">${item.price}</p>
                        <p className="text-gray-500 mb-4">{item.description}</p>
                        <p className="text-sm text-gray-500">Rating: <span className="font-medium text-yellow-500">{item.rating.rate}</span> ({item.rating.count} reviews)</p>
                    </Link>
                ))}
            </div>
        </div>
        </div>
        
    );
};

export default Page;