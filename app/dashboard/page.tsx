import Navbar from "./Navbar"
import { _createServerComponentClient } from "../utils/serverCookies";
import { getSession } from "../utils/serverCookies";

import { redirect } from "next/navigation";
interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
}






export default async function Dashboard() {
	const supabase = _createServerComponentClient();


	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await supabase
		.from('profiles')
		.select('id, username');

	const profile: Profile | any = data.data ? data.data[0] : null

	return (
		<>
			<Navbar id={profile.id} />
		</>
	)
}
