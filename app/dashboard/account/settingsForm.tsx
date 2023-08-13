"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
/* import { Formik, Field, Form, FormikHelpers } from 'formik'; */
import { ChangeEvent, useState } from 'react';

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
}



export default function SettingsForm(prop: Profile | any) {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [success, setSuccess] = useState(false)
	/* const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${id.id}/avatar.jpg`) */
	/* const avatarUrl = publicUrl.data.publicUrl */
	console.log(prop.profile.id)
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
				setSuccess(true)
				router.refresh()
			}
		}


	};

	return (

		<div className="relative w-full bg-gray-700 h-full rounded-md p-8 ">
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
			{success ? <div className="absolute right-10 top-44 text-emerald-600 text-xs mt-3">New profile pic sent for approval!</div> : null}

			<form className=" top-1/4 w-[80%] absolute flex flex-col p-6">
				<input hidden id="avatar" type="file" accept="image/*" onChange={handleFileUpload} />



				<label className="mb-1 text-emerald-300" htmlFor="username">Username</label>
				<div className="mb-8 flex flex-row space-x-2">
					<input type="text" id="username" placeholder={prop.profile.username}
						minLength={51} maxLength={51}
						className=" h-8 w-1/2 border-none rounded-md px-4 py-3 text-sm text-black
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white
						 placeholder:text-emerald-300"/>
					<button >
						<Image src="https://www.svgrepo.com/show/469726/save-left.svg" width={20} height={20} alt="" />
					</button>

				</div>
				<label className="mb-1 text-emerald-300" htmlFor="apikey">Openai Api Key</label>
				<div className="mb-8 flex flex-row space-x-2">
					<input type="password" id="apikey" placeholder={prop.profile.openaiApiKey}
						minLength={51} maxLength={51}
						className=" h-8 w-1/2 border-none rounded-md px-4 py-3 text-sm text-black
				  invalid:ring-red-500  bg-white/[.1] ring-none dark:outline-white
						 placeholder:text-emerald-300"/>
					<button >
						<Image src="https://www.svgrepo.com/show/469726/save-left.svg" width={20} height={20} alt="" />
					</button>
				</div>
			</form>
		</div>
	)

}
