"use server"
import { _createServerComponentClient, getSession } from "./serverCookies"
import { revalidateTag } from 'next/cache'
import { redirect } from "next/navigation";
import { Message } from "@/store/NextStore"

interface UpdateWorkingMemoryProps {
	working_data: any
	id: string

}

export async function updateWorkingMemory({
	working_data,
	id
}: UpdateWorkingMemoryProps) {
	const supabase = _createServerComponentClient()
	await supabase.from('profiles').update({ working_memory: working_data }).match({ id: id })
	revalidateTag('working_data')
	redirect('')
}

export async function revalidateWorkingMemory() {
	revalidateTag('working_data')
	redirect('')
}




