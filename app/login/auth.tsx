
"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"


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
			password: "te1st4444",
		});
		router.refresh();
	};

	const handleGoogleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})
		router.refresh();
	};

	const handleGithubSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})
		router.refresh();
	}

	const handleDiscordSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})
		router.refresh();
	}

	return (
		<main className="h-screen w-screen bg-black m-0 p-0 flex justify-evenly items-center">
			<section className="rounded-md flex flex-col items-center place-content-evenly top-1/3 h-[50%] w-1/4 border-emerald-600 border-2">

				<section className="flex flex-col space-y-2">
					<div className="relative">
						<input type="email" name="email" required
							className="peer w-[99%]  bg-transparent border-b-2 pb-1 border-emerald-600 outline-none text-emerald-600" />
						<label className="absolute top-2 left-2 text-sm text-white pointer-events-none duration-500 peer-focus:opacity-0 peer-focus:text-xs peer-focus:top-[-20px]
						peer-valid:text-xs peer-valid:top-[-20px] peer-valid:opacity-0">Email</label>
					</div>

					<div className="relative">
						<input type="password" name="password" autoComplete="current-password" required
							className="peer w-[99%] outline-none text-white  border-b-2 pb-1 border-emerald-600 bg-transparent" />
						<label className="absolute top-2 left-2 text-sm text-white pointer-events-none duration-500 peer-focus:text-xs peer-focus:opacity-0 peer-focus:top-[-20px]
						peer-valid:text-xs peer-valid:top-[-20px] peer-valid:opacity-0">Password</label>
					</div>

					<button
						onClick={handleSignIn}
						className="rounded-md  p-2 hover:bg-white/[.1]  outline-none font-mono text-sm text-emerald-600   place-self-end ">Sign in &#128273;</button>
				</section>
				<div className="text-white">or</div>
				<section className="flex flex-row space-x-4">
					<button onClick={handleGoogleSignIn}>
						<Image
							src="https://www.svgrepo.com/show/475656/google-color.svg"
							width={25}
							height={25}
							alt="Google"
						/>
					</button>
					<button onClick={handleGithubSignIn}>
						<Image
							src="https://www.svgrepo.com/show/475654/github-color.svg"
							width={25}
							height={25}
							alt="Github"
						/>
					</button>
					<button onClick={handleDiscordSignIn}>
						<Image
							src="https://www.svgrepo.com/show/353655/discord-icon.svg"
							width={25}
							height={25}
							alt="Discord"
						/>
					</button>
				</section>
				<div className="flex gap-2 text-white text-xs">
					<a>Don`t have an account yet? </a>
					<button onClick={handleSignUp}>Sign up</button>

				</div>
			</section>
		</main>
	)
}
