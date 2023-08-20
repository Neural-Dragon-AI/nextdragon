"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from 'next/link'
import { useState, useEffect } from 'react'


interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
}


export default function Navbar(prop: Profile | any) {

	const profile = prop.profile
	const router = useRouter();
	const supabase = createClientComponentClient()


	const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${profile.id}/${profile.avatarUrl}.jpg`)
	const returnUrl = publicUrl.data.publicUrl
	const [avatarUrl, setAvatarurl] = useState(returnUrl)

	useEffect(() => {
		const channel = supabase.channel('navbar').on('postgres_changes', {
			event: '*',
			schema: 'public',
			table: 'profiles',
			filter: `avatarUrl=neq.${profile.avatarUrl}`
		}, (payload) => {
			const newrow: any = payload.new
			console.log(newrow.avatarUrl)
			const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${profile.id}/${newrow.avatarUrl}.jpg`)
			const returnUrl = publicUrl.data.publicUrl
			setAvatarurl(returnUrl)


		}).subscribe()
		return () => {
			supabase.removeChannel(channel)
		}
	})

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};


	return (
		<nav className=" flex h-9 my-3 bg-gray-700 place-items-center w-[98%] shadow-md rounded-md z-10">
			<div className="absolute top-2 right-14 text-black flex flex-row space-x-4">
				<section className="group inline-block relative">
					<div className="w-40 h-fit text-black font-bold flex justify-center">
						<Image
							className="rounded-full h-10 w-10 object-cover"
							src={avatarUrl}
							width={25}
							height={25}
							alt="Account"
						/>
					</div>
					<div className="space-y-3 bg-gray-700 absolute 
            right-0 top-full w-40 transform rounded-b-md mt-0
            px-2 pt-5 pb-2 text-sm scale-y-0 group-hover:scale-y-100 origin-top
            text-black  transition duration-200 
            ease-in-out  font-proxima font-bold">

						<Link href="dashboard/account" className="flex flex-row w-full justify-evenly cursor-pointer hover:bg-black/[.2] text-emerald-400 rounded-md p-0.5">

							<Image

								src="https://www.svgrepo.com/show/469755/settings.svg"
								width={25}
								height={25}
								alt="Account"
							/>
							<p className="h-25 py-1 ml-2">Account</p>
						</Link>

						<button onClick={handleSignOut} className="flex flex-row w-full justify-evenly cursor-pointer text-emerald-400 hover:bg-black/[.2] rounded-md p-0.5">
							<Image

								src="https://www.svgrepo.com/show/469802/sign-out-alt.svg"
								width={25}
								height={25}
								alt="SignOut"
							/>

							<a className="h-25 py-1 ml-2 " >Logout&nbsp;&nbsp;</a>
						</button>
					</div>
				</section>

			</div>
		</nav>
	)
};



