
"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function Login() {
	const router = useRouter();
	const supabase = createClientComponentClient();
		


	const handleSignUp = async () => {

		await supabase.auth.signUp({
			email: "gmgioele@gmail.com",
			password: "te1st4444",
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});
		router.refresh();
	};

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email: "gmgioele@gmail.com",
			password: "t1est4444",
		});
		router.refresh();
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return (
		<main className="h-screen w-screen bg-black m-0 p-0 flex justify-center items-center">
			<section className="rounded-md flex flex-col items-center place-content-evenly top-1/3 h-[50%] w-1/4 border-emerald-600 border-2">
				{/* <form method="post" className="w-auto h-[200px]   bg-white/[0.6] rounded-md truncate  flex flex-col justify-center place-items-start space-y-6 p-3 "> */}
				{/**/}
				{/* 	<div className="relative"> */}
				{/* 		<input type="email" name="email" required */}
				{/* 			className="peer w-[180px] bg-transparent border-b-2 pb-1 border-white outline-none text-white" /> */}
				{/* 		<label className="absolute top-0 left-0 text-white pointer-events-none duration-500 peer-focus:text-xs peer-focus:top-[-20px] peer-valid:text-xs peer-valid:top-[-20px]">Email</label> */}
				{/* 	</div> */}
				{/**/}
				{/* 	<div className="relative"> */}
				{/* 		<input type="password" name="password" autoComplete="current-password" required */}
				{/* 			className="peer w-[180px] outline-none text-white  border-b-2 pb-1 border-white bg-transparent" /> */}
				{/* 		<label className="absolute top-0 left-0 text-white pointer-events-none duration-500 peer-focus:text-xs peer-focus:top-[-20px] peer-valid:text-xs peer-valid:top-[-20px]">Password</label> */}
				{/* 	</div> */}
				{/**/}
				{/* 	<button */}
				{/* 		type="submit" */}
				{/* 		className="rounded-md w-[50px] outline-none font-mono font-bold  hover:bg-white/[0.7] place-self-end caret-black">&#128273;</button> */}
				{/* </form> */}
				{/* <div className="text-white">or</div> */}

				<div className="flex gap-2 text-white">
					<button onClick={handleSignUp}>Sign up</button>
					<button onClick={handleSignIn}>Sign in</button>
					<button onClick={handleSignOut}>Sign out</button>
				</div>
			</section>
		</main>
	)
}
