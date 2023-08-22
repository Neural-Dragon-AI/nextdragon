import { _createServerComponentClient } from "@/actions/serverCookies";
import { createClient } from "@supabase/supabase-js"
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Suspense } from 'react'
import { Tree } from './components/tree/Tree'
import { Editor } from './components/messageEditor'
import { WorkingMemory } from './components/workingMemory'
import { Profile } from "@/store/NextStore"






export default async function Dashboard() {


/* 	const _supabase = _createServerComponentClient(); */


	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	/* const data = await unstable_cache( */
	/**/
	/* 	async () => { */
	/* 		const data = await _supabase.from('profiles').select('*') */
	/* 		return data */
	/* 	}, */
	/* 	['account'], */
	/* 	{ */
	/* 		tags: ['account'], */
	/* 		revalidate: 1, */
	/* 	} */
	/* )() */


	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})
	const conv = await unstable_cache(

		async () => {
			const data = await supabase.from('conversazione2').select('*').order('timestamp', { ascending: true })
			return data
		},
		['conv'],
		{
			tags: ['conv'],
			revalidate: 1,
		}
	)()


/* 	const profile: Profile | any = data.data ? data.data[0] : null */

/* 	console.log(conv) */

	return (
		<div className="w-[98%]  rounded-md h-[90%] flex flex-row justify-between">

			<section className="w-[20%] overflow-auto  rounded-md p-2">
				<Tree  />
			</section>
			<Editor conversation={conv.data} />
			<WorkingMemory />
		</div>
	)
}
