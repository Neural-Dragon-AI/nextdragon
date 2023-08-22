import { getSession } from "@/actions/serverCookies"
import { redirect } from "next/navigation";


export default async function Home() {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}
	else {
		redirect("/dashboard/start");
	}

}
