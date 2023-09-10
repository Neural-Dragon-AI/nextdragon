'use client'
import { useNextStore, Message } from '@/store/NextStore';
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GetMessages } from "@/actions/stash_actions"

interface RowProps {
	conversation_id: string
	conversation_name: string

}

export const Row: React.FC<RowProps> = ({ conversation_id, conversation_name }) => {

	const [conversation, setConversation] = useState<Message[]>([])


	const fetch_data = async (): Promise<Message[] | null> => {
		const formData = new FormData()
		formData.append("user_id", "6e1abc64-09f6-4950-9cea-fd425006e1b3")
		formData.append("conversation_id", conversation_id)
		try {
			const data: Message[] | null = await GetMessages(formData)
			return data;
		} catch (e) {
			console.error("Errore durante il fetch dei dati:", e);
			return null
		}

	};

	useEffect(() => {
		const fetchDataAndUpdateState = async () => {
			const data = await fetch_data();
			if (data) {
				setConversation(data);
			}
		};
		fetchDataAndUpdateState();
	}, []);

	const setActiveIndex = useNextStore(state => state.setActiveIndex)
	const activeIndex = useNextStore(state => state.active_index)




	const setFileOpen = useNextStore(state => state.setFileOpen)
	const pushToWorkConversations = useNextStore(state => state.pushToWorkConversation)
	const active_work_conversation = useNextStore(state => state.active_work_conversation)

	useEffect(() => {
		!useNextStore.persist.hasHydrated() ? useNextStore.persist.rehydrate() : null
	}, [])

	return (
		<>
			{
				conversation.length > 0 ? <div className="bg-black">
					<section className=" h-[5%] border-2  border-y-white/[.3] shadow-lg shadow-emerald-900/50 border-x-white/[.1] rounded-md flex flex-row space-x-5 justify-start place-items-center p-2">
						<div
							onClick={() => setFileOpen(conversation_id.replace(/\s/g, "").toLowerCase(), false)}
							className="proxima text-emerald-400 text-sm cursor-pointer hover:text-white">{conversation_name}</div>
						<Link
							onClick={() => setActiveIndex(conversation_id.replace(/\s/g, "").toLowerCase(), 0)}
							className="text-white" href={`/dashboard/${conversation_id.replace(/\s/g, "").toLowerCase()}`}>
							<svg className="h-4 w-4 hover:brightness-150 fill-emerald-400 active:fill-white" version="1.1" id="_x32_" viewBox="0 0 512 512" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">  <g> <path className="st0" d="M96,0v416h416V0H96z M472,376H136V40h336V376z"></path> <polygon className="st0" points="40,472 40,296 40,136 40,96 0,96 0,512 416,512 416,472 376,472 "></polygon>
									<polygon className="st0" points="232.812,312.829 350.671,194.969 350.671,279.766 390.671,279.766 390.671,126.688 237.594,126.688 237.594,166.688 322.39,166.688 204.531,284.547 "></polygon> </g> </g></svg>
						</Link>
						<button className="flex flex-row w-[15%] text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-150  rounded-md p-0.5" onClick={() => console.log("h")}>
							AddAll
						</button>
					</section>
					<section className="h-fit w-full     p-0 cursor-pointer">
						{conversation.map((message, index) => (
							<section className="scale-100 transition-all opacity-100" key={index}>
								<div
									onClick={() => setActiveIndex(conversation_id.replace(/\s/g, "").toLowerCase(), index)}
									onDoubleClick={() => {
										pushToWorkConversations(active_work_conversation, [message]);
									}}
									className={`rounded-md font-proxima font-medium p-1 grid grid-cols-8 ${index === activeIndex[conversation_id.replace(/\s/g, "").toLowerCase()]
										? "bg-white/[.7] text-black"
										: message.role === "assistant"
											? "bg-emerald-300/[.3] text-white/[.7]"
											: "border-2 border-white/[.2] bg-white/[.0] text-gray-400"
										}`}
								>
									<p className="w-full break-all col-span-2">{message.role}</p>
									<p className="h-full truncate col-span-6 col-start-3">
										{message.content}
									</p>
								</div>

							</section>
						))}
					</section>
				</div>


					: <AnimatePresence>
						<section className="h-full relative pb-2">
							<button
								className="absolute top-0 left-0 w-fit flex flex-row items-center truncate rounded-md p-0.5 text-white"
							>
								<motion.div
									key={conversation_id.replace(/\s/g, "")}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 2 }}
									className="h-fit text-sm mt-0 p-0 cursor-none text-gray-300/[.5]"
								>
									{conversation_id} is empty
								</motion.div>
							</button>
						</section>
					</AnimatePresence>
			}


		</>)
}
