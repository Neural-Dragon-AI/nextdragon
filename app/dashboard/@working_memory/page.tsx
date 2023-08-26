import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { WorkingEditor } from './components/workingEditor'
import { redirect } from "next/navigation";


export default async function Working_Memory() {

	const supabase = _createServerComponentClient();
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}




	return (


		<section className="w-[90%] h-full  overflow-auto  rounded-md mr-2 pb-3 justify-end flex flex-col">
			<WorkingEditor />
		</section>

	)
}
