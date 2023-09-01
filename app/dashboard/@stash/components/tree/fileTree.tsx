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

	const setFileOpen = useNextStore(state => state.setFileOpen)
	const file_open = useNextStore(state => state.file_open)
	console.log(file_open)
	const handleRightClick = () => {
		console.log("Hai fatto clic con il tasto destro su:!", data.name);
	};

	return (
		<AnimatePresence>
			{file_open[data.name.replace(/\s/g, "").toLowerCase()] && (
				<section key={data.name} className="w-auto h-full  relative py-1 ">
					<motion.section
						key={data.name}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.05 }}
						className="w-full  mt-0 "
					>
						<Row key={data.name} conversation_id={data.name} />
					</motion.section>
				</section>

			)}
			{!file_open[data.name.replace(/\s/g, "").toLowerCase()] &&
				(<section key={data.name} className="w-auto h-full  relative pt-1 pb-2 ">
					<button
						onClick={() => setFileOpen(data.name.replace(/\s/g, "").toLowerCase(), true)}
						onContextMenu={handleRightClick}
						className="absolute top-0 left-0 w-fit flex flex-row items-center truncate rounded-md p-0.5 text-white"
					>

						<div className="font-proxima w-fit h-6 p-0.5 text-sm rounded-md cursor-pointer hover:text-emerald-400">
							{data.name}
						</div>
					</button>
				</section>

				)}
		</AnimatePresence>



	)
}
