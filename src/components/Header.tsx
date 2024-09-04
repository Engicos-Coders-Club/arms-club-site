import React from 'react'
import Link from 'next/link'
const Header = () => {
        return (
            <header className="bg-transparent text-white fixed top-0 left-0 right-0 z-[99999]">
                <div className="container mx-auto py-4 px-6 flex items-center justify-between">
                    <h1 className="text-xl flex text-center flex-col"><span className='sm:text-2xl text-lg font-semibold'>ARMS</span><span className='sm:text-2xl text-[0.6rem]'>ROBOTICS CLUB</span></h1>
                    <nav>
                        <ul className="flex sm:space-x-10 space-x-6 sm:text-xl text-sm uppercase">
                            <li>
                                <Link href="/" className="hover:text-gray-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-gray-300">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-gray-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/team" className="hover:text-gray-300">
                                    Team
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
}
export default Header