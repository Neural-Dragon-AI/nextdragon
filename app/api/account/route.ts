import { _createRouteHandlerClient } from "../../utils/serverCookies"
import { NextResponse } from 'next/server';



export async function PUT(request: Request) {
	if (request.method !== 'PUT') {
		return NextResponse.json({ errorCode: 405 })
	}



	const supabase = _createRouteHandlerClient()
	const body = await request.json()
	const { data } = await supabase.from('profiles').update({ username: body.username, openaiApiKey: body.openaiapikey }).match({ id: body.id })
	return NextResponse.json(data);








}

