"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ watch }) => {

    const session = useSession();
    const { status } = session;

    async function handleAddToCart(id) {
        const { data } = await axios.put(`/api/cart/add`, { id, quantity: 1 });
        if (data.success) {
            toast.success(data.message);
        }
    }

    return (
        <>
            {watch && (
                <div className='p-3 rounded-md border border-gary-300 flex flex-col gap-3 my-7'>
                    <Link href={`/dashboard/watch/${watch._id}`}>
                        <div className='shadow-md h-[250px] rounded-md'>
                            <img src={watch.image} className='h-full w-full' />
                        </div>
                    </Link>
                    <div className='flex flex-col gap-4'>
                        <Link href={`/dashboard/watch/${watch._id}`} >
                            <div>
                                <h1 className='font-bold text-lg'>{watch.name}</h1>
                                <p className='text-sm text-gray-400'>{watch.gender}</p>
                            </div>
                        </Link>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-bold'>${watch.price}</h3>
                            {status === "authenticated" && (
                                <button onClick={() => handleAddToCart(watch._id)}><FaShoppingCart className='0bg-background text-lg' /></button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card