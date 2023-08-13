import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { NextResponse } from 'next/server';

export async function PUT(request: Request) {

	if (request.method !== 'PUT') {
		return NextResponse.json({ errorCode: 405 })
	}

	const supabase = createRouteHandlerClient({ cookies })
	const body = await request.json()
	const { data } = await supabase.from('profiles').update({ username: body.username, openaiApiKey: body.openaiapikey }).match({ id: body.id })

	return NextResponse.json(data);

}
