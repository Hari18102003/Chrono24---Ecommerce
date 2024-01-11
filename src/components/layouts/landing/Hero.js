import { FaShoppingBag } from "react-icons/fa";
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className='grid grid-cols-1 pt-5 md:pt-0 md:grid-cols-2 bg-white px-2 rounded-sm'>
            <div className='flex flex-col justify-center gap-6'>
                <h1 className='font-bold text-2xl md:text-4xl'>Welcome to Chrono24 - Where Time Meets Elegance</h1>
                <p className='text-gray-500'>Discover the epitome of precision and style with our exquisite collection of watches. At Chrono24, we curate timepieces that blend craftsmanship with contemporary design, making a statement on your wrist.</p>
                <div className='flex'>
                    <Link href={"/dashboard"} className='p-3 hover:border-2 hover:border-black hover:text-black hover:bg-transparent flex items-center gap-2 text-white bg-black rounded-lg'><span>Shop Now</span><FaShoppingBag className="" /></Link>
                </div>
            </div>
            <div className=''>
                <img src='/hero.png' className='w-full h-full' />
            </div>
        </div>
    )
}

export default Hero