import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getSession } from "@/actions/serverCookies";
import { redirect } from "next/navigation";
import Uploads from "./uploads"
import { unstable_cache } from 'next/cache'
import { Profile } from "@/store/NextStore"



export default async function Home() {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}
	console.log("TOKEN",session.user.id)


	return (
		<div className=" w-full h-[98%]  flex flex-row place-items-center justify-center rounded-md space-y-5  font-proxima text-white">
			<Uploads id={session.user.id} />
		</div>
	)
}
