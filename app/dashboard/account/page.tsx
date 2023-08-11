import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingsForm from "./settingsForm"


interface Profile {
	id: number;
	username: string;
  openaiApiKey: string;
}


export default async function Account() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await supabase
		.from('profiles')
		.select('id, username');

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<div className="w-1/2 h-3/4 text-black flex flex-col border-2 border-offset-0 border-emerald-600 bg-gray-700 rounded-md font-proxima">
			<div className="place-self-center text-3xl p-4 text-emerald-600">{profile.username}</div>
			<SettingsForm id={profile.id} />
		</div>
	)
}
