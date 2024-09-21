import EventPage from "@/components/EventPage";
import { Id } from "../../../../convex/_generated/dataModel";
import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs/server";


const Page = async ({ params }: { params: { events: Id<"events"> } }) => {
  const user  = await currentUser()
  // console.log(user?.id)
  return (
    <EventPage params={params} userId={user?.id || ""} />
  );
};

export default Page;
