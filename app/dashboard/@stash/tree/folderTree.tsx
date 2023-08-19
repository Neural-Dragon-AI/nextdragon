'use client'
import { useState } from 'react'
import Image from "next/image"

interface FileTreeType {
	type: "file";
	name: string;
}


interface FolderTreeType {
	type: "folder";
	name: string;
	childrens: Array<FileTreeType | FolderTreeType>;
}

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
		<>
			<div className="flex flex-row space-x-1 bg-white/[.1] p-2  w-fit rounded-md cursor-pointer" onClick={handleToggle}>
				<Image
					src="https://www.svgrepo.com/show/514322/folder.svg"
					width={20}
					height={20}
					alt="Folder"
				/>
				<p className="text-white">{data.name}</p>
			</div>

			<section
				className={`  overflow-hidden   ${open ? 'h-auto flex flex-col  w-fit px-2 py-1 bg-black/[.3]  rounded-md   ml-12' : 'h-0'}`}>
				{children}
			</section>


		</>
	)
}
