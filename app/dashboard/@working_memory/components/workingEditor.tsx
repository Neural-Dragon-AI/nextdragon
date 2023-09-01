'use client'
import { Virtuoso } from 'react-virtuoso';
import { useNextStore, Message } from '@/store/NextStore';
import { useRef, useEffect, useState, useTransition } from 'react'
import { revalidateWorkingMemory, updateWorkingMemory } from '@/actions/workingData'
import { Options } from "./options"

interface WorkingEditorProps {
	id: string;
}


export const dynamic = "force-fynamic"
export const WorkingEditor: React.FC<WorkingEditorProps> = ({ id }) => {

	const virtuoso = useRef(null);


	const working_memory = useNextStore(state => state.working_memory)
	const active_conv = useNextStore(state => state.active_work_conversation)
	const setActiveConv = useNextStore(state => state.setActiveWorkConversation)


	const [isPending, startTransition] = useTransition()

	const updateWorkConversation = () => {
		console.log("SENDING.....", [{ name: "new", messages: working_memory[active_conv], id: id }])
		startTransition(() => updateWorkingMemory({ working_data: [{ name: "new", messages: working_memory[active_conv] }], id: id }))
	}

	const restoreWorkConversation = () => {
		startTransition(() => revalidateWorkingMemory())
	}

	useEffect(() => {
		!useNextStore.persist.hasHydrated() ? useNextStore.persist.rehydrate() : null
	}, [])



	return (
		<section className="p-1 flex flex-col justify-between space-y-6 h-full  bottom-0  left-0 top-0 w-full    rounded-md">
			<section className="font-proxima    w-full relative">
				<div className="absolute left-0 top-0.5 w-full">
					<Options />
				</div>
				{/* <div className="absolute right-0 top-0.5"   >{working_memory[active_conv].name}</div> */}
				<div className="absolute right-0 top-0.5">
					<section className="group inline-block relative ">
						<div className="rounded-md w-16 h-fit group-hover:text-emerald-400 cursor-pointer text-white font-bold flex flex-row justify-center place-items-center border-2 border-white/[.1]">
							Items
						</div>
						<div className="space-y-3 bg-black absolute border-emerald-50/[.2] border-b-2 border-x-2 rounded-b-md
            right-0 top-0 w-40 transform  mt-0
            px-2 pt-3 pb-2 text-sm scale-y-0 group-hover:scale-y-100 origin-top
            text-black  transition duration-100 
            ease-in-out  font-proxima font-bold shadow-lg  shadow-emerald-800/50 z-30">

							<div className="flex flex-col space-y-1 px-1 pt-0.5 w-full overflow-hidden ">
								{working_memory.map((conv, index) => (
									<button
										key={index}
										className={`w-full h-6  truncate  rounded-md font-proxima font-medium px-1  cursor-pointer ${index === active_conv ? 'bg-emerald-300/[.3] text-white brightness-150 hover:bg-emerald-300/[.5]' : 'text-white/[.7] hover:bg-white/[.5]'}`}
										onClick={() => { setActiveConv(index) }}>
										{conv.name}
									</button>
								))}
							</div>


						</div>
					</section>
				</div>


			</section>


			<section className="h-[95%] w-full overflow-y-auto p-0 ">
				{working_memory.length > 0 ?
					<Virtuoso
						alignToBottom={true}
						data={working_memory[active_conv].content}
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

