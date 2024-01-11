"use client";
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Loginpage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [error, setError] = useState("");

    const session = useSession();
    const { status } = session;

    async function handleSubmit(e) {
        setError("");
        e.preventDefault();
        const res = await signIn("credentials", { email, password, redirect: false });
        if (res.error) {
            setError("Invalid credentials");
        } else {
            setLogin(true);
        }
    }

    if (login) {
        redirect("/dashboard");
    }

    if (status === "authenticated") {
        redirect("/dashboard");
    }

    return (
        <div className='my-20'>
            <form className="max-w-xs md:max-w-lg rounded-sm mx-auto bg-white p-5" onSubmit={handleSubmit} >
                <h1 className='text-center font-semibold my-5 text-lg'>Login</h1>
                {error && <p className='text-center py-2 mb-5 bg-red-200 border-2 border-red-400'>{error}</p>}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" />
                </div>
                <p className='mb-3 text-gray-500 text-center'>New Account? <Link className='font-semibold text-black' href={"/register"}>Sign Up</Link></p>
                <button type="submit" className="text-white disabled:bg-gray-500 bg-black min-w-full focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign up</button>
            </form>
        </div>
    )
}

export default Loginpage