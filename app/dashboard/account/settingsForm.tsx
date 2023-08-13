"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from 'next/link'
import { ChangeEvent, useState } from 'react';

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
}



export default function SettingsForm(prop: Profile | any) {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [imagesuccess, setImagesuccess] = useState(false)
	const [savesuccess, setSavesuccess] = useState(false)
	const [username, setUsername] = useState(prop.profile.username)
	const [openaiapikey, setOpenaiapikey] = useState(prop.profile.openaiApiKey)
	console.log(openaiapikey)
	/* const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${id.id}/avatar.jpg`) */
	/* const avatarUrl = publicUrl.data.publicUrl */

	const imageLoader = ({ }) => {
		const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${prop.profile.id}/avatar.jpg`)
		const avatarUrl = publicUrl.data.publicUrl
		return avatarUrl
	}

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {

		const file = event.target.files?.[0];
		if (!file) return;



		const filePath = `${prop.profile.id}/avatar.jpg`;

		if (file) {
			let { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, {
					cacheControl: '1',
					upsert: true
				});
			if (uploadError) {
				console.error('Errore durante l\'upload:', uploadError);
			} else {
				console.log('Caricamento completato');
				setImagesuccess(true)
				router.refresh()
			}
		}




	};

	const updateUsername = async () => {
		try {
			await fetch(`${location.origin}/api/account`, {
				method: 'PUT',
				body: JSON.stringify({ username: username, id: prop.profile.id, openaiapikey: openaiapikey }),
			})
		}
		catch (error) {
			console.log(error)
		}
		router.refresh()
		setSavesuccess(true)

	}

	return (

		<div className="relative w-full bg-gray-700 h-full rounded-md p-8 ">
			<p className="text-emerald-300 text-2xl  ml-28 mt-12 h-fit w-fit">Hello {prop.profile.username}</p>
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


				<input hidden id="avatar" type="file" accept="image/*" onChange={handleFileUpload} />


				<label className="mb-1 text-emerald-300" >Username</label>
				<div className="mb-8 flex flex-row space-x-2">
					<input type="text" id="username" value={username} onChange={(event) => { setUsername(event.target.value); setSavesuccess(false) }}
						minLength={51} maxLength={51}
						className=" h-8 w-1/2 border-none rounded-md px-4 py-3 text-sm 
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white
						 placeholder:text-emerald-300 text-emerald-300"/>


				</div>
				<label className="mb-1 text-emerald-300">Openai Api Key</label>
				<div className="mb-8 flex flex-row space-x-2">
					<input type="password" id="apikey" value={openaiapikey} onChange={(event) => { setOpenaiapikey(event.target.value); setSavesuccess(false) }}
						minLength={51} maxLength={51}
						className=" h-8 w-1/2 border-none rounded-md px-4 py-3 text-sm text-black
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white
						 placeholder:text-emerald-300"/>

				</div>
				<button className="absolute right-14 bottom-14 flex flex-row space-x-1 hover:bg-black/[.2] px-2 py-1 rounded-md" onClick={updateUsername} >

					<Image src="https://www.svgrepo.com/show/469726/save-left.svg" width={20} height={20} alt="" />
					<p className="text-emerald-300">Save</p>
				</button>
				{savesuccess ? <div className="absolute right-12 bottom-8 text-emerald-300 text-xs mt-3">Changes saved!</div> : null}

				<Link href="/dashboard" className="absolute bottom-0 left-0 flex flex-row cursor-pointer space-x-1 hover:bg-black/[.2] px-2 py-1 rounded-md">

					<Image

						src="https://www.svgrepo.com/show/468482/dashboard-alt.svg"
						width={20}
						height={20}
						alt="Account"
					/>
					<p className="text-emerald-300">Back</p>
				</Link>


			</div>
		</div>
	)

}
