/* import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs" */
/* import { cookies } from "next/headers" */
/* import Busboy from 'busboy'; */
/**/
/**/
/* import { NextResponse } from 'next/server'; */
/* import { NextApiRequest } from 'next' */
/**/
/* export async function POST(req: NextApiRequest) { */
/**/
/* 	if (req.method !== 'POST') { */
/* 		return NextResponse.json({ errorCode: 405 }) */
/* 	} */
/**/
/* 	const supabase = createRouteHandlerClient({ cookies }) */
/**/
/* 	const { */
/* 		data: { session }, */
/* 	} = await supabase.auth.getSession(); */
/**/
/* 	let file = req.body; */
/* 	console.log(file) */
/**/
/* 	if (!file) { */
/* 		NextResponse.json({ errorCode: 404 }); */
/**/
/* 	} */
/**/
/* 	if (session) { */
/* 		const filePath = `${session.user.id}/avatar.jpg`; */
/* 		let { error: uploadError } = await supabase.storage */
/* 			.from('avatars') */
/* 			.upload(filePath, file, { */
/* 				cacheControl: '3600', */
/* 				upsert: true */
/* 			}); */
/* 		if (uploadError) { */
/* 			console.error('Errore durante l\'upload:', uploadError); */
/* 			NextResponse.json({ message: uploadError.message, errorCode: 500 }); */
/* 		} */
/**/
/* 	} */
/* 	console.log('Caricamento completato'); */
/* 	NextResponse.json({ message: 'Caricamento completato' }); */
/**/
/* } */
