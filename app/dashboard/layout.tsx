import { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Profile } from "@/store/NextStore"
import { _createServerComponentClient } from "@/actions/serverCookies";


export default async function Layout(props: {
	children: React.ReactNode
	stash: React.ReactNode
	working_memory: React.ReactNode

}) {


	const supabase = _createServerComponentClient();
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const profiles = await unstable_cache(

		async () => {
			const profiles = await supabase.from('profiles').select('*')
			return profiles
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 3600,
		}
	)()

	const profile: Profile = profiles.data ? profiles.data[0] : null
	console.log(profiles)


	return (
		<div className="h-full w-full bg-transparent m-0 p-0 z-0 justify-between items-center overflow-y-auto   ">

			<section className="grid grid-cols-4 gap-0 h-full">



				<div className="w-full rounded-md h-full overflow-y-auto p-1">
					{props.stash}
				</div>



				<div className="w-full col-span-2 place-items-center flex flex-col space-y-8 justify-end">
					<div className="w-full h-8   flex justify-start flex-row">
						<Navbar profile={profile} />
					</div>



					<div className=" h-full w-[90%]">
						{props.children}
					</div>
				</div>




				<div className="  w-full rounded-md h-full overflow-y-auto flex flex-row justify-between ">
					{props.working_memory}
				</div>



			</section>
		</div>
	)
}
