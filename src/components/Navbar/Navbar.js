"use client";

import React, { useState } from 'react'
import { MdWatch } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {

    const session = useSession();
    const status = session?.status;
    const [drop, setDrop] = useState(false);
    const [menu, setMenu] = useState(false);

    function handleToggle() {
        setDrop(!drop);
    }

    function handleMenu() {
        const ul = document.querySelector(".nav-list");
        const main = document.querySelector(".main");
        setMenu((state) => !state);
        menu === true ? ul.classList.remove("hidden") : ul.classList.add("hidden");
    }

    return (
        <div className='main md:flex bg-white py-5 px-2 md:p-5 md:items-center md:justify-between'>
            <Link href={"/"} className='flex items-center text-2xl cursor-pointer'>
                <MdWatch />
                <span className='font-medium'>Chrono24</span>
            </Link>
            <div>
                <IoMenu className='md:hidden text-2xl cursor-pointer ms-auto -mt-6' onClick={handleMenu} />
                <ul className='nav-list md:flex gap-10 md:items-center mt-2 md:mt-0 hidden'>
                    {status === "authenticated" && (
                        <>
                            <li className='my-1 md:my-0'><Link href={"/dashboard/mens"}>Mens</Link></li>
                            <li className='my-1 md:my-0'><Link href={"/dashboard/womens"}>Womens</Link></li>
                            <li className='my-1 md:my-0'><Link href={"/dashboard/orders"}>My Orders</Link></li>
                            <li className='my-1 md:my-0'><Link href={"/dashboard/cart"}><FaShoppingCart className='text-xl' /></Link></li>
                            <li className='my-1 md:my-0'>
                                <div onClick={handleToggle} className='relative'>
                                    <FaRegUserCircle className='cursor-pointer text-2xl' />
                                    {drop && (
                                        <span className="absolute bg-gray-100 z-10 px-5 py-3 mt-2 right-0 shadow-lg">
                                            <li onClick={() => signOut()} className='cursor-pointer'>Logout</li>
                                        </span>
                                    )}
                                </div>
                            </li>
                        </>
                    )}
                    {status === "unauthenticated" && (
                        <>
                            <li className='my-3 md:my-0'><Link href={"/login"}>Login</Link></li>
                            <li className='my-2 md:my-0'><Link href={"/register"} className='p-3 bg-background rounded-lg'>Sign up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar