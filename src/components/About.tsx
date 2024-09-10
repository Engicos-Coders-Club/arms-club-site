import Image from "next/image";

const About = () => {
  return (
    <div className="py-16">
      <div className="flex sm:flex-row flex-col sm:justify-between items-center">
        {/* Image on the left */}
        <div className="sm:w-1/3 w-full flex justify-center sm:justify-start">
          <div className="w-72 h-72 sm:m-12 border border-white flex justify-center items-center rounded-full">
            <Image
              alt="abt_img"
              width={288}
              height={288}
              className="object-cover object-center p-2"
              src="/vercel.svg"
            />
          </div>
        </div>
        {/* Text on the right */}
        <div className="sm:w-2/3 w-full">
          <h1 className="font-bold sm:text-4xl text-3xl mb-5 text-center">
            About Us
          </h1>
          <p className="sm:text-xl text-lg sm:px-10 px-3 sm:text-right text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            corrupti reiciendis fugiat, fugit, dolorem iste aperiam aut eius at
            dolores exercitationem adipisci possimus, deserunt nulla voluptas
            totam veniam veritatis cum?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
