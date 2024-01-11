"use client";
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import axios from 'axios';
import Link from 'next/link';

const Carousel = () => {

    const [watches, setWatches] = useState([]);

    useEffect(() => {
        async function getWatch() {
            const { data } = await axios.get("/api/get/watches");
            setWatches(data.watches.slice(0, 2));
        }
        getWatch();
    }, []);

    return (
        <>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper rounded-md bg-white text-black"
            >
                {watches && (
                    watches.map(watch => (

                        <SwiperSlide key={watch._id}>
                            <Link href={`/dashboard/watch/${watch._id}`}>
                                <div className='grid grid-cols-1 md:grid-cols-2 pb-5 md:pb-0'>
                                    <div>
                                        <img className='w-full h-[300px] md:h-[600px]' src={watch.image} />
                                    </div>
                                    <div className='flex pt-5 md:pt-0 flex-col gap-2 md:gap-5 items-center justify-center'>
                                        <h4 className='text-lg'>New Release</h4>
                                        <h1 className='text-lg md:text-3xl font-bold'>{watch.name}</h1>
                                        <p>For {watch.gender}</p>
                                        <h5 className='font-semibold text-xl'>Exclusively for ${watch.price}</h5>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>

                    ))
                )}
            </Swiper >
        </>

    )
}

export default Carousel