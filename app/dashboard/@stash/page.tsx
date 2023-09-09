import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { Tree } from './components/tree/Tree'
import { redirect } from "next/navigation";
import StashBar from './components/stashBar'
import { Profile } from '@/store/NextStore'

export default async function Stash() {

	const supabase = _createServerComponentClient();
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('*')
			return data
		},
		['stash_mapping'],
		{
			tags: ['stash_mapping'],
			revalidate: 1,
		}
	)()

	const profile: Profile | any = data.data ? data.data[0] : null


	return (


		<section className="relative w-full h-full  overflow-x-auto  ">
			<section className=" w-[24%] fixed top-2 z-20 shadow-xl  shadow-black">
				<StashBar id={profile.id} />
			</section>
			<section className="w-full h-[75%] absolute top-20 ">
				{profile.stash_mapping ? <Tree stash_mapping={profile.stash_mapping} /> : null}
			</section>
		</section>

	)
}
