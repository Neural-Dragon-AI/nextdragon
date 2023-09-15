"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from 'next/link'
import { useState, useEffect, useTransition } from 'react'
import { Profile, useNextStore } from '@/store/NextStore'
import { revalidateAccount } from '@/actions/userSettings'

interface NavbarProps {
	profile: Profile
}


export const Navbar: React.FC<NavbarProps> = ({ profile }) => {



	const [isPending, startTransition] = useTransition()


	const router = useRouter();
	const supabase = createClientComponentClient()


	const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${profile.id}/${profile.avatarUrl}.jpg`)
	const returnUrl = publicUrl.data.publicUrl
	const [avatarUrl, setAvatarurl] = useState(returnUrl)

	useEffect(() => {
		const channel = supabase.channel('navbar').on('postgres_changes', {
			event: '*',
			schema: 'public',
			table: 'profiles'
		}, (payload) => {
			const newrow: any = payload.new
			console.log(newrow.avatarUrl)
			const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${profile.id}/${newrow.avatarUrl}.jpg`)
			const returnUrl = publicUrl.data.publicUrl
			startTransition(() => revalidateAccount())
			setAvatarurl(returnUrl)
			/* 			setCurrentProfile(newrow) */
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
		<nav className="flex h-full bg-black  rounded-md flex-row  place-items-center w-full justify-end space-x-12 z-10">

			<Link

				href="/dashboard/upload"
				replace={true}
				className=" flex place-items-center flex-row justify-center  w-full  cursor-pointer hover:brightness-150  text-emerald-400 rounded-md ">
				<p className="h-25 ">Upload</p>
			</Link>

			<Link

				href="/dashboard/info"
				replace={true}
				className=" flex place-items-center flex-row justify-center  w-full  cursor-pointer hover:brightness-150  text-emerald-400 rounded-md ">
				<p className="h-25 ">Info</p>
			</Link>


			<Link

				href="/dashboard/jobs"
				replace={true}
				className=" flex place-items-center flex-row justify-center  w-full  cursor-pointer hover:brightness-150  text-emerald-400 rounded-md ">
				<p className="h-25 ">Jobs</p>
			</Link>


			<section className="group inline-block relative mt-2 ">
				<div className="w-16  h-16  cursor-help text-black font-bold flex flex-row justify-center place-items-center">

					<Image
						className="rounded-full h-10 w-10 object-cover"
						src={avatarUrl}
						width={25}
						height={25}
						alt="Account"
					/>

				</div>
				<div className="space-y-3 bg-black absolute rounded-bl-md
            right-0 top-3/4 w-40 transform  mt-1 z-20
            px-2 pt-3 pb-2 text-sm scale-y-0 group-hover:scale-y-100 origin-top
            text-black  transition duration-75 
            ease-in-out  font-proxima font-bold shadow-lg  shadow-emerald-500/30">

					<Link href="dashboard/account" className="flex flex-row w-full justify-evenly cursor-pointer hover:brightness-150 hover:bg-emerald-50/[.5] text-emerald-400 rounded-md p-0.5">

						<Image

							src="https://www.svgrepo.com/show/469755/settings.svg"
							width={25}
							height={25}
							alt="Account"
						/>
						<p className="h-25 py-1 ml-2">Account</p>
					</Link>

					<button onClick={handleSignOut} className=" flex flex-row w-full justify-evenly cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] rounded-md p-0.5">
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


		</nav>
	)
};



