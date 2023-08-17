"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image"
import Link from 'next/link'
import { ChangeEvent, useState } from 'react';
import { updateUser } from "../../actions/userSettings"
import { useTransition } from 'react'
import { experimental_useOptimistic as useOptimistic, useRef } from 'react'
import { revalidatePath, revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
}

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default function SettingsForm(prop: Profile | any) {
	const router = useRouter()
	const supabase = createClientComponentClient();
	const [imagesuccess, setImagesuccess] = useState(false)
	const [savesuccess, setSavesuccess] = useState(false)
	const [username, setUsername] = useState(prop.profile.username)
	const [openaiapikey, setOpenaiapikey] = useState(prop.profile.openaiApiKey)
	const [optimisticusername, setOptimisticusername] = useOptimistic(prop.profile.username)
	let [isPending, startTransition] = useTransition()


	const imageLoader = ({ }) => {
		const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${prop.profile.id}/avatar.jpg`)
		const avatarUrl = publicUrl.data.publicUrl
		return avatarUrl
	}

	/* const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => { */
	/**/
	/* 	const file = event.target.files?.[0]; */
	/* 	if (!file) return; */
	/**/
	/**/
	/**/
	/* 	const filePath = `${prop.profile.id}/avatar.jpg`; */
	/**/
	/* 	if (file) { */
	/* 		let { error: uploadError } = await supabase.storage */
	/* 			.from('avatars') */
	/* 			.upload(filePath, file, { */
	/* 				cacheControl: '1', */
	/* 				upsert: true */
	/* 			}); */
	/* 		if (uploadError) { */
	/* 			console.error('Errore durante l\'upload:', uploadError); */
	/* 		} else { */
	/* 			console.log('Caricamento completato'); */
	/* 			setImagesuccess(true) */
	/**/
	/**/
	/* 		} */
	/* 	} */
	/**/
	/* }; */

	/* const _updateUser = async () => { */
	/* 	try { */
	/**/
	/* 		const body = { username: username, id: prop.profile.id, openaiApiKey: openaiapikey } */
	/* 		startTransition(() => updateUser(body)) */
	/* 	} */
	/**/
	/**/
	/* 	catch (error) { */
	/* 		console.log(error) */
	/* 	} */
	/**/
	/* 	setSavesuccess(true) */
	/**/
	/**/
	/* } */

	return (

		<div className="relative  bg-gray-700  rounded-md p-8 w-1/2 h-3/4 font-proxima ">
			<p className="text-emerald-300 text-2xl  ml-28 mt-12 h-fit w-fit">Hello {optimisticusername}</p>
			<label htmlFor="avatar">
				<Image
					className="rounded-full h-44 w-44 object-cover absolute right-12 cursor-pointer"
					width={150}
					height={150}
					loader={imageLoader}
					src="avata3r.jpg"
					priority={true}
					alt="" />
			</label>

			{imagesuccess ? <div className="absolute right-12 top-72 text-emerald-300 text-xs mt-3">New profile pic sent for approval!</div> : null}

			<div className=" top-1/4 w-[65%] absolute flex flex-col p-6  rounded-md  h-[65%]">


				{/* 				<input hidden id="avatar" type="file" accept="image/*" onChange={handleFileUpload} /> */}

				<form action={updateUser}>
					<input hidden name="id" type="string" value={prop.profile.id} readOnly />
					<label className="mb-1 text-emerald-300" >Username</label>
					<div className="mb-8 flex flex-row space-x-2">
						<input name="username" placeholder={prop.profile.username} defaultValue={prop.profile.username}
							type="text" onChange={() => { setSavesuccess(false) }}
							className="resize-none h-8 overflow-hidden w-1/2 border-none rounded-md px-4 text-sm 
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white
						 placeholder:text-black  focus:placeholder:opacity-0 text-emerald-300"/>


					</div>
					<label className="mb-1 text-emerald-300">Openai Api Key</label>
					<div className="mb-8 flex flex-row space-x-2">
						<input type="password" name="apikey" defaultValue={prop.profile.openaiApiKey} placeholder={`sk- . . . ${prop.profile.openaiApiKey.substring(47)}`} onChange={() => { setSavesuccess(false) }}
							minLength={51} maxLength={51}
							className=" h-8 w-1/2 border-none rounded-md px-4 py-3 text-sm 
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white focus:placeholder:opacity-0
						 placeholder:text-black"/>

					</div>
					<button type="submit" className="absolute right-14 bottom-14 flex flex-row space-x-1 hover:bg-black/[.2] px-2 py-1 rounded-md" onClick={() => { setSavesuccess(true) }} >

						<Image src="https://www.svgrepo.com/show/469726/save-left.svg" width={20} height={20} alt="" />
						<p className="text-emerald-300">Save</p>
					</button>
					{savesuccess ? <div className="absolute right-12 bottom-8 text-emerald-300 text-xs mt-3">Changes saved!</div> : null}

					<button onClick={() => router.back()} className="absolute bottom-0 left-0 flex flex-row cursor-pointer space-x-1 hover:bg-black/[.2] px-2 py-1 rounded-md">

						<Image

							src="https://www.svgrepo.com/show/468482/dashboard-alt.svg"
							width={20}
							height={20}
							alt="Account"
						/>
						<p className="text-emerald-300">Back</p>
					</button>
				</form>

			</div>
		</div>
	)

}
