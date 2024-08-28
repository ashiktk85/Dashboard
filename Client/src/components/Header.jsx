import React, { useState } from 'react';
import { IoLogoBitbucket, IoIosHome } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-[#3293d2] to-[#2d4ed1] h-24 w-full flex justify-between items-center px-6 lg:px-10">
      
      <IoLogoBitbucket color="white" height={20} className="ml-4 lg:ml-10" size={50} />

    
      <div className="flex items-center lg:gap-4">
      
        <ul
          className={`flex-col gap-4 p-4 lg:p-0 lg:flex-row lg:gap-10 font-poppins text-white font-normal text-[18px] absolute lg:static top-20 left-0 right-0 transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex bg-gradient-to-r from-[#3293d2] to-[#2d4ed1]' : 'hidden'} lg:flex lg:bg-transparent`}
        >
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">About Us</li>
          <li className="cursor-pointer hover:underline">Features</li>
          <li className="cursor-pointer hover:underline">Contact</li>

         
          <li className="block lg:hidden mt-2">
            <button className="h-10 w-24 bg-gradient-to-t from-slate-300 to-cyan-800 text-white rounded-full text-2xl">
              Login
            </button>
          </li>
        </ul>

      
        <button className="hidden lg:block h-10 w-24 bg-gradient-to-t from-slate-300 to-cyan-800 text-white rounded-full text-2xl ml-4">
          Login
        </button>
      </div>

    
      <button
        className="block lg:hidden focus:outline-none absolute right-4 top-6"
        onClick={handleMenuToggle}
      >
        <IoIosHome color="white" size={40} />
      </button>
    </nav>
  );
};

export default Header;
