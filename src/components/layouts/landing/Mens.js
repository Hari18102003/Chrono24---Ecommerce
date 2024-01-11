"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';

const Mens = () => {

    const [watches, setWatches] = useState([]);

    useEffect(() => {
        async function getWatch() {
            const { data } = await axios.get("/api/get/watches");
            setWatches(data.watches);
        }
        getWatch();
    }, []);
    const mensWatches = watches.filter(watch => watch.gender.toString() === "Men").slice(0, 4);

    return (
        <div className='bg-white p-2 rounded-sm'>
            <h1 className='text-center font-semibold text-xl'>Mens</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-5'>
                {mensWatches && (
                    mensWatches.map(watch => (
                        <Card key={watch._id} watch={watch} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Mens