import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <header className='w-full border-0 border-b-1 shadow-md rounded-md'>
        <nav className='nav'>
            <Link href={"/"} className='flex items-center gap-1'>
            <Image alt='logo' src="/assets/icons/mylogo.svg" width={90} height={90}/> 
             
             <p className='nav-logo'>Price<span className='text-purple-600'>Snag</span></p>
            

            </Link>
            <div className='flex justify-center items-center gap-8'>
            <IoIosSearch size={30}/>
            <LuHeart size={25}/>
            <CiUser size={31}/>
            </div>



        </nav>
    </header>
  )
}

export default Navbar