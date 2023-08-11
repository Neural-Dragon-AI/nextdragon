import Navbar from "./Navbar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Profile {
	id: number;
	username: string;
  openaiApiKey: string;
}




export default async function Dashboard() {
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
		<>
			<Navbar id={profile.id}/>
		</>
	)
}
