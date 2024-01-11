"use client";
import React from 'react'

import Carousel from '@/components/dashboard/carousel/Carousel';
import Mens from '@/components/layouts/landing/Mens';
import Womens from '@/components/layouts/landing/Womens';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboardpage = () => {

    const session = useSession();
    const { status } = session;

    if (status === "unauthenticated") {
        redirect("/login");
    }

    return (
        <div className='mt-4 px-5 flex flex-col gap-5'>
            <div>
                <Carousel />
            </div>
            <div>
                <Mens />
            </div>
            <div className='mb-5'>
                <Womens />
            </div>
        </div>
    )
}

export default Dashboardpage