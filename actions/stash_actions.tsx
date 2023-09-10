"use server"
import { _createServerComponentClient } from "./serverCookies"
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from "next/navigation";
import { FileSystemObject } from "@/store/NextStore"
import { Conversation } from "@/app/chat/components/conversation";



export async function DeleteStash(e: FormData) {

	console.log("Deleting Stash")
	const id = e.get("id")?.toString()
	await fetch(`http://127.0.0.1:8000/stashMapping/${id}`, {
		cache: 'no-store',
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	revalidateTag('stash_mapping')
}


export async function ImportFromUrl(url: string, id: string) {


	// Prepara i dati da inviare nella richiesta POST
	const payload = {
		url: url,
	};

	// Esegui la richiesta POST
	const response = await fetch(`http://127.0.0.1:8000/importFromUrl/${id}`, {
		cache: 'no-store',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	const staticData = await response.json();



	/* 	const updatedStashMapping = [...existingData, ...staticData]; */
	const test_stash = [
		{
			type: "file",
			name: staticData.name,
			id: staticData.id,
		}

	]

	const payload_stash = {
		stash_mapping: test_stash
	}
	console.log(payload_stash)

	await fetch(`http://127.0.0.1:8000/stashMapping/${id}`, {
		next: { tags: ['stash_mapping'] },
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload_stash)
	});


	revalidateTag('stash_mapping');
}


export async function GetMessages(e: FormData) {
	const user_id = e.get("user_id")?.toString()
	const conversation_id = e.get("conversation_id")?.toString()

	console.log(user_id, conversation_id)
	const response = await fetch(`http://127.0.0.1:8000/getRows/${user_id}/${conversation_id}`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	const rows = await response.json()
	console.log(rows)
	return rows
}





export async function UploadOpenaiBackup(e: FormData, id: string) {

	const file = e.get("file")
	if (!file) return;

	try {
		const response = await fetch(`http://127.0.0.1:8000/uploadfile/${id}`, {
			cache: 'no-store',
			method: "POST",
			body: e,
		});

		if (response.ok) {
			const jsonResponse = await response.json();
			console.log("Successo:", jsonResponse);
			const test_stash = jsonResponse.content.map((item: any) => ({
				type: 'file',
				name: item.conversation_title,
				id: item.conversation_id,
			}));
			const payload_stash = {
				stash_mapping: test_stash
			}
			console.log("SONO IL PAYLOAD", payload_stash)
			await fetch(`http://127.0.0.1:8000/stashMapping/${id}`, {
				next: { tags: ['stash_mapping'] },
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload_stash)
			});
			revalidateTag('stash_mapping');

		} else {
			console.log("Errore:", response.statusText);
		}
	} catch (error) {
		console.error("Si è verificato un errore:", error);
	}
};




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
