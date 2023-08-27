'use client'
import { Virtuoso } from 'react-virtuoso';
import { useNextStore, Message } from '@/store/NextStore';
import { useRef, useEffect, useState, useTransition } from 'react'
import { revalidateWorkingMemory, updateWorkingMemory } from '@/actions/workingData'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface WorkMemoryObject {
	name: string,
	messages: Message[]

}


interface WorkingEditorProps {
	working_data: WorkMemoryObject[]
}


export const dynamic = "force-fynamic"
export const WorkingEditor: React.FC<WorkingEditorProps> = ({ working_data }) => {

	const virtuoso = useRef(null);

	const replaceAllConversations = useNextStore(state => state.replaceAllWorkConversations)
	const messagesArrays = useNextStore(state => state.work_conversations)
	const active_conv = useNextStore(state => state.active_work_conversation)
	const setActiveConv = useNextStore(state => state.setActiveWorkConversation)
	const currentProfileid = useNextStore(state => state.current_profile_id)


	const [isPending, startTransition] = useTransition()
	const supabase = createClientComponentClient()

	useEffect(() => {
		const channel = supabase.channel('working_memory').on('postgres_changes', {
			event: '*',
			schema: 'public',
			table: 'profiles'
		}, (payload) => {
			const newrow: any = payload.new
			console.log("SUPABASE EVENT", newrow.working_memory)
			startTransition(() => revalidateWorkingMemory())
		}).subscribe()
		return () => {
			supabase.removeChannel(channel)
		}
	})

	const updateWorkConversation = () => {
		console.log("SENDING.....", [{ name: "new", messages: messagesArrays[active_conv], id: currentProfileid }])
		startTransition(() => updateWorkingMemory({ working_data: [{ name: "new", messages: messagesArrays[active_conv] }], id: currentProfileid }))
		startTransition(() => revalidateWorkingMemory())
	}

	const restoreWorkConversation = () => {
		startTransition(() => revalidateWorkingMemory())
	}

	useEffect(() => {
		replaceAllConversations(working_data.map(workMemoryObject => workMemoryObject.messages))
	}, [])

	console.log(messagesArrays[active_conv])


	return (
		<section className="p-1 flex flex-col justify-between space-y-6 h-full  bottom-0  left-0 top-0 w-full    rounded-md">


			<section className=" h-[5%] border-2  border-y-white/[.3] shadow-lg shadow-emerald-800/50 border-x-white/[.1] rounded-md flex flex-row justify-start space-x-1 place-items-center p-2">

				<button className="border-y-2  border-y-white/[.2] flex flex-row w-fit text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5" onClick={() => console.log("h")}>
					SaveAll
				</button>
				<button onClick={() => updateWorkConversation()} className="border-y-2  border-y-white/[.2] flex flex-row w-fit text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5" >
					SaveCurrent
				</button>
				<button onClick={() => restoreWorkConversation()} className="border-y-2  border-y-white/[.2] flex flex-row w-fit text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5">
					Restore
				</button>



			</section>
			<section className="w-full  grid grid-cols-8  h-[4%] bg-gray-600/[.2] border-x-2 border-t-2 border-white/[.2] rounded-t-md text-white">
				<div className="flex flex-row">
					{working_data.map((conv, index) => (
						<button
							key={index}
							className="rounded-md font-proxima font-medium px-1 bg-white/[.2] text-gray-400 cursor-pointer"
							onClick={() => { setActiveConv(index) }}>
							{conv.name}
						</button>
					))}
				</div>
			</section>

			<section className=" h-full w-full overflow-y-auto    p-0 cursor-pointer">
				{working_data.length > 0 ? <Virtuoso
					alignToBottom={true}
					data={messagesArrays[active_conv]}
					ref={virtuoso}
					itemContent={(index, message) => {
						return (<section>
							<div
								key={index}
								className={`rounded-md  font-proxima font-medium p-2  grid grid-cols-8 ${message.role === 'assistant' ? 'bg-emerald-300/[.3] text-white/[.7]' : 'border-2 border-white/[.2] text-white'}`}>
								<p className="w-full break-all col-span-2 ">{message.role}</p>
								<p className="h-full truncate col-span-6 col-start-3 ">{message.content}</p>
							</div>
							<div className="w-full bg-transparent h-1" />
						</section >
						)
					}}
				/> : null}
			</section>




		</section>


	)
}

