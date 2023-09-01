'use client'
import { useNextStore, Message } from '@/store/NextStore';
import { useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';
import { createClient } from "@supabase/supabase-js"
import { unstable_cache } from "next/cache"


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
				setActiveIndex(0);
				// Fai altre cose con i dati se necessario
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
			<section className=" h-[5%] border-2  border-y-white/[.3] shadow-lg shadow-emerald-900/50 border-x-white/[.1] rounded-md flex flex-row justify-between place-items-center p-2">
				<button className="flex flex-row w-[15%] text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] rounded-md p-0.5" onClick={() => console.log("h")}>
					AddAll
				</button>
			</section>
			<section className="h-fit w-full     p-0 cursor-pointer">
				{conversation.map((message, index) => (
					<section key={index}>
						<div
							onClick={() => setActiveIndex(index)}
							onDoubleClick={() => {
								pushToWorkConversations(active_work_conversation, [message]);
							}}
							className={`rounded-md font-proxima font-medium p-1 grid grid-cols-8 ${index === activeIndex
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
