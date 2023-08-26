'use client'

import { Conversation } from "@/store/NextStore"
import { Virtuoso } from 'react-virtuoso';
import { useNextStore } from '@/store/NextStore';
import { useRef, useEffect } from 'react'


export const MessageEditor: React.FC<Conversation> = ({ conversation }) => {
	const activeIndex = useNextStore(state => state.active_index)


	const virtuoso = useRef(null);

	useEffect(() => {
		if (activeIndex !== null && virtuoso.current) {
			//@ts-ignore
			virtuoso.current.scrollToIndex({
				index: activeIndex,
				align: "start",
				behavior: "smooth"
			})
		}

	}, [activeIndex])


	if (conversation.length > 0) {

		try {
			return (
				<>
					<div className="w-full overflow-y-auto  rounded-md relative mb-3  ">
						<div className="absolute top-0 h-16 border-b-[1px]  border-white/[.4]  w-full  mb-10"></div>
						<section className="absolute top-28 h-[90%] w-full overflow-y-auto   p-0 selection:bg-[#eaeda6] selection:text-[black] ">
							<Virtuoso
								/* 								alignToBottom={true} */
								data={conversation}
								ref={virtuoso}
								followOutput={'smooth'}
								itemContent={(index, message) => {
									if (message.role == 'user') {
										return (<section>
											<div key={index} className='bg-white/[.2] rounded-md  font-proxima font-medium p-2 text-gray-400'>
												<p className="w-full break-all ">{message.content}</p>
											</div>
											<div className="w-full bg-transparent h-2" />
										</section >
										)
									} else if (message.role == 'assistant') {
										return (
											<section>
												<div key={index} className='bg-emerald-500/[.2] rounded-md  font-proxima font-medium p-2 text-gray-400'>
													<p className="w-full break-all ">{message.content}</p>
												</div>
												<div className="w-full bg-transparent h-2" />
											</section >
										)
									}
									return null;
								}}
							/>
						</section>
					</div>
				</>
			)

		} catch (error) {
			console.error(error);
			return (
				<>
					<div className="w-[60%] rounded-md p-2 bg-red-500">
						<p className="fonta-proxima text-black text-2xl self-center">
							Error
						</p>
					</div>
				</>
			)
		}
	}
	else {
		return (
			<>
				<div className="w-[60%]  rounded-md p-2 ">

				</div>
			</>
		)



	}

}


