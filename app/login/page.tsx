import { getSession } from "../utils/serverCookies";



import Login from './auth';
import { redirect } from 'next/navigation';




export default async function SignIn() {


	const session = await getSession()

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="flex justify-center ">

			<Login />

		</div>
	);


}

