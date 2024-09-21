'use server'
import { ClientComponent } from "@/components/ClientComponent";
import { auth } from "@clerk/nextjs/server";

const page = () => {
  const {  userId  } = auth()
  console.log(userId + " is the user id")
  if(!userId){
    return <div className="w-full min-h-screen text-center flex justify-center items-center text-5xl">
      You are not logged in
    </div>
  }
  return (
    <div>
      <ClientComponent userId={userId}/>
    </div>
  )
}

export default page