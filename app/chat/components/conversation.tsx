'use client'


import { Virtuoso } from 'react-virtuoso';
import { UserMessage, BabyDragonMessage } from './message_parser';

import { useRef } from 'react'


interface Message {
	role: string
	content: string
	timestamp: number
	tokens_count: number
}

interface Conversation {
	conversation: Message[]
}

export const Conversation: React.FC<Conversation> = ({ conversation }) => {
	/* 	const chat = useChatStore((state) => state.chats.find((chat) => chat.instancekey === instancekey)); */
	/* const thisconversation = chat?.conversation || []; */
	const virtuosoRef = useRef(null);

	const scrollToBottom = () => {
		if (virtuosoRef.current) {
			//@ts-ignore
			virtuosoRef.current.scrollToIndex({ index: conversation.length - 1, align: 'end', behavior: 'smooth' });
		}
	};
	return (
		<>
			<section className="flex w-[60%] h-full flex-col justify-end items-center ">




				{/* MESSAGES */}

				<section className="relative h-full w-full overflow-y-auto   p-0 selection:bg-[#eaeda6] selection:text-[black] ">
					<button onClick={scrollToBottom} className="cursor-pointer z-10 absolute right-2 bottom-2 w-6 h-6 opacity-50 hover:opacity-100 ">
						{/* <img src="arrowdown.svg" /> */}
						@
					</button>

					<Virtuoso
						ref={virtuosoRef}
						alignToBottom={true}
						data={conversation}
						followOutput={'smooth'}
						itemContent={(index, message) => {
							if (message.role == 'user') {
								return (
									<UserMessage content={message.content} index={index} key={index} />
								)
							} else if (message.role == 'assistant') {
								return (
									<BabyDragonMessage

										content={message.content}
										status='correct'
										index={index}

									/>

								)
							}

							// Return a default element if none of the previous conditions are satisfied
							return null;
						}}
					/>
				</section>

				{/* TEXT AREA */}

				<div className=" flex w-full h-auto   flex-row  place-items-center justify-center	space-x-2 overflow-hidden rounded-md bg-gray-900 p-2 text-gray-400 mt-2 ">
					<div className="relative w-full grow h-full  ">

						<textarea
							/* onKeyDown={handleEnter} */
							/* ref={prompt_area}  */
							/* name="prompt"  */
							required
							/* value={prompt}  */
							/* onChange={(event) => setPrompt(event.target.value)} */
							className="peer  max-h-[30vh] w-full resize-none border-none  bg-black/[.1] rounded-md pb-1  outline-none focus:ring-0"
						/>

						<label className="absolute left-4 top-4 pointer-events-none  text-sm  duration-300 peer-valid:opacity-0 peer-focus:opacity-0">
							Select the knowledge base then enter your prompt here.
						</label>

					</div>


					<button
						/* 						onClick={getReply} */
						className=" h-full w-[5%] -rotate-45   text-2xl outline-none hover:font-bold hover:text-3xl "
					>
						➤
					</button>
				</div>

			</section>
		</>
	)
}


