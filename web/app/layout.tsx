import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToListButton from "./BackToListButton";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// const mplusrounded1c = M_PLUS_Rounded_1c({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
// });
//

export const metadata: Metadata = {
	title: "くそアプリ",
	description: "Made by Tompedia_Lab",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="ja"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body
				className="min-h-full flex flex-col"
				style={{ textAlign: "center", backgroundColor: "#825DAB" }}
			>
				<BackToListButton />
				{children}
				<small style={{ color: "white" }}>
					© 2026 とんペディア_ラボ. All rights reserved.
				</small>
			</body>
		</html>
	);
}
