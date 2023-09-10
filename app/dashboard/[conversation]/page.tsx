import { MessageEditor } from './components/messageEditor'
import { getSession } from "@/actions/serverCookies";
import { redirect } from "next/navigation";


export default async function Editor({ params }: { params: { conversation: string } }) {

	const session = await getSession();

	if (!session) {
		redirect("/login");
	}
	console.log("EDITORE CERCA", session.user.id, params.conversation)

	const response = await fetch(`http://127.0.0.1:8000/getRows/${session.user.id}/${params.conversation}`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	const rows = await response.json()

	return (
		<div className=" w-full h-full flex flex-row justify-between bg-transparent">
			{rows ? <MessageEditor conversation={rows} conversation_id={params.conversation} /> : <MessageEditor conversation={[]} conversation_id={params.conversation} />}
		</div>
	)
}
