import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Conversation } from "./components/conversation"
import { IndexQuery } from "./components/indexquery"
import { BabyDragonActions } from "./components/bdactions"
import { createClient } from "@supabase/supabase-js"

export default async function Chat() {

	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('conversazione2').select('*').order('timestamp', { ascending: true })
			return data
		},
		['conversazione'],
		{
			tags: ['conversazione'],
			revalidate: 1,
		}
	)()

	return (
		<>
			<section className="flex flex-row justify-between  w-[99.5%] h-[99%] ">
				<BabyDragonActions />
				<Conversation conversation={data.data} />
				<IndexQuery />
			</section>
		</>
	)
}


