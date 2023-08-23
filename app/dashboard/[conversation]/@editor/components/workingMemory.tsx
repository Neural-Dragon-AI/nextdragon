'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
}


export const WorkingMemory: React.FC = () => {

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
			<div className="w-[40%] bg-white/[.1]  rounded-md p-2">
				<p className="fonta-proxima text-white text-2xl self-center"></p>
			</div>
		</>
	)
}
