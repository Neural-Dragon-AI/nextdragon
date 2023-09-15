import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { redirect } from "next/navigation";


export default async function Dashboard() {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const response = await fetch(`http://127.0.0.1:8000/stashMapping/${session.user.id}`, {
		next: { tags: ['stash_mapping'] },
	});

	const mapping = await response.json();
	if (mapping.length == 0) {
		redirect('/dashboard/upload');
	}
	else {
		redirect('/dashboard/info');
	}

}
