export type CaptchaPattern = {
	targetName: string;
	imagePaths: string[];
	correctIndexes: number[];
};

export type AuthStage = "login" | "orientation" | "success";
export type RotationDirection = "left" | "right";
export type ChallengePlacement = "right" | "left" | "bottom";

export type ChallengePosition = {
	top: number;
	left: number;
};
