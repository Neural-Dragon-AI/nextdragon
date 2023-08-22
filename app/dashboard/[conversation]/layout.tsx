import { ReactNode } from "react"

export default function Layout(props: {
	children: React.ReactNode
	modal: React.ReactNode
	stash: React.ReactNode
	editor: ReactNode
}) {



	return (
		<div className="h-screen w-screen bg-transparent m-0 p-0 z-0 flex flex-col justify-start  items-center ">
			{props.children}
			{props.modal}
			<section className="w-[98%]  rounded-md h-[90%] flex flex-row justify-between ">
				{props.stash}
				{props.editor}
			</section>
		</div>
	)
}
