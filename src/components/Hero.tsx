import Spline from "@splinetool/react-spline/next";
import { Oxanium } from "next/font/google";
const oxanium = Oxanium({ subsets: ["latin"],
  weight: ["400","800"]
 });
const Hero = () => {
  const getrandom = () => {
    return 
  }
  return (
    <div className={`${oxanium.className} w-full h-screen flex flex-col sm:justify-center justify-end items-center bg-zinc-950 sticky top-0`}>
      <Spline
        scene="https://prod.spline.design/NiD8PSamvT6YbTmN/scene.splinecode"
        className="z-0 absolute sm:-left-1/4 sm:bottom-0 -bottom-5 sm:rounded-br-[350px] rounded-br-[320px]  overflow-hidden"
      />
      <div className="w-full h-1/2  flex justify-center flex-col sm:items-end items-center xl:p-16 lg:p-12 md:p-6 sm:p-2 md:mt-36 sm:mt-44 gap-5 sm:z-0 z-10 mb-10">
        <h2 className="text-[#d2cfcf]  xl:text-9xl lg:text-8xl md:text-6xl sm:text-4xl text-3xl font-bold  text-center text-border flex ">
          ARMS CLUB
        </h2>
        <p className=" text-[#d2cfcf] w-[55%] text-lg lg:text-2xl md:text-xl sm:text-end text-center leading-relaxed font-sans">Welcome to the GEC ARMS Club website! Our club is a vibrant community of robotics enthusiasts at GEC, dedicated to exploring and advancing robotics technology through hands-on projects, workshops, and competitions. Our mission is to foster innovation, collaboration, and learning among students passionate about robotics and automation.</p>
      </div>
      <div className="absolute -z-10 rounded-full size-96 bg-gray-500 bg-opacity-20 blur-2xl  top-1/4 left-1/4"></div>
      <div className="absolute -z-10 rounded-full size-96 bg-gray-500 bg-opacity-20 blur-2xl  top-3/4 -left-1/4"></div>
      <div className="absolute -z-10 rounded-full size-64 bg-gray-500 bg-opacity-20 blur-2xl  -top-3/4 left-1/4"></div>
    </div>
  );
};

export default Hero;
