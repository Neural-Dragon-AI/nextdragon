import Modal from '../../components/modal/Modal'
import SettingsForm from '../../account/settingsForm'
import { _createServerComponentClient } from "../../../utils/serverCookies";
import { getSession } from "../../../utils/serverCookies";

import { redirect } from "next/navigation";

interface Profile {
	id: number;
	username: string;
  openaiApiKey: string;
}

export default async function AccountModal() {
	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await supabase
		.from('profiles')
		.select('id, username, openaiApiKey');

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<Modal>
			<SettingsForm profile={profile} />
		</Modal>
	)
}
