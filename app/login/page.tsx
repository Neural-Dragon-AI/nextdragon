import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Login from './auth';

import { redirect } from 'next/navigation';


export default async function SignIn() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="flex justify-center ">

				<Login />

		</div>
	);
}

