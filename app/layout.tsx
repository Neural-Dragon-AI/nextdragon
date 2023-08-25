import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'BabyDragon',
	description: 'Your next conv manager.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="h-screen w-screen bg-black m-0 p-0 z-0 ">

					{children}

			</body>
		</html>
	)
}
