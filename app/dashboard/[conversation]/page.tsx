import { Navbar } from "./Navbar"
import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Profile } from "@/store/NextStore"


export default async function Dashboard() {
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


	return (
		<>
			<Navbar profile={profile} />
		</>
	)
}
