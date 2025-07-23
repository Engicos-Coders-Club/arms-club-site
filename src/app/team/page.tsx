"use client"
import Image from "next/image"
import { clubMembers } from "../../../public/team"
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6"

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Meet Our Team
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our passionate team of robotics enthusiasts, innovators, and leaders working together to push the boundaries
            of technology
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {clubMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative bg-white rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl border border-gray-100 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>

                {/* Profile Image */}
                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="mx-auto rounded-full border-4 border-gray-100 group-hover:border-blue-200 transition-colors duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center relative z-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h2>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full">
                      {member.position}
                    </span>
                  </div>

                  <div className="text-gray-600 text-sm mb-6 space-y-1">
                    <p className="font-medium">{member.year} Year</p>
                    <p>{member.branch}</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Want to Join Our Team?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our robotics community
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamPage
