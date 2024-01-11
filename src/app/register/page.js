"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const Registerpage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState("");
    const [error, setError] = useState("");

    const session = useSession();
    const { status } = session;

    async function handleSubmit(e) {
        e.preventDefault();
        setCreating(true);
        setError("");
        setCreated("");
        const { data } = await axios.post("/api/register", { email, password });
        if (data.success) {
            setCreating(false);
            setCreated(data.message);
            setEmail("");
            setPassword("");
        }
        else {
            setError(data.message);
            setCreating(false);
            setPassword("");
        }
        console.log(data);
    }

    if (status === "authenticated") {
        redirect("/dashboard");
    }

    return (

        <div className='my-20'>
            <form className="max-w-xs md:max-w-lg rounded-sm mx-auto bg-white p-5" onSubmit={handleSubmit} >
                <h1 className='text-center font-semibold my-5 text-lg'>Create Account</h1>
                {error && <p className='text-center py-2 mb-5 bg-red-200 border-2 border-red-400'>{error}</p>}
                {created && <p className='text-center py-2 mb-5 bg-green-200 border-2 border-green-400'>{created}</p>}
                {creating && <p className='text-center py-2 mb-5 bg-gray-200 border-2 border-gray-400'>{creating}</p>}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" />
                </div>
                <p className='mb-3 text-gray-500 text-center'>Existing Account? <Link className='font-semibold text-black' href={"/login"}>Login</Link></p>
                <button type="submit" disabled={creating} className="text-white disabled:bg-gray-500 bg-black min-w-full focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign up</button>
            </form>
        </div>


    )
}

export default Registerpage