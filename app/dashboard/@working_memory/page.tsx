import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { WorkingEditor } from './components/workingEditor'
import { redirect } from "next/navigation";
import { Message } from "@/store/NextStore"


interface WorkingObject {

	name: string,
	messages: Message[]
}

interface WorkingMemory {

	working_memory: WorkingObject[]
	id: string
}


export default async function Working_Memory() {

	const supabase = _createServerComponentClient();
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const memory = await unstable_cache(

		async () => {
			const memory = await supabase.from('profiles').select('id, working_memory')
			return memory
		},
		['working_data'],
		{
			tags: ['working_data'],
			revalidate: 3600,
		}
	)()

	const working_memory: WorkingMemory | null = memory.data ? memory.data[0] : null
	console.log("DATA SOURCE", working_memory)
	return (


		<section className="w-[90%] h-full  overflow-auto  rounded-md mr-2 pb-0 justify-end flex flex-col">
			{working_memory ? <WorkingEditor  id={working_memory.id} /> : <WorkingEditor id={''}  />}
		</section>

	)
}
