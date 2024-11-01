import Spline from "@splinetool/react-spline/next";
import { Oxanium } from "next/font/google";
const oxanium = Oxanium({ subsets: ["latin"], weight: ["400", "800"] });
const Hero = () => {
  return (
    <div className={`${oxanium.className} w-full h-screen flex flex-col justify-center items-center bg-zinc-950 sticky top-0 overflow-hidden`}>
      {/* <Spline
        scene="https://prod.spline.design/uGQZXF4e0NBNzB9C/scene.splinecode"
        className="z-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:rounded-br-[350px] rounded-br-[320px]  overflow-hidden size-full "
      /> */}
  <h2 className="z-10  text-[#d2cfcf] xl:text-9xl lg:text-8xl text-6xl font-bold text-center text-border">ARMS CLUB</h2>
      {/* <div className="z-10 flex flex-col items-center justify-center w-full gap-5 mb-10 h-1/2 sm:items-end xl:p-16 lg:p-12 md:p-6 sm:p-2 md:mt-36 sm:mt-44 sm:z-0">
        <h2 className="text-[#d2cfcf]  xl:text-9xl lg:text-8xl md:text-6xl sm:text-4xl text-3xl font-bold  text-center text-border flex ">
          <TextRandomizer page={"ARMS CLUB"}/>
        </h2>
        <p className=" text-[#d2cfcf] w-[55%] text-lg lg:text-2xl md:text-xl sm:text-end text-center leading-relaxed font-sans">Welcome to the GEC ARMS Club website! Our club is a vibrant community of robotics enthusiasts at GEC, dedicated to exploring and advancing robotics technology through hands-on projects, workshops, and competitions. Our mission is to foster innovation, collaboration, and learning among students passionate about robotics and automation.</p>
      </div> */}
      <div className="absolute bg-gray-500 rounded-full -z-10 size-96 bg-opacity-20 blur-2xl top-1/4 left-1/4"></div>
      <div className="absolute bg-gray-500 rounded-full -z-10 size-96 bg-opacity-20 blur-2xl top-3/4 -left-1/4"></div>
      <div className="absolute bg-gray-500 rounded-full -z-10 size-64 bg-opacity-20 blur-2xl -top-3/4 left-1/4"></div>
    </div>
  );
};

export default Hero;
