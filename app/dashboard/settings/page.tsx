import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingsForm from "./settingsForm"
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Profile {
	id: number;
	username: string;
  avatarurl: string;
}


export default async function Dashboard() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/login");
	}

	const { data: profile } = await supabase
		.from<Profile>('profiles')
		.select('id, username');



	return (
		<div className="w-1/2 h-3/4 bg-white text-black">
			{profile[0].username}
			<SettingsForm />
		</div>
	)
}
