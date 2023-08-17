"use server"
import { _createServerComponentClient } from "./serverCookies"
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateUser(e: FormData) {

	revalidateTag('account')
	const username = e.get("username")?.toString()
	const openaiApiKey = e.get("apikey")?.toString()
	const id = e.get("id")?.toString()
	console.log(username, openaiApiKey, id)
	const supabase = _createServerComponentClient()
	await supabase.from('profiles').update({ username: username, openaiApiKey: openaiApiKey }).match({ id: id })
	console.log("user updated")
}
