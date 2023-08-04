import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Dashboard() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/login");
	}


	return (
		<main className="h-screen w-screen bg-black m-0 p-0 flex flex-col justify-center items-center text-emerald-600">
			<div>{session.user.email}</div>
			<div>{session.user.role}</div>
			<div>{session.user.email}</div>

			<div>{session.user.email}</div>
		</main>
	)
}
