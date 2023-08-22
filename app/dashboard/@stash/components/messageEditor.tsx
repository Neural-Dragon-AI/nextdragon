'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Profile, Conversation } from "@/store/NextStore"


export const Editor: React.FC<Conversation> = ({ conversation }) => {
	console.log(conversation)
	/* const [username, setUsername] = useState(prop.prop.username) */
	/**/
	/* const supabase = createClientComponentClient() */
	/**/
	/* useEffect(() => { */
	/* 	const channel = supabase.channel('stash').on('postgres_changes', { */
	/* 		event: '*', */
	/* 		schema: 'public', */
	/* 		table: 'profiles', */
	/* 	}, (payload) => { */
	/* 		const newrow: any = payload.new */
	/* 		setUsername(newrow.username) */
	/* 	}).subscribe() */
	/* 	return () => { */
	/* 		supabase.removeChannel(channel) */
	/* 	} */
	/* }) */

	return (
		<>
			<div className="w-[40%]  rounded-md p-2">
				<p className="fonta-proxima text-white text-2xl self-center">Editor</p>
			</div>
		</>
	)
}
