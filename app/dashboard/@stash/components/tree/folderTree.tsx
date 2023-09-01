'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useNextStore, FolderTreeType } from '@/store/NextStore'
import { motion, AnimatePresence } from "framer-motion"

interface FolderTreeProps {
	data: FolderTreeType;
	children?: React.ReactNode;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ data, children }) => {

	const [empty, _] = useState(React.isValidElement(children) && 'props' in children && children.props.children.length == 0)
	const [open, setOpen] = useState(false)
	useEffect(() => {
		!useNextStore.persist.hasHydrated() ? useNextStore.persist.rehydrate() : null

	}, [])


	return (

		<section
			className="w-full"
		>
			<div className="flex flex-row space-x-1  w-fit  rounded-md cursor-pointer " onClick={() => setOpen(!open)} >
				{empty ?
					<Image
						src="https://www.svgrepo.com/show/463531/folder.svg"
						width={20}
						height={20}
						alt="Folder"
					/>
					:
					open ?
						<Image
							src="https://www.svgrepo.com/show/468934/folder-alt.svg"
							width={20}
							height={20}
							alt="Folder"
						/>
						: <Image
							src="https://www.svgrepo.com/show/468928/folder.svg"
							width={20}
							height={20}
							alt="Folder"
						/>}
				<p className="text-white w-fit">{data.name}</p>
			</div>
			<AnimatePresence>
				{open && !empty && (
					<motion.section
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.05 }}
						className="w-full ml-12  py-2 "
					>
						<div key={data.name}>{children}</div>
					</motion.section>
				)}
			</AnimatePresence>
		</section>

	)
}
