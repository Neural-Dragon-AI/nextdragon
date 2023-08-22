'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Conversation } from "@/store/NextStore"


export const MessageEditor: React.FC<Conversation> = ({ conversation }) => {

	if (conversation.length > 0) {

		try {
			return (
				<>
					<div className="w-[48%]  rounded-md p-2 bg-blue-200">
						<p className="fonta-proxima text-black text-2xl self-center">
							{conversation[0].content} </p>
					</div>
				</>
			)

		} catch (error) {
			console.error(error);
			return (
				<>
					<div className="w-[48%]  rounded-md p-2 bg-blue-200">
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
				<div className="w-[48%]  rounded-md p-2 bg-blue-200">
					<p className="fonta-proxima text-black text-2xl self-center">
						HELLO!!! </p>
				</div>
			</>
		)



	}

}


