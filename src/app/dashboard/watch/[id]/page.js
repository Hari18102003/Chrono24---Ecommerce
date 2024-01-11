"use client";
import Card from '@/components/layouts/landing/Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const SingleWatchpage = ({ params }) => {

    const id = params.id;
    const [watch, setWatch] = useState("");
    const [watches, setWatches] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);

    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function fetchWatch() {
            const { data } = await axios.get(`/api/get/watches/${id}`);
            if (data.success) {
                setWatch(data.watch);
                setPrice(data.watch.price);
            }
        }
        fetchWatch();
    }, []);

    useEffect(() => {
        async function getWatch() {
            const { data } = await axios.get("/api/get/watches");
            setWatches(data.watches);
        }
        getWatch();
    }, []);

    const recommended = watches.filter(item => (item.gender === watch.gender && item._id !== watch._id)).slice(0, 4);

    useEffect(() => {
        setPrice(watch.price);
        setPrice(price => parseFloat(price) * quantity);
    }, [quantity]);


    function handleIncrement() {
        if (quantity < 5) {
            setQuantity((prev) => parseFloat(prev) + 1);
        }
    }
    function handleDecrement() {
        if (quantity > 1) {
            setQuantity((prev) => parseFloat(prev) - 1);
        }
    }

    async function handleAddToCart() {
        const { data } = await axios.put('/api/cart/add', { id, quantity });
        if (data.success) {
            toast.success(data.message);
        }
    }

    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (
        <>
            {watch && (
                <div className='mt-4 mb-4 w-full px-2 md:px-20'>
                    <div className='bg-white p-2 py-4'>
                        <div className='flex'>
                            <div className='grow flex items-center pr-2 md:pr-0 justify-center'>
                                <img src={watch.image} className='md:w-64 md:h-64 w-48 h-48 rounded-lg' />
                            </div>
                            <div className='grow flex flex-col justify-around'>
                                <div>
                                    <h1 className='text-lg md:text-2xl font-semibold'>{watch.name}</h1>
                                    <p className='text-sm text-gray-400'>{watch.gender}</p>
                                </div>
                                <h4 className='font-semibold text-lg'>${price}</h4>
                                <div className='flex gap-3'>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <div className='flex gap-1'>
                                        <button onClick={handleDecrement} className='flex items-center justify-center px-2 rounded-md text-lg bg-gray-200'><span>-</span></button>
                                        <input type='text' value={quantity} readOnly className='bg-gray-200 max-w-[50px] text-center border-2 rounded-lg' defaultValue={1} />
                                        <button onClick={handleIncrement} className='flex items-center justify-center px-2 rounded-md text-lg bg-gray-200'><span>+</span></button>
                                    </div>
                                </div>
                                <button onClick={handleAddToCart} className='px-3 py-2 bg-black text-white rounded-lg'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-4 mb-4 px-2 md:px-20'>
                <div className='bg-white p-2 py-4'>
                    <h1 className='text-xl font-semibold'>You may also like</h1>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                        {recommended && (
                            recommended.map(watch => (
                                <Card key={watch._id} watch={watch} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleWatchpage