import Image from 'next/image'
import {clubMembers} from '../../../public/team'

const page = () => {
  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Meet the Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clubMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4 flex justify-center items-center">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
            </div>
            <h2 className="text-xl font-semibold text-black">{member.name}</h2>
            <p className="text-gray-500">{member.position}</p>
            <p className="text-gray-700">
              {member.year} Year, {member.branch}
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                GitHub
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                Instagram
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default page