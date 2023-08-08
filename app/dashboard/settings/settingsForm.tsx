"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"


export default function SettingsForm() {
	const router = useRouter();
	const supabase = createClientComponentClient();

	return (

		<div></div>
	)

}
