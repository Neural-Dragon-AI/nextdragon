'use client'
import { useNextStore, FileTreeType } from '@/store/NextStore';
import Link from 'next/link'
import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Row } from "./row"

interface FileTreeProps {
	data: FileTreeType;
}

export const FileTree: React.FC<FileTreeProps> = ({ data }) => {

	const [open, setOpen] = useState(false)

	const handleRightClick = () => {
		console.log("Hai fatto clic con il tasto destro su:!", data.name);
	};

	return (

		<section key={data.name} className="w-auto h-full  relative py-1 ">
			<Link href={`/dashboard/${data.name.replace(/\s/g, "").toLowerCase()}`}>
				<button
					onClick={() => setOpen(!open)}
					onContextMenu={handleRightClick}
					className={`absolute top-0 left-0 flex flex-row items-center truncate rounded-md p-0.5 ${open ? 'bg-white/[.5] text-black ' : 'text-white'}`}
				>
					{/* SVG and text here */}
					<div className="font-proxima w-fit h-6 p-0.5 text-sm rounded-md cursor-pointer">
						{data.name}
					</div>
				</button>
			</Link>
			<AnimatePresence>
				{open && (
					<motion.section
						key={data.name}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.05 }}
						className="w-full ml-12  mt-8 "
					>

						<Row key={data.name} conversation_id={data.name} />


					</motion.section>
				)}
			</AnimatePresence>


		</section>

	)
}
