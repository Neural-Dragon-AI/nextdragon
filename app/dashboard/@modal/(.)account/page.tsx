import Modal from '@/components/modal/Modal'
import SettingsForm from './settingsForm'
import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Profile } from "@/store/NextStore"


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

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<Modal>
			<SettingsForm profile={profile} />
		</Modal>
	)
}
