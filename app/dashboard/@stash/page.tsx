import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { Tree } from './components/tree/Tree'
import { redirect } from "next/navigation";
import StashBar from './components/stashBar'

export default async function Stash() {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const response = await fetch(`http://127.0.0.1:8000/stashMapping/${session.user.id}`, {
		next: { tags: ['stash_mapping'] },


	});

	const stash_mapping = await response.json();

	return (


		<section className="relative w-full h-full  overflow-x-auto  ">
			<section className=" w-[24%] fixed top-2 z-20 shadow-xl  shadow-black">
				<StashBar id={session.user.id} />
			</section>
			<section className="w-full h-[75%] absolute top-20 ">
				{stash_mapping ? <Tree stash_mapping={stash_mapping} /> : null}
			</section>
		</section>

	)
}
