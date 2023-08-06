"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function Navbar() {

	const router = useRouter();
	const supabase = createClientComponentClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return (
		<nav className="absolute flex h-10 my-2 border-t-2 border-b-2 border-gray-600 bg-gray-400 place-items-center w-full shadow-md z-10">
			<div className="absolute right-5 text-black flex flex-row space-x-4">
				<section className="group inline-block relative">
					<div className="w-40 h-fit cursor-pointer text-black font-bold flex justify-center">
						<Image

							src="https://www.svgrepo.com/show/361411/account.svg"
							width={25}
							height={25}
							alt="Account"
						/>
					</div>
					<div className="space-y-3 bg-gray-400 absolute 
            right-0 top-full w-40 transform rounded-b-md
            px-2 pt-5 pb-3 text-sm scale-y-0 group-hover:scale-y-100 origin-top
            text-black  transition duration-200 
            ease-in-out  font-proxima font-bold">

						<div className="flex flex-row justify-evenly cursor-pointer">

							<Image

								src="https://www.svgrepo.com/show/469755/settings.svg"
								width={25}
								height={25}
								alt="Account"
							/>
							<a className="h-25 py-1 ml-2">Settings</a>
						</div>

						<div className="flex flex-row justify-evenly cursor-pointer">
							<Image

								src="https://www.svgrepo.com/show/469802/sign-out-alt.svg"
								width={25}
								height={25}
								alt="Account"
							/>

							<button className="h-25 py-1 ml-2 " onClick={handleSignOut}>Sign out</button>
						</div>
					</div>
				</section>

			</div>
		</nav>
	)
};



