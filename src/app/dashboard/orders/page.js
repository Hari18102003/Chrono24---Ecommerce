"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Orderpage = () => {

    const [items, setItems] = useState([]);
    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/get/user");
            if (data.success) {
                setItems(data.user.orders);
            }
        }
        fetchUser();
    }, []);

    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (
        <div className='mt-4 mb-2 px-5'>
            <div className='bg-white p-2'>
                <h1 className='text-center font-semibold text-xl my-3'>Your Orders</h1>
                {items.length > 0 && (
                    items.map(item => (
                        <div className='flex border-b py-3 border-b-slate-200' key={item.watch._id} >
                            <div className='grow flex items-center pr-2 md:pr-0 justify-center'>
                                <img src={item.watch.image} className='w-44 h-44 rounded-lg' />
                            </div>
                            <div className='grow flex flex-col justify-around'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-lg font-semibold'>{item.watch.name}</h1>
                                        <p className='text-sm text-gray-400'>{item.watch.gender}</p>
                                    </div>
                                </div>
                                <h4 className='font-semibold'>${parseFloat(item.watch.price) * item.quantity}</h4>
                                <div className='flex gap-3'>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {!items.length > 0 && (
                    <p className='text-center font-semibold'>No Orders</p>
                )}
            </div>
        </div>
    )
}

export default Orderpage