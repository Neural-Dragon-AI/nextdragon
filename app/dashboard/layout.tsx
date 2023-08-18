
export default function Layout(props: {
	children: React.ReactNode
	modal: React.ReactNode
}) {
	return (
		<div className="h-screen w-screen bg-transparent m-0 p-0 z-0 flex justify-center items-center">
			{props.children}
			{props.modal}

		</div>
	)
}
