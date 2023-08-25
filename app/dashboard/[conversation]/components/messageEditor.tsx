'use client'

import { Conversation } from "@/store/NextStore"
import { Virtuoso } from 'react-virtuoso';
export const MessageEditor: React.FC<Conversation> = ({ conversation }) => {

	if (conversation.length > 0) {

		try {
			return (
				<>
					<div className="w-full overflow-y-auto  rounded-md relative  ">
						<div className="absolute top-0 h-16 border-b-[1px]  border-white/[.4]  w-full  mb-10"></div>
						<section className="absolute top-28 h-[90%] w-full overflow-y-auto   p-0 selection:bg-[#eaeda6] selection:text-[black] ">
							<Virtuoso
								alignToBottom={true}
								data={conversation}
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


