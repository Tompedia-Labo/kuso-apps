import type { CaptchaPattern } from "./types";

export const CAPTCHA_PATTERNS: CaptchaPattern[] = [
	// {
	// 	targetName: "とん平",
	// 	imagePaths: [
	// 		"/captcha/traffic-1.svg",
	// 		"/captcha/bus.svg",
	// 		"/captcha/tree.svg",
	// 		"/captcha/road.svg",
	// 		"/captcha/traffic-2.svg",
	// 		"/captcha/car.svg",
	// 		"/captcha/bridge.svg",
	// 		"/captcha/crosswalk.svg",
	// 		"/captcha/traffic-3.svg",
	// 	],
	// 	correctIndexes: [0, 4, 8],
	// },
	{
		targetName: "A棟",
		imagePaths: [
			"/img/login/a2.webp",
			"/img/login/b2.webp",
			"/img/login/a1.webp",
			"/img/login/c2.webp",
			"/img/login/j.webp",
			"/img/login/ci.webp",
			"/img/login/a3.webp",
			"/img/login/c1.webp",
			"/img/login/b1.webp",
		],
		correctIndexes: [0, 2, 6],
	},
];

export const ORIENTATION_IMAGES = [
	"/img/login/tompei.webp",
];

export const ORIENTATION_ANGLES = [0, 90, 180, 270] as const;

export function pickPattern(currentTargetName?: string): CaptchaPattern {
	const availablePatterns = CAPTCHA_PATTERNS.filter(
		(pattern) => pattern.targetName !== currentTargetName,
	);
	const pool =
		availablePatterns.length > 0 ? availablePatterns : CAPTCHA_PATTERNS;
	return pool[Math.floor(Math.random() * pool.length)];
}

export function pickInitialRotation(): number {
	const values = [90, 180, 270];
	return values[Math.floor(Math.random() * values.length)];
}

export function pickTargetRotation(initialRotation: number): number {
	const forbiddenAngle = (initialRotation + 270) % 360;
	const availableAngles = ORIENTATION_ANGLES.filter(
		(angle) => angle !== forbiddenAngle && angle !== initialRotation,
	);
	return availableAngles[Math.floor(Math.random() * availableAngles.length)];
}

export function normalizeRotation(value: number): number {
	return ((value % 360) + 360) % 360;
}
