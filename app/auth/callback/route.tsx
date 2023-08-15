import { _createRouteHandlerClient } from "../../utils/serverCookies"
import { NextResponse } from "next/server";



export async function GET(request: Request) {


	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = _createRouteHandlerClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(requestUrl.origin);
}


