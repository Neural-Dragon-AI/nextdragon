import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { Tree } from './components/tree/Tree'
import { redirect } from "next/navigation";


export default async function Stash() {

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


		<section className="w-full h-full  overflow-auto   p-2">
				{stash_mapping ? <Tree stash_mapping={stash_mapping[0].stash_mapping} /> : null}
		</section>

	)
}
