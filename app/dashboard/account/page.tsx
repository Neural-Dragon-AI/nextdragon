import { _createServerComponentClient } from "../../actions/serverCookies";
import { getSession } from "../../actions/serverCookies";
import { redirect } from "next/navigation";
import SettingsForm from "./settingsForm"
import { unstable_cache } from 'next/cache'

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
}



export default async function Account() {


	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('id,username,openaiApiKey')
			return data
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 1,
		}
	)()

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<>
			<SettingsForm profile={profile} />
		</>
	)
}
