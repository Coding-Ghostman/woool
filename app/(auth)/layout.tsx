import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";

export const metadata = {
	title: "Woool",
	description: "A NEXTJS 14 Meta Threads Application",
};

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${spaceGrotesk.className} bg-dark-1`}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
