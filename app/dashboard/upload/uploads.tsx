"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useState } from 'react';
import { useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"


interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
}


export default function Uploads(prop: Profile | any) {


	const profile = prop.profile
	const router = useRouter()
	const supabase = createClientComponentClient();
	const [isPending, startTransition] = useTransition()
	const [imagesuccess, setImagesuccess] = useState(false)
	const [savesuccess, setSavesuccess] = useState(false)


	/* useEffect(() => { */
	/* 	const channel = supabase.channel('settings').on('postgres_changes', { */
	/* 		event: '*', */
	/* 		schema: 'public', */
	/* 		table: 'profiles', */
	/* 	}, (payload) => { */
	/* 		const newrow: any = payload.new */
	/* 		console.log(newrow) */
	/**/
	/* 	}).subscribe() */
	/* 	return () => { */
	/* 		supabase.removeChannel(channel) */
	/* 	} */
	/* }) */
	const [selectedZipOrJson, setSelectedZipOrJson] = useState<File | null>(null);
	const [inputString, setInputString] = useState<string>("");
	const [selectedParquet, setSelectedParquet] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const parquetInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedZipOrJson(file);
		}
	};

	const handleParquetChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedParquet(file);
		}
	};


	const handleUploadButtonClick = () => {
		if (selectedZipOrJson) {
			// Codice per eseguire l'upload del file Zip/Json
			const formData = new FormData();
			formData.append("id", profile.id);
			formData.append("avatar", selectedFile);
			/* startTransition(() => uploadBackup(formData)); */
			setImagesuccess(true);
		}
	};

	const handleUploadParquetClick = () => {
		if (selectedParquet) {
			// Codice per eseguire l'upload del file Parquet
		}
	};





	return (

		<section className="flex flex-col justify-start place-items-start h-3/4 w-3/4 space-y-5 bg-gray-700/[.7] py-5 px-2 rounded-md border-2 border-white/20 ">
			<p className="text-xl self-center">Upload your data</p>

			<section className="w-full">
				<div className="bg-gray-700 rounded-t-md w-full justify-between place-items-center h-10 px-1 flex flex-row space-x-4 font-proxima">
					<input
						ref={fileInputRef}
						hidden
						id="fileUpload"
						type="file"
						accept=".zip,.json"
						onChange={handleFileChange}
					/>
					<button onClick={() => fileInputRef.current?.click()} className=" flex flex-row w-[20%]  space-x-2 cursor-pointer hover:text-emerald-400 hover:brightness-150 place-items-center bg-gray-500/[.5] rounded-md pr-4 pl-2 py-1">
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5"
									stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
								<path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
						</svg>
						<p>Upload</p>
					</button>
					<p className="truncate w-[50%]">{selectedZipOrJson ? selectedZipOrJson.name : null}</p>
					<button onClick={() => handleUploadButtonClick()} className="w-[20%] flex flex-row  space-x-2
										cursor-pointer hover:text-emerald-400 hover:brightness-150 place-items-center bg-gray-500/[.5] rounded-md justify-center py-1 pl-2">
						<p>Send</p>
						<Image

							src="https://www.svgrepo.com/show/469753/send.svg"
							width={20}
							height={20}
							alt="Account"
						/>
					</button>
				</div>
				<div className="w-full  text-sm px-4 py-1 bg-gray-700 rounded-b-md">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,
					when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
				</div>
			</section>




			<div className="bg-gray-700 rounded-md w-full justify-between place-items-center h-10 p-1 flex flex-row space-x-4 font-proxima">
				<textarea onChange={(event) => setInputString(event.target.value)}
					className="ml-2 h-8 py-1 w-[75%] resize-none border-2  bg-transparent  text-white border-white/[.4] outline-none
										focus:ring-0 focus:border-white/[.6] rounded-md overflow-hidden" />



				<button onClick={() => handleUploadButtonClick()} className="w-[20%] flex flex-row  space-x-2
										cursor-pointer hover:text-emerald-400 hover:brightness-150 place-items-center bg-gray-500/[.5] rounded-md justify-center py-1 pl-2">
					<p>Send</p>
					<Image

						src="https://www.svgrepo.com/show/469753/send.svg"
						width={20}
						height={20}
						alt="Account"
					/>
				</button>
			</div>





			<div className="bg-gray-700 rounded-md w-full justify-between place-items-center h-10 px-1 flex flex-row space-x-4 font-proxima">
				<input
					ref={fileInputRef}
					hidden
					id="fileUpload"
					type="file"
					accept=".zip,.json"
					onChange={handleFileChange}
				/>
				<button onClick={() => fileInputRef.current?.click()} className=" flex flex-row w-[20%]  space-x-2 cursor-pointer hover:text-emerald-400 hover:brightness-150 place-items-center bg-gray-500/[.5] rounded-md pr-4 pl-2 py-1">
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5"
								stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
							<path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
					</svg>
					<p>Upload </p>
				</button>
				<p className="truncate w-[50%]">{selectedParquet ? selectedParquet.name : null}</p>
				<button onClick={() => handleUploadButtonClick()} className="w-[20%] flex flex-row  space-x-2
										cursor-pointer hover:text-emerald-400 hover:brightness-150 place-items-center bg-gray-500/[.5] rounded-md justify-center py-1 pl-2">
					<p>Send</p>
					<Image

						src="https://www.svgrepo.com/show/469753/send.svg"
						width={20}
						height={20}
						alt="Account"
					/>
				</button>
			</div>



		</section>


	)

}
