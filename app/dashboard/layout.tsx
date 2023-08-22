export default function Layout(props: {
	children: React.ReactNode
	modal: React.ReactNode
	stash: React.ReactNode
}) {



	return (
		<div className="h-screen w-screen bg-transparent m-0 p-0 z-0 flex flex-col justify-start  items-center ">
			{props.children}
			{props.modal}
			{props.stash}

		</div>
	)
}
