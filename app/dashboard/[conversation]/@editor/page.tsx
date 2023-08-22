import { createClient } from "@supabase/supabase-js"
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { MessageEditor } from './components/messageEditor'
import { WorkingMemory } from './components/workingMemory'
import { Conversation } from "@/store/NextStore"


export default async function Editor({ params }: { params: { conversation: string } }) {



	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})





	const {data: conv} = await supabase.from(params.conversation).select('*').order('timestamp', { ascending: true })
	console.log(conv)



	return (
		<div className="bg-red-200 w-full h-full flex flex-row justify-evenly">
			{conv? <MessageEditor conversation={conv} /> : <MessageEditor conversation={[]} />} 
			<WorkingMemory />
		</div>
	)
}
