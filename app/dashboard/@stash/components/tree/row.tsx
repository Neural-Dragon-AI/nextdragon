'use client'
import { useNextStore, Message } from '@/store/NextStore';
import { useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso';



interface RowProps {
	conversation_id: string
}

export const Row: React.FC<RowProps> = ({ conversation_id }) => {



	const setActiveChat = useNextStore(state => state.setActiveChat)

	const fetchConversation = useNextStore(state => state.fetchConversation)
	const current_conversation = useNextStore(state => state.current_conversation)

	const setActiveIndex = useNextStore(state => state.setActiveIndex)
	const activeIndex = useNextStore(state => state.active_index)

	const pushToWorkConversations = useNextStore(state => state.pushToWorkConversation)
	const active_work_conversation = useNextStore(state => state.active_work_conversation)



	useEffect(() => {

		fetchConversation(conversation_id)
		setActiveIndex(0)
		console.log(current_conversation)

	}, [])

	return (
		current_conversation.length > 0 ? <section className=" h-full fixed left-0 top-0 w-[22%] ml-4 mt-1  bg-black rounded-md">
			<section className=" h-[5%] border-2  border-y-white/[.3] shadow-lg shadow-emerald-900/50 border-x-white/[.1] rounded-md flex flex-row justify-between place-items-center p-2">

				<button className="flex flex-row w-[15%] text-xs justify-evenly cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] rounded-md p-0.5" onClick={() => console.log("h")}>
					AddAll
				</button>



				<button className=" h-5 w-5  right-2 text-red-200 text-bold" onClick={() => setActiveChat('')}>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#ffffff" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				</button>


			</section>

			<section className="absolute top-14 h-full w-full overflow-y-aut0    p-0 cursor-pointer">
				<Virtuoso
					alignToBottom={true}
					data={current_conversation}
					followOutput={'smooth'}
					itemContent={(index, message) => {
						return (<section>
							<div
								key={index}
								onClick={() => setActiveIndex(index)}
								onDoubleClick={() => {
									pushToWorkConversations(active_work_conversation, [message])
								}}

								className={`rounded-md  font-proxima font-medium p-2  grid grid-cols-8 ${index === activeIndex ? 'bg-white/[.7] text-black' : message.role === 'assistant' ? 'bg-emerald-300/[.3] text-white/[.7]' : 'border-2 border-white/[.2] bg-white/[.0] text-gray-400'}`}>
								<p className="w-full break-all col-span-2 ">{message.role}</p>
								<p className="h-full truncate col-span-6 col-start-3 ">{message.content}</p>
							</div>
							<div className="w-full bg-transparent h-1" />
						</section >
						)
					}}
				/>
			</section>
		</section>
			: null

	)
}
