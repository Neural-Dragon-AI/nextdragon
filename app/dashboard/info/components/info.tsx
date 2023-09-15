"use client"
import { useEffect, useTransition } from 'react'
import { redirect } from "next/navigation";
import { RevalidateInfo } from "@/actions/stash_actions"


interface InfoProps {
	num_messages: string
	num_conversations: string
}


export const Stats: React.FC<InfoProps> = ({ num_messages, num_conversations }) => {

	const [isPendingInfo, startTransitionInfo] = useTransition()


	useEffect(() => {
		startTransitionInfo(() => RevalidateInfo())
	}, [])





	return (<section className="w-3/4 h-full  flex flex-col space-y-5 justify-start place-items-start pl-20 pt-20 ">
		<p className="text-2xl">Total Messages: &nbsp;&nbsp;{num_messages}</p>
		<p className="text-2xl">Total Conversations: &nbsp;&nbsp;{num_conversations}</p>
	</section>);
};


