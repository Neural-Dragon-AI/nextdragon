import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'

import { redirect } from "next/navigation";


export default async function Working_Memory() {

	const supabase = _createServerComponentClient();
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const stash_mapping = await unstable_cache(

		async () => {
			const { data: stash } = await supabase.from('profiles').select('stash_mapping')
			return stash
		},
		['stash_mapping'],
		{
			tags: ['stash_mapping'],
			revalidate: 1,
		}
	)()


	return (


		<section className="w-full h-full  overflow-auto  rounded-md p-1">
			<div className="border-white/[.3] border-r-2  h-full w-full ">
			</div>
		</section>

	)
}
