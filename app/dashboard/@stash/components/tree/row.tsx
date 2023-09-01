'use client'
import { useNextStore, Message } from '@/store/NextStore';
import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js"
import Link from 'next/link'

interface RowProps {
	conversation_id: string
}

export const Row: React.FC<RowProps> = ({ conversation_id }) => {

	const [conversation, setConversation] = useState<Message[]>([])

	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
		db: { schema: "conversations" }
	})

	const fetch_data = async (): Promise<Message[] | null> => {
		let conversazione: Message[] | null = null;
		try {
			const { data, error }: {
				data: Message[] | null; error: any
			} = await supabase
				.from(conversation_id.replace(/\s/g, "").toLowerCase())
				.select('*')
				.order('timestamp', { ascending: true });
			if (error) {
				throw error;
			}
			conversazione = data;
		} catch (e) {
			console.error("Errore durante il fetch dei dati:", e);
		}
		return conversazione;
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
	const pushToWorkConversations = useNextStore(state => state.pushToWorkConversation)
	const active_work_conversation = useNextStore(state => state.active_work_conversation)

	useEffect(() => {
		!useNextStore.persist.hasHydrated() ? useNextStore.persist.rehydrate() : null
	}, [])

	return (
		<section className="w-full h-full  rounded-md">
			{conversation.length > 0 ? <section className=" h-[5%] border-2  border-y-white/[.3] shadow-lg shadow-emerald-900/50 border-x-white/[.1] rounded-md flex flex-row justify-start place-items-center p-2">
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
			</section> : null}
			<section className="h-fit w-full     p-0 cursor-pointer">
				{conversation.map((message, index) => (
					<section key={index}>
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
		</section>
	)
}
