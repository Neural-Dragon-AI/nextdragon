import Navbar from "./Navbar"
import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
}


export default async function Dashboard() {
	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('id,username,openaiApiKey,avatarUrl')
			return data
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 3600,
		}
	)()

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<>
			<Navbar profile={profile} />
		</>
	)
}
