'use client'
import { Wrench, Bot, Trophy, Users } from "lucide-react";
import { useState, useEffect } from "react";

const AboutUs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: <Bot className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-600" />,
      title: "Innovation Hub",
      description: "We build and program robots, exploring cutting-edge technologies and pushing the boundaries of what's possible."
    },
    {
      icon: <Users className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-600" />,
      title: "Community",
      description: "Join a passionate community of students, mentors, and robotics enthusiasts working together to solve complex challenges."
    },
    {
      icon: <Trophy className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-600" />,
      title: "Competitions",
      description: "Participate in local and national robotics competitions, showcasing your skills and representing our club."
    },
    {
      icon: <Wrench className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-600" />,
      title: "Hands-on Learning",
      description: "Get practical experience with mechanical engineering, programming, and electronics through hands-on projects."
    }
  ];

  return (
    <section className="sticky top-0 z-20 w-full min-h-screen bg-white py-8 md:py-16 overflow-y-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-black">
            About Our Robotics Club
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Empowering students to explore the fascinating world of robotics through hands-on learning, collaboration, and innovation. We're building the next generation of engineers and problem solvers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-4 md:p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 text-center px-4">
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're a beginner curious about robotics or an experienced builder ready for advanced challenges, our club provides the resources, mentorship, and opportunities to help you succeed.
          </p>
          <button className="mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base">
            Join Our Club
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;