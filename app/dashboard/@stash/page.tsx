import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Suspense } from 'react'
import { Tree } from './tree/Tree'

interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
}

interface FileTreeType {
	type: "file";
	name: string;
}

interface FolderTreeType {
	type: "folder";
	name: string;
	childrens: Array<FileTreeType | FolderTreeType>;
}

type FileSystemObject = FileTreeType | FolderTreeType;


export default async function Dashboard() {
	const supabase = _createServerComponentClient();

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const data = await unstable_cache(

		async () => {
			const data = await supabase.from('profiles').select('id,username,openaiApiKey,avatarUrl')
			return data
		},
		['account'],
		{
			tags: ['account'],
			revalidate: 1,
		}
	)()

	const profile: Profile | any = data.data ? data.data[0] : null




	const structure: FileSystemObject[] = [
		{
			type: "folder",
			name: "src",
			childrens: [
				{
					type: "folder",
					name: "Components",
					childrens: [
						{ type: "file", name: "Modal.js" },
						{ type: "file", name: "Modal.css" }
					]
				},
				{ type: "file", name: "index.js" },
				{ type: "file", name: "index.html" }
			]
		},
		{ type: "file", name: "package.json" }
	];

	return (
		<div className="w-3/4 bg-gray-700 p-4 rounded-md h-[90%]  ">
			{profile.username}
			<Tree data={ structure } />
		</div>
	)
}
