



export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {



	return <>
		<main className="h-screen w-screen bg-black m-0 p-0  text-emerald-600">
			{children}
		</main>

	</>



}
