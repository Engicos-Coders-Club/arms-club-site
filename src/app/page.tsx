import Hero from "@/components/Hero";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

async function create(data: string) {
  cookies().set('userId', data)
}

export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div className="w-full h-screen bg-blue-900 sticky z-20 top-0"></div>
    </div>
  );
}
