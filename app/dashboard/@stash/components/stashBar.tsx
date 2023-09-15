"use client";
import Link from 'next/link'
import { useNextStore } from "@/store/NextStore"
import { DeleteStash } from "@/actions/stash_actions"


interface prop {
	id: string
}


export default function StashBar(id: prop) {

	const delete_file_open = useNextStore((state) => state.deleteFileOpen)

	return (

		<section className="w-full ">
			<div className="bg-black  border-emerald-50/[.3] border-2 rounded-md w-full justify-between place-items-center  p-2 flex flex-row space-x-4 font-proxima">



				<form className=" h-full w-[20%]" action={DeleteStash}>
					<input hidden name="id" type="string" value={id.id} readOnly />
					<button type="submit" onClick={delete_file_open} className=" w-full
										cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] place-items-center border-emerald-50/[.1] border-2 rounded-md justify-center p-1">
						<p>Delete</p>
					</button>
				</form>



			</div>



		</section>

	)

}
