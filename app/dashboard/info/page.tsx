
import { getSession } from "@/actions/serverCookies";
import { redirect } from "next/navigation";
import Link from 'next/link'
import { Stats } from './components/info'

export default async function Info() {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}
	console.log("TOKEN", session.user.id)

	const response = await fetch(`http://127.0.0.1:8000/getInfo/${session.user.id}`, {
		next: { tags: ['info'] },
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	const info = await response.json()

	return (
		<div className=" w-full h-[98%]  flex flex-row place-items-center justify-start rounded-md  font-proxima text-white">

			<Stats num_messages={info.num_messages} num_conversations={info.num_conversations} />
			<section className="w-1/4 h-full  flex flex-col space-y-5 place-items-end justify-end p-5">
				<div
					className="w-40 flex flex-row 
				cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] place-items-center border-emerald-50/[.1] border-2 rounded-md justify-center p-1">
					<p>Embed</p>
				</div>
				<Link
					href={`/dashboard/upload`}
					className="w-40 flex flex-row 
				cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] place-items-center border-emerald-50/[.1] border-2 rounded-md justify-center p-1">
					<p>Upload More Data</p>
				</Link>
			</section>
		</div>
	)
}
