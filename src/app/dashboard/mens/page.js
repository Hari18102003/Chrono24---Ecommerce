"use client";
import Card from '@/components/layouts/landing/Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Menspage = () => {

    const [watches, setWatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedWatches, setSearchedWatches] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');

    const session = useSession();
    const { status } = session;

    useEffect(() => {
        async function getWatch() {
            const { data } = await axios.get("/api/get/watches");
            setWatches(data.watches);
        }
        getWatch();
    }, []);

    const mensWatches = watches.filter(watch => watch.gender.toString() === "Men");

    useEffect(() => {
        if (mensWatches.length > 0) {
            const filters = mensWatches.filter(watch => watch.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchedWatches(filters);
        }
        if (searchedWatches.length < 0) {
            setSearchedWatches(mensWatches);
        }
    }, [searchTerm, watches]);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFilter = (event) => {
        event.preventDefault();
        if (selectedOption === "below100") {
            const b100filter = mensWatches?.filter(watch => parseFloat(watch.price) < 100.0);
            if (b100filter.length > 0) {
                setSearchedWatches(b100filter);
            }
            else {
                setSearchedWatches(mensWatches);
            }
        } else if (selectedOption === "100to300") {
            const b100filter = mensWatches?.filter(watch => parseFloat(watch.price) > 100.0 && parseFloat(watch.price) < 300.0);
            if (b100filter.length > 0) {
                setSearchedWatches(b100filter);
            }
            else {
                setSearchedWatches(mensWatches);
            }
        } else if (selectedOption === "above300") {
            const b100filter = mensWatches?.filter(watch => parseFloat(watch.price) > 300.0);
            if (b100filter.length > 0) {
                setSearchedWatches(b100filter);
            }
            else {
                setSearchedWatches(mensWatches);
            }

        }
        else if (selectedOption === "all") {
            setSearchedWatches(mensWatches);
        }
    };

    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (
        <div className='mt-4 px-5'>
            <div className='bg-white p-2'>
                <h1 className='text-center font-bold text-xl my-3'>For Mens</h1>
                <div className='md:flex md:items-center md:justify-between mb-3'>
                    <input type='search' placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border-2 p-2 mb-2 md:mb-0 shadow-md' />
                    <div>
                        <form className='shadow-md p-2 md:flex md:gap-5 md:items-center' onSubmit={handleFilter}>
                            <h1 className='font-semibold'>Filter By:</h1>
                            <label className='text-sm flex items-center gap-1'>
                                <input type="radio" name="price" value="below100" onChange={handleRadioChange} checked={selectedOption === "below100"} /> Below $100
                            </label>

                            <label className='text-sm flex items-center gap-1'>
                                <input type="radio" name="price" value="100to300" onChange={handleRadioChange} checked={selectedOption === "100to300"} /> $100 - $300
                            </label>

                            <label className='text-sm flex items-center gap-1'>
                                <input type="radio" name="price" value="above300" onChange={handleRadioChange} checked={selectedOption === "above300"} /> Above $300
                            </label>
                            <label className='text-sm flex items-center gap-1'>
                                <input type="radio" name="price" value="all" onChange={handleRadioChange} checked={selectedOption === "all"} />All
                            </label>
                            <button type='submit' className='px-2 py-1 rounded-lg bg-black text-white'>apply</button>
                        </form>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
                    {searchedWatches.length > 0 && (
                        searchedWatches.map(watch => (
                            <Card key={watch._id} watch={watch} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menspage