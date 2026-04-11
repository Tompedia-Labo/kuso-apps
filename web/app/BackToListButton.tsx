"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackToListButton() {
	const pathname = usePathname();

	if (pathname === "/") {
		return null;
	}

	return (
		<div
			style={{
				position: "fixed",
				top: "16px",
				left: "16px",
				zIndex: 1000,
			}}
		>
			<Link
				href="/"
				style={{
					display: "inline-block",
					padding: "8px 12px",
					borderRadius: "8px",
					backgroundColor: "rgba(255, 255, 255, 0.9)",
					color: "#333",
					textDecoration: "none",
					fontWeight: 700,
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				}}
			>
				一覧に戻る
			</Link>
		</div>
	);
}
