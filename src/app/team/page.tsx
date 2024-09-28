'use client'
import React from 'react';
import Image from 'next/image';
import { clubMembers } from '../../../public/team';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10">
      <div className="px-4 mx-auto max-w-7xl">
        <h1 className="mb-12 text-4xl font-bold text-center text-black ">Meet the Team</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clubMembers.map((member) => (
            <div key={member.id} className="relative">
              {/* Content Div (Text & Image) */}
              <div className="relative z-10 p-6 text-center group">
                <div className="mb-4">
                  <div className="electric-shadow">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="mx-auto rounded-full"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-black ">{member.name}</h2>
                <p className="text-gray-500">{member.position}</p>
                <p className="text-gray-700">
                  {member.year} Year, {member.branch}
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
