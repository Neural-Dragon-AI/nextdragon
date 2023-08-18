"use server"
import { _createServerComponentClient } from "./serverCookies"
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateUser(e: FormData) {


	const username = e.get("username")?.toString()
	const openaiApiKey = e.get("apikey")?.toString()
	const id = e.get("id")?.toString()
	console.log(username, openaiApiKey, id)
	const supabase = _createServerComponentClient()
	await supabase.from('profiles').update({ username: username, openaiApiKey: openaiApiKey }).match({ id: id })
	revalidateTag('account')
	console.log("user updated")
}


export async function updateProfileImage(e: FormData) {

	const file = e.get("avatar")
	if (!file) return;

	const id = e.get("id")
	const supabase = _createServerComponentClient()
	const updateTime = Date.now()
	await supabase.from('profiles').update({ avatarUrl: updateTime }).match({ id: id })
	const filePath = `${id}/${updateTime}.jpg`;

	if (file) {
		let { error: uploadError } = await supabase.storage.from('avatars')
			.upload(filePath, file, {
				cacheControl: '0',
				upsert: true
			});
		if (uploadError) {
			console.error('Errore durante l\'upload:', uploadError);
		} else {
			console.log('Caricamento completato');
			revalidateTag('account')
		}
	}
};


