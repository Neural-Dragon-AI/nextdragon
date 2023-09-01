'use client'
import { useEffect, useState, useTransition } from 'react'
import Image from "next/image"
import { useNextStore, FolderTreeType, FileSystemObject } from '@/store/NextStore'
import { revalidateWorkingMemory, updateWorkingMemory } from '@/actions/workingData'
import { motion } from "framer-motion"

export const Options: React.FC = () => {
	const [showmenu, setShowmenu] = useState(false)
	const [newwork, setNewwork] = useState(false);
	const [deletework, setDeletework] = useState(false);
	const [deleteall, setDeleteall] = useState(false);

	const [newfile, setNewfile] = useState('');

	const [isPending, startTransition] = useTransition()

	const addWorkConversation = useNextStore((state) => state.addWorkConversation)
	const removeWorkConversation = useNextStore((state) => state.removeWorkConversation)

	const working_memory = useNextStore(state => state.working_memory)
	const setWorkingMemory = useNextStore(state => state.setWorkingMemory)


	const active_conv = useNextStore(state => state.active_work_conversation)
	const setActiveConv = useNextStore(state => state.setActiveWorkConversation)

	console.log(active_conv)
	console.log(working_memory)

	/* const updateWorkConversation = () => { */
	/* 	console.log("SENDING.....", [{ name: "new", messages: working_memory[active_conv], id: id }]) */
	/* 	startTransition(() => updateWorkingMemory({ working_data: [{ name: "new", messages: working_memory[active_conv] }], id: id })) */
	/* } */
	/**/

	const handleDeleteWorkConversation = () => {
		let to_delete = active_conv
		let new_conv = active_conv > 0 ? active_conv - 1 : 0
		setActiveConv(new_conv)
		removeWorkConversation(to_delete)
		setDeletework(!deletework)
		setShowmenu(false)
	}

	useEffect(() => {
		!useNextStore.persist.hasHydrated() ? useNextStore.persist.rehydrate() : null

	}, [])



	return <>
		<section className="w-full relative">
			<section className="  w-full  ">
				<div onClick={() => setShowmenu(!showmenu)} className="w-16 hover:text-emerald-400 cursor-pointer text-white font-bold flex flex-row justify-center place-items-center border-2 rounded-md border-white/[.1]">
					File
				</div>
				<motion.section

					initial={{ opacity: 0, scale: 0 }}
					animate={showmenu ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
					transition={{ duration: 0.1 }}
					style={{ originX: 0, originY: 0 }}
					className='space-y-3 bg-black absolute border-emerald-50/[.3] border-b-2  rounded-b-md
            right-0 top-[120%] w-full  mt-0 h-fit
            px-2 pt-3 pb-2 text-sm   
            text-white   
            font-proxima font-bold shadow-lg  shadow-emerald-800/50 flex flex-col place-items-start z-20'>


					{!newwork && !deletework && !deleteall ? (<>

						<button onClick={() => setNewwork(true)} className="px-2 active:bg-emerald-300  border-y-2 w-fit border-y-white/[.2] flex flex-row   justify-start cursor-pointer hover:brightness-125 hover:bg-emerald-50/[.2] rounded-md p-0.5" >
							New in memory
						</button>
						<button onClick={() => setDeletework(true)} className="px-2 active:bg-emerald-300 active:text-white border-y-2  border-y-white/[.2] flex flex-row w-fit  justify-start cursor-pointer  hover:brightness-125 hover:bg-emerald-50/[.2] rounded-md p-0.5" >
							Delete current from memory
						</button>
						<button onClick={() => setDeleteall(true)}  className="px-2 active:bg-emerald-300 active:text-white border-y-2  border-y-white/[.2] flex flex-row w-fit  justify-start cursor-pointer  hover:brightness-125 hover:bg-emerald-50/[.2] rounded-md p-0.5" >
							Delete all from memory
						</button>

						<button className="px-2 active:bg-emerald-300 active:text-white  border-y-2  border-y-white/[.2] flex flex-row w-fit  justify-start cursor-pointer  hover:brightness-125 hover:bg-emerald-50/[.2] rounded-md p-0.5" >
							Save current in stash
						</button>
						<button className="px-2 active:bg-emerald-300 active:text-white border-y-2  border-y-white/[.2] flex flex-row w-fit  justify-start cursor-pointer  hover:brightness-125 hover:bg-emerald-50/[.2] rounded-md p-0.5">
							Save all in stash
						</button>

					</>
					) : newwork ?
						<motion.section
							initial={{ opacity: 0, scale: 0 }}
							animate={newwork ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
							transition={{ duration: 0.1 }}
							className="h-full w-full backdrop-blur-3xl flex flex-col place-items-center z-20"
							style={{ originX: 0.5, originY: 0.5 }}>
							<p className="text-white  text-xs mb-1">Enter a name for your new chat</p>
							<textarea required value={newfile} onChange={(event) => setNewfile(event.target.value)}
								className="h-10 resize-none border-2  bg-transparent  text-white border-white/[.4] outline-none focus:ring-0 focus:border-white/[.6] rounded-md overflow-hidden" />
							<div className="flex flex-row w-full justify-evenly mt-2">
								<button onClick={() => { setNewwork(false), setNewfile(''), setShowmenu(false) }} className="active:bg-red-200 border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-white/[.3] hover:text-white  rounded-md p-0.5" >
									Cancel
								</button>
								<button onClick={() => { addWorkConversation(newfile), setActiveConv(working_memory.length), setNewwork(false), setNewfile(''), setShowmenu(false) }} className="active:bg-emerald-300 active:text-white border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5" >
									Confirm
								</button>
							</div>
						</motion.section>
						: deletework ?
							<motion.section
								initial={{ opacity: 0, scale: 0 }}
								animate={deletework ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
								transition={{ duration: 0.1 }}
								className="h-full w-full backdrop-blur-3xl flex flex-col place-items-center z-20"
								style={{ originX: 0.5, originY: 0.5 }}>
								<div className="mt-2 mb-4 justify-center text-white  text-xs  w-full flex flex-row">Remove object &nbsp;&nbsp;<p className="mx-1 text-emerald-300">{working_memory[active_conv].name}</p> &nbsp;&nbsp;from memory?</div>
								<div className="flex flex-row w-full justify-evenly mt-2">
									<button onClick={() => { setDeletework(false), setShowmenu(false) }} className="active:bg-red-200 border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-white/[.3] hover:text-white  rounded-md p-0.5" >
										Cancel
									</button>
									<button onClick={() => handleDeleteWorkConversation()} className="active:bg-emerald-300 active:text-white border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5" >
										Confirm
									</button>
								</div>
							</motion.section>
						: deleteall ?
							<motion.section
								initial={{ opacity: 0, scale: 0 }}
								animate={deleteall ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
								transition={{ duration: 0.1 }}
								className="h-full w-full backdrop-blur-3xl flex flex-col place-items-center z-20"
								style={{ originX: 0.5, originY: 0.5 }}>
								<div className="mt-2 mb-4 justify-center text-white  text-xs  w-full flex flex-row">This will completely clear your working memory. Are you sure ?</div>
								<div className="flex flex-row w-full justify-evenly mt-2">
									<button onClick={() => { setDeleteall(false), setShowmenu(false) }} className="active:bg-red-200 border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-white/[.3] hover:text-white  rounded-md p-0.5" >
										Cancel
									</button>
									<button onClick={()=> { setWorkingMemory([]), setDeleteall(false), setShowmenu(false) }} className="active:bg-emerald-300 active:text-white border-y-2 w-1/3 border-y-white/[.2] flex flex-row   justify-evenly cursor-pointer text-emerald-400 hover:brightness-125 hover:bg-emerald-50/[.5] rounded-md p-0.5" >
										Confirm
									</button>
								</div>
							</motion.section>

							:
							null}
				</motion.section>


			</section>
		</section>

	</>
}



