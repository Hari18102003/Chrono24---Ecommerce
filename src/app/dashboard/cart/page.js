"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";

const Cartpage = () => {

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [id, setId] = useState(null);
    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/get/user");
            if (data.success) {
                setItems(data.user.cart);
            }
        }
        fetchUser();
    }, [id, handleCheckout]);

    useEffect(() => {
        setTotal(0);
        items.map(item => {
            setTotal((total) => {
                return parseFloat(total) + (parseFloat(item.watch.price) * item.quantity)
            });
        });
    }, [items, id]);

    async function handleRemove(id) {
        setId(id);
        const { data } = await axios.put("/api/cart/remove", { id });
        if (data.success) {
            toast.success(data.message);
            setId(null);
        }
    }

    async function handleCheckout() {
        const { data } = await axios.put("/api/cart/empty", { email: session?.data?.user.email });
        if (data.success) {
            toast.success(data.message);
        }
    }

    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (

        <div className='mt-4 w-full px-2 md:w-auto md:px-48 flex flex-col gap-3'>
            <div className='bg-white p-2'>
                <h1 className='text-center text-xl my-3 font-bold'>Your Cart</h1>
                {items.length > 0 && (
                    items.map(item => (
                        <div className='flex border-b py-3 border-b-slate-200' key={item.watch._id} >
                            <div className='grow flex items-center justify-center pr-2 md:pr-0'>
                                <img src={item.watch.image} className='w-44 h-44 rounded-lg' />
                            </div>
                            <div className='grow flex flex-col justify-around'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='md:text-lg font-semibold'>{item.watch.name}</h1>
                                        <p className='text-sm text-gray-400'>{item.watch.gender}</p>
                                    </div>
                                    <button onClick={() => handleRemove(item.watch._id)}><IoMdCloseCircle className='text-2xl' /></button>
                                </div>
                                <h4 className='font-semibold'>${parseFloat(item.watch.price) * item.quantity}</h4>
                                <div className='flex gap-3'>
                                    <label for="quantity">Quantity:</label>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        </div>

                    )))
                }
            </div>
            {items.length > 0 && (
                <>
                    <div className='bg-white flex items-center justify-between p-2'>
                        <h1 className='md:text-xl font-bold'>Total</h1>
                        <p className='font-bold'>${total}</p>
                    </div>
                    <button onClick={handleCheckout} className='mx-auto bg-black text-sm text-white md:p-3 p-2 px-3 md:px-5 text-center rounded-lg my-5'>CheckOut ${total}</button>
                </>
            )}
            {
                !items.length > 0 && (
                    <div className='bg-white p-2 mb-2' >
                        <h1 className='text-center text-xl font-semibold'>Your Cart is empty...</h1>
                    </div>
                )
            }
        </div >

    )
}

export default Cartpage