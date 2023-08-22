'use client'
import { useState } from 'react'
import Image from "next/image"
import { FolderTreeType } from './Tree'

interface FolderTreeProps {
	data: FolderTreeType;
	children?: React.ReactNode;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ data, children }) => {

	const [open, setOpen] = useState(false)

	const handleToggle = () => {

		setOpen(!open);
	};


	return (

			<section className="w-full">
				<div className="flex flex-row space-x-1  p-2 w-fit  rounded-md cursor-pointer" onClick={handleToggle}>
					<Image
						src="https://www.svgrepo.com/show/514322/folder.svg"
						width={20}
						height={20}
						alt="Folder"
					/>
					<p className="text-white w-fit">{data.name}</p>
				</div>

				<section
					className={`  overflow-hidden   ${open ? 'h-fit flex flex-col  w-fit px-2 py-1 mt-2 bg-black/[.3]  rounded-md   ml-12' : 'h-0 w-0'}`}>
					{children}
				</section>
			</section>

	)
}
