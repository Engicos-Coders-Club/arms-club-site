'use server'
import { ClientComponent } from "@/components/ClientComponent";
import { auth } from "@clerk/nextjs/server";

const page = () => {
  const {  userId  } = auth()
  console.log(userId + " is the user id")
  if(!userId){
    return <div className="flex items-center justify-center w-full min-h-screen text-5xl text-center">
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