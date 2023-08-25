'use client'
import { useNextStore, FileTreeType } from '@/store/NextStore';
import Link from 'next/link'
import { useEffect, useRef, useCallback} from 'react'



interface FileTreeProps {
	data: FileTreeType;
}

export const FileTree: React.FC<FileTreeProps> = ({ data }) => {
	const active_chat = useNextStore(state => state.active_chat)
	const setActiveChat = useNextStore(state => state.setActiveChat)
	const buttonRef = useRef<HTMLButtonElement>(null);


	const handleRightClick = useCallback((event: MouseEvent) => {
		event.preventDefault();
		console.log("Hai fatto clic con il tasto destro su:!", data.name);
	}, [data.name]);

	useEffect(() => {
		console.log("listening")
		const btn = buttonRef.current;
		if (btn) {
			btn.addEventListener('contextmenu', handleRightClick);

			return () => {
				btn.removeEventListener('contextmenu', handleRightClick);
			};
		}
	}, [handleRightClick]);


	return (
		<>
			<Link
				href={`/dashboard/${data.name.replace(/\s/g, "").toLowerCase()}`}>
				<button
					ref={buttonRef}
					onClick={() => { setActiveChat(data.name), console.log("REDIRECTED to", data.name) }}
					className={`flex flex-row items-center truncate rounded-md p-0.5 ${data.name === active_chat ? 'bg-white/[.5] text-black' : 'text-white'}`}>
					<div className="h-4 w-4">
						<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file2</title> <path d="M11 15h1v-1h-1v1zM11 18h1v-1h-1v1zM11 12h1v-1h-1v1zM11 21h1v-1h-1v1zM11 24h1v-1h-1v1zM13 18h8v-1h-8v1zM13 12h8v-1h-8v1zM20.938 4h-13.938v24h18v-20l-4.062-4zM23 25.938h-14v-19.938h10v2.938h4v17zM13 21h8v-1h-8v1zM13 15h8v-1h-8v1zM13 24h8v-1h-8v1z"></path> </g></svg>
					</div>
					<div className=" font-proxima  w-fit h-6 p-0.5 text-sm  rounded-md cursor-pointer">{data.name}</div>
				</button>
			</Link>
		</>
	)
}
