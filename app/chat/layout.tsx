export default function Layout(props: {
	children: React.ReactNode

}) {



	return (
		<div className="h-screen w-screen bg-transparent m-0 p-0 z-0 flex flex-row justify-between items-center ">
			{props.children}
		</div>
	)
}
