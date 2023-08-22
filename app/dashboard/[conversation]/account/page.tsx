import Modal from '@/components/modal/Modal'
import SettingsForm from './settingsForm'
import { _createServerComponentClient } from "@/actions/serverCookies";
import { getSession } from "@/actions/serverCookies";
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation";
import { Profile } from "@/store/NextStore"


export default async function AccountModal() {


	const session = await getSession();

	if (!session) {
		redirect("/login");
	}
	else {
		redirect("/dashboard/account")
	}

}
