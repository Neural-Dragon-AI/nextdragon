"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function Navbar(username: any) {

	const router = useRouter();
	const supabase = createClientComponentClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return <nav className="absolute flex h-[5vh] my-2 border-t-2 border-b-2 border-gray-600 bg-gray-800/[.9] place-items-center   w-full  shadow-md z-10  ">
		<div className="absolute right-5 text-emerald-300 flex flex-row space-x-4 ">
			<a>Logged in as {username.username}</a>
			<button onClick={handleSignOut}>Sign out</button>

		</div>
	</nav >

}
