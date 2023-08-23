'use client'

import { Conversation } from "@/store/NextStore"
import { Virtuoso } from 'react-virtuoso';
export const MessageEditor: React.FC<Conversation> = ({ conversation }) => {

	if (conversation.length > 0) {

		try {
			return (
				<>
					<div className="w-[60%]  rounded-md px-2 ">
						<div className="h-[8%] bg-white/[.1] w-full rounded-md mb-2"></div>
						<section className="relative h-[90%] w-full overflow-y-auto   p-0 selection:bg-[#eaeda6] selection:text-[black] ">
							<Virtuoso
								alignToBottom={true}
								data={conversation}
								followOutput={'smooth'}
								itemContent={(index, message) => {
									if (message.role == 'user') {
										return (
											<div key={index} className='rounded-md  font-proxima font-medium p-2 text-gray-400'>
												<p className="w-full break-all ">{message.content}</p>
												<div className="w-full bg-transparent h-2" />
											</div>
										)
									} else if (message.role == 'assistant') {
										return (
											<div key={index} className=' rounded-md  font-proxima font-medium p-2 text-gray-400'>
												<p className="w-full break-all ">{message.content}</p>
												<div className="w-full bg-transparent h-2" />
											</div>
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


