import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { redirect } from "next/navigation";
import { Tree } from './components/tree/Tree'

export default async function Dashboard() {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	return (


			<section className="w-[20%] bg-transparent overflow-auto  rounded-md p-2">
				<Tree  />
			</section>

	)
}
