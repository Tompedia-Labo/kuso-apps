import type { CaptchaPattern } from "./types";

export const CAPTCHA_PATTERNS: CaptchaPattern[] = [
	{
		targetName: "とん平",
		imagePaths: [
			"/captcha/traffic-1.svg",
			"/captcha/bus.svg",
			"/captcha/tree.svg",
			"/captcha/road.svg",
			"/captcha/traffic-2.svg",
			"/captcha/car.svg",
			"/captcha/bridge.svg",
			"/captcha/crosswalk.svg",
			"/captcha/traffic-3.svg",
		],
		correctIndexes: [0, 4, 8],
	},
];

export const ORIENTATION_IMAGES = [
	"img/login/bike-1.svg",
	"img/login/bike-2.svg",
	"img/login/bike-3.svg",
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

export function pickTargetRotation(): number {
	return ORIENTATION_ANGLES[
		Math.floor(Math.random() * ORIENTATION_ANGLES.length)
	];
}

export function normalizeRotation(value: number): number {
	return ((value % 360) + 360) % 360;
}
