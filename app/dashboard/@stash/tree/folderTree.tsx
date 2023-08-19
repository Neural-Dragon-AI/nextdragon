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

	console.log(children)
	return (
		<div className="flex flex-row bg-white/[.1] p-2 w-fit rounded-md" onClick={handleToggle}>
			<Image

				src="https://www.svgrepo.com/show/514322/folder.svg"
				width={20}
				height={20}
				alt="Folder"
			/>
			<span>{data.name}</span>




			<section

				className={`  flex flex-col font-bold text-xs text-black  h-0 w-fit  ${open ? 'h-fit bg-green-300 ' : 'bg-red-300'}`}

			>{children}</section>

		</div>
	)
}
