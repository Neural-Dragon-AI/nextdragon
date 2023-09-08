import { createClient } from "@supabase/supabase-js"
import Uploads from "./uploads"

export default async function Home() {


	return (
		<div className=" w-full h-[98%]  flex flex-row place-items-center justify-center rounded-md space-y-5  font-proxima text-white">
			<Uploads />
		</div>
	)
}
