import { Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
	title: "Woool",
	description: "A NEXTJS 14 Meta Threads Application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={spaceGrotesk.className}>
					<TopBar />
					<main className="flex flex-row">
						<LeftSidebar />

						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>

						<RightSidebar />
					</main>
					<BottomBar />
				</body>
			</html>
		</ClerkProvider>
	);
}
