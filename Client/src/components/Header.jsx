import React from 'react';
import { Button } from "@/components/ui/button"
import { IoLogoBitbucket } from "react-icons/io";


const Header = () => {
    return (
        <nav className="bg-gradient-to-r from-[#3293d2]  to-[#2d4ed1] h-24 w-full flex justify-between px-10">
            <IoLogoBitbucket color='white' height={20} className='mt-6 ml-10' size={50}/>
            <ul className='flex gap-24 pt-10 font-poppins text-white font-medium pl-96 text-[18px]' >
            <li className='cursor-pointer hover:underline'>Home</li>
            <li className='cursor-pointer hover:underline'>About Us</li>
            <li className='cursor-pointer hover:underline'>Features</li>
            <li className='cursor-pointer hover:underline'>Contact</li>
            </ul>

            <h2 className='text-white pt-10 pr-10'>
                Login
            </h2>
  
        </nav>
    );
}

export default Header;
