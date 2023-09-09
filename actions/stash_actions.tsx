"use server"
import { _createServerComponentClient } from "./serverCookies"
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from "next/navigation";
import { FileSystemObject } from "@/store/NextStore"
export async function DeleteStash(e: FormData) {

	console.log("Deleting Stash")
	const id = e.get("id")?.toString()
	console.log(id)
	const supabase = _createServerComponentClient()
	await supabase.from('profiles').update({ stash_mapping: [] }).match({ id: id })
	revalidateTag('stash_mapping')
	redirect('')
}


export async function ImportFromUrl(url: string) {

	console.log(url)


	// Prepara i dati da inviare nella richiesta POST
	const payload = {
		url: url,
	};

	// Esegui la richiesta POST
	const response = await fetch("http://127.0.0.1:8000/importFromUrl", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	const staticData = await response.json();
	console.log(staticData)
	/* const supabase = _createServerComponentClient(); */
	/**/
	/**/
	/* const updatedStashMapping = [...existingData, ...staticData]; */
	/**/
	/* // Aggiorna stash_mapping con il nuovo array unito */
	/* const { error: updateError } = await supabase */
	/* 	.from('profiles') */
	/* 	.update({ stash_mapping: updatedStashMapping }) */
	/* 	.eq('id', id); */
	/**/
	/* if (updateError) { */
	/* 	console.error("Errore nell'aggiornamento di stash_mapping:", updateError); */
	/* 	return; */
	/* } */
	/**/
	/* revalidateTag('stash_mapping'); */
	/* redirect(''); */
}




/* export async function revalidateAccount() { */
/**/
/* 	revalidateTag('account') */
/* 	redirect('') */
/* } */
/**/
/* export async function updateProfileImage(e: FormData) { */
/**/
/* 	const file = e.get("avatar") */
/* 	if (!file) return; */
/**/
/* 	const id = e.get("id") */
/* 	const supabase = _createServerComponentClient() */
/* 	const updateTime = Date.now() */
/* 	await supabase.from('profiles').update({ avatarUrl: updateTime }).match({ id: id }) */
/* 	const filePath = `${id}/${updateTime}.jpg`; */
/**/
/* 	if (file) { */
/* 		let { error: uploadError } = await supabase.storage.from('avatars') */
/* 			.upload(filePath, file, { */
/* 				cacheControl: '0', */
/* 				upsert: true */
/* 			}); */
/* 		if (uploadError) { */
/* 			console.error('Errore durante l\'upload:', uploadError); */
/* 		} else { */
/* 			console.log('Caricamento completato'); */
/* 			revalidateTag('account') */
/* 			redirect('') */
/* 		} */
/* 	} */
/* }; */
