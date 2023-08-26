import { createClient } from "@supabase/supabase-js"
import { MessageEditor } from './components/messageEditor'







export default async function Editor({ params }: { params: { conversation: string } }) {

	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})

	const { data: conv } = await supabase.from(params.conversation).select('*').order('timestamp', { ascending: true })
/* 	console.log(conv) */

	return (
		<div className=" w-full h-full flex flex-row justify-between ">
			{conv ?	<MessageEditor conversation={conv} />	: <MessageEditor conversation={[]} />}
		</div>
	)
}
