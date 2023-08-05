import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BabyDragon',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="h-screen w-screen bg-black m-0 p-0 flex justify-center items-center">

					{children}

			</body>
		</html>
	)
}
