"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useState } from 'react';
import Link from 'next/link'
import { useTransition, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { DeleteStash } from "@/actions/stash_actions"


interface prop {
	id: string
}


export default function StashBar(id: prop) {


	return (

		<section className="w-full ">
			<div className="bg-black  border-emerald-50/[.3] border-2 rounded-md w-full justify-between place-items-center  p-2 flex flex-row space-x-4 font-proxima">

				<Link
					href={`/dashboard/upload`}
					className="w-[20%] flex flex-row  space-x-1
										cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] place-items-center border-emerald-50/[.1] border-2 rounded-md justify-center p-1">

					<p>Upload</p>
				</Link>

				<form className=" h-full w-[20%]" action={DeleteStash}>
					<input hidden name="id" type="string" value={id.id} readOnly />
					<button type="submit" className=" w-full
										cursor-pointer text-emerald-400 hover:brightness-150 hover:bg-emerald-50/[.5] place-items-center border-emerald-50/[.1] border-2 rounded-md justify-center p-1">
						<p>Delete</p>
					</button>
				</form>



			</div>



		</section>

	)

}
