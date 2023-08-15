'use server'
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from 'react'

export const _createServerComponentClient = cache(() => {
	const cookieStore = cookies()
	return createServerComponentClient({ cookies: () => cookieStore })
})

export async function getSession() {
	const supabase = _createServerComponentClient()
	try {
		const {
			data: { session }
		} = await supabase.auth.getSession()
		return session
	} catch (error) {
		console.error('Error:', error)
		return false
	}
}

export const _createRouteHandlerClient = cache(() => {
	const cookieStore = cookies()
	return createRouteHandlerClient({ cookies: () => cookieStore })
})
