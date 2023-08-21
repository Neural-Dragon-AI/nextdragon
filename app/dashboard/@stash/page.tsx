import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Suspense } from 'react'
import { Tree, FileSystemObject } from './tree/Tree'
import Realtime from './realtime'

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
	stash_mapping: FileSystemObject
}



export default async function Dashboard() {
	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('*')
			return data
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 1,
		}
	)()

	const profile: Profile | any = data.data ? data.data[0] : null
/* 	console.log(profile) */

	return (
		<div className="w-3/4 bg-gray-700 p-4 rounded-md h-[90%] flex flex-col">
			<Realtime prop={profile} />
			<div className="flex flex-col h-full space-y-4 bg-black/[.3] rounded-md">

				<Tree data={profile.stash_mapping} />
			</div>
		</div>
	)
}
