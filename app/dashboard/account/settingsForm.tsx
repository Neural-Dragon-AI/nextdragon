"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
/* import { Formik, Field, Form, FormikHelpers } from 'formik'; */
import { ChangeEvent, useState } from 'react';

export default function SettingsForm(id: string | any) {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const [success, setSuccess] = useState(false)
	/* const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${id.id}/avatar.jpg`) */
	/* const avatarUrl = publicUrl.data.publicUrl */

	const imageLoader = ({ }) => {
		const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${id.id}/avatar.jpg`)
		const avatarUrl = publicUrl.data.publicUrl
		return avatarUrl
	}

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {

		const file = event.target.files?.[0];
		if (!file) return;



		const filePath = `${id.id}/avatar.jpg`;

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

		<div className="relative w-full bg-gray-700 h-full rounded-md ">
			<form className="flex flex-col p-2">
				<input hidden id="avatar" type="file" accept="image/*" onChange={handleFileUpload} />

				<label htmlFor="avatar">
					<Image
						className="rounded-full h-44 w-44 object-cover absolute right-10 cursor-pointer"
						width={150}
						height={150}
						loader={imageLoader}
						src="avata3r.jpg"
						priority={true}
						alt="" />
				</label>
				{success ? <div className="absolute right-10 top-44 text-emerald-600 text-xs mt-3">New profile pic sent for approval!</div> : null}

				<div className=" flex flex-row space-x-5 ">
					<input type="password" id="openaiApiKey" placeholder="Your OpenAI key here"
						minLength={51} maxLength={51}
						className="absolute top-44 left-8 h-8 w-1/2 rounded-md px-4 py-3 text-sm text-slate-900 ring-2 ring-emerald-400
				  invalid:ring-red-500  bg-slate-900
						dark:text-gray-400 placeholder:text-gray-400"/>
				</div>

			</form>
		</div>
	)

}
