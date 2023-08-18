import Modal from '@/components/modal/Modal'
import SettingsForm from '../../account/settingsForm'
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


export default async function AccountModal() {
	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('*')
			return data
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 3600,
		}
	)()
	console.log("THE DATA ARE", data)
	const profile: Profile | any = data.data ? data.data[0] : null
	console.log("THE PROFILE IS IN MODAL", profile)
	return (
		<Modal>
			<SettingsForm profile={profile} />
		</Modal>
	)
}
