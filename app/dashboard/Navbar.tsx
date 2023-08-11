"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from 'next/link'

export default function Navbar(id: string | any) {

	const router = useRouter();
	const supabase = createClientComponentClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	const imageLoader = ({ }) => {
		const publicUrl = supabase.storage.from('avatars').getPublicUrl(`${id.id}/avatar.jpg`)
		const avatarUrl = publicUrl.data.publicUrl
		return avatarUrl
	}

	return (
		<nav className="absolute top-0 flex h-10 my-2 border-t-[1px] border-b-[1px] border-emerald-600 bg-gray-700 place-items-center w-full shadow-md z-10">
			<div className="absolute right-5 text-black flex flex-row space-x-4">
				<section className="group inline-block relative">
					<div className="w-40 h-fit text-black font-bold flex justify-center">
						<Image
							className="rounded-full"
							loader={imageLoader}
							src="avatar.jpg"
							width={25}
							height={25}
							alt="Account"
						/>
					</div>
					<div className="space-y-3 bg-gray-700 absolute border-l-[1px] border-emerald-600 border-b-[1px] border-r-[1px]
            right-0 top-full w-40 transform rounded-b-md mt-[0.4rem]
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
							<a className="h-25 py-1 ml-2">Account</a>
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



