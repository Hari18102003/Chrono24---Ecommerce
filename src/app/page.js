"use client";
import Hero from "@/components/layouts/landing/Hero";
import Mens from "@/components/layouts/landing/Mens";
import Womens from "@/components/layouts/landing/Womens";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const session = useSession();
  const { status } = session;

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="m-4 flex flex-col gap-4">
        <Hero />
        <Mens />
        <Womens />
      </div>
    </>
  )
}
