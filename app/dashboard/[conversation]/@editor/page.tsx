import { createClient } from "@supabase/supabase-js"
import { MessageEditor } from './components/messageEditor'
import { WorkingMemory } from './components/workingMemory'
import { Suspense } from 'react'



const EditorSkeleton = () => {
	return (
		<>
			<div className="w-[48%]  rounded-md p-2 bg-blue-200">
				<p className="fonta-proxima text-black text-2xl self-center">
					Loading...
				</p>
			</div>
		</>
	)

}





export default async function Editor({ params }: { params: { conversation: string } }) {

	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})

	const { data: conv } = await supabase.from(params.conversation).select('*').order('timestamp', { ascending: true })
	console.log(conv)

	return (
		<div className=" w-full h-full flex flex-row justify-evenly">
			{conv ?
				<Suspense fallback={<EditorSkeleton />}>
					<MessageEditor conversation={conv} />
				</Suspense>
				:
				<MessageEditor conversation={[]} />}
			<WorkingMemory />
		</div>
	)
}