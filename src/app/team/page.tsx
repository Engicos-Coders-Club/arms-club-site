'use client'
import React from 'react';
import Image from 'next/image';
import { clubMembers } from '../../../public/team';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">

      <div className="px-4 mx-auto max-w-7xl relative">
        {/* Robotic Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-600 to-gray-500 mb-4">
            Meet Our Robotics Team
          </h1>
          <div className="w-24 h-1 bg-gray-500 mx-auto rounded-full"></div>
        </div>

        {/* Team Grid */}
          {clubMembers.map((member) => (
            <div key={member.id} className="group">
              {/* Member Card */}
              <div className="relative bg-white rounded-lg p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-100">
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-500"></div>

                {/* Profile Image */}
                <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="relative mx-auto rounded-full border-2 border-gray-500"
                  />
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h2>
                  <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.year} Year, {member.branch}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/5 to-gray-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;