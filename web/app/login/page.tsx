"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";
import {
	normalizeRotation,
	ORIENTATION_IMAGES,
	pickInitialRotation,
	pickPattern,
	pickTargetRotation,
} from "./constants";
import { LoginStage } from "./components/LoginStage";
import { OrientationStage } from "./components/OrientationStage";
import { SuccessStage } from "./components/SuccessStage";
import styles from "./style.module.css";
import type {
	AuthStage,
	CaptchaPattern,
	ChallengePlacement,
	RotationDirection,
} from "./types";

export default function LoginPage() {
	const [authStage, setAuthStage] = useState<AuthStage>("login");
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const [isChallengeOpen, setIsChallengeOpen] = useState(false);
	const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
	const [challengeError, setChallengeError] = useState("");
	const [challengePosition, setChallengePosition] = useState({ top: 8, left: 8 });
	const [challengePlacement, setChallengePlacement] =
		useState<ChallengePlacement>("right");
	const [captchaPattern, setCaptchaPattern] = useState<CaptchaPattern>(() =>
		pickPattern(),
	);
	const [orientationImagePath, setOrientationImagePath] =
		useState<string>("/img/login/bike-1.svg");
	const [orientationRotation, setOrientationRotation] = useState<number>(
		pickInitialRotation,
	);
	const [orientationTargetRotation, setOrientationTargetRotation] =
		useState<number>(0);
	const [areArrowButtonsSwapped, setAreArrowButtonsSwapped] =
		useState<boolean>(false);
	const [orientationError, setOrientationError] = useState("");

	const recaptchaCheckRef = useRef<HTMLSpanElement | null>(null);
	const recaptchaWrapRef = useRef<HTMLDivElement | null>(null);
	const challengeCardRef = useRef<HTMLDivElement | null>(null);
	const lastTouchTapAtRef = useRef(0);

	const answerSet = useMemo(
		() => new Set(captchaPattern.correctIndexes),
		[captchaPattern.correctIndexes],
	);

	const shouldHandleClick = useCallback(
		() => Date.now() - lastTouchTapAtRef.current > 500,
		[],
	);

	const bindTap = useCallback(
		(action: () => void) => ({
			onClick: () => {
				if (!shouldHandleClick()) {
					return;
				}
				action();
			},
			onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => {
				event.preventDefault();
				lastTouchTapAtRef.current = Date.now();
				action();
			},
		}),
		[shouldHandleClick],
	);

	const resetChallenge = useCallback((nextPattern?: CaptchaPattern) => {
		setSelectedIndexes([]);
		setChallengeError("");
		if (nextPattern) {
			setCaptchaPattern(nextPattern);
		}
	}, []);

	const toggleTile = useCallback((index: number) => {
		setChallengeError("");
		setSelectedIndexes((prev) =>
			prev.includes(index)
				? prev.filter((value) => value !== index)
				: [...prev, index],
		);
	}, []);

	const handleRefreshChallenge = useCallback(() => {
		resetChallenge(pickPattern(captchaPattern.targetName));
	}, [captchaPattern.targetName, resetChallenge]);

	const handleCaptchaToggle = useCallback(() => {
		if (isCaptchaVerified) {
			setIsCaptchaVerified(false);
			setIsChallengeOpen(false);
			resetChallenge(pickPattern(captchaPattern.targetName));
			return;
		}
		setIsChallengeOpen(true);
	}, [captchaPattern.targetName, isCaptchaVerified, resetChallenge]);

	const handleVerifyChallenge = useCallback(() => {
		const selectedSet = new Set(selectedIndexes);
		const isCorrect =
			selectedSet.size === answerSet.size &&
			[...selectedSet].every((index) => answerSet.has(index));

		if (!isCorrect) {
			setChallengeError("もう一度お試しください。");
			setIsCaptchaVerified(false);
			return;
		}

		setIsCaptchaVerified(true);
		setIsChallengeOpen(false);
		setChallengeError("");
	}, [answerSet, selectedIndexes]);

	const beginSecondStage = useCallback(() => {
		setIsChallengeOpen(false);
		setOrientationImagePath(
			ORIENTATION_IMAGES[Math.floor(Math.random() * ORIENTATION_IMAGES.length)],
		);
		setOrientationRotation(pickInitialRotation());
		setOrientationTargetRotation(pickTargetRotation());
		setAreArrowButtonsSwapped(false);
		setOrientationError("");
		setAuthStage("orientation");
	}, []);

	const handleLoginSubmit = useCallback(() => {
		if (!isCaptchaVerified) {
			return;
		}
		beginSecondStage();
	}, [beginSecondStage, isCaptchaVerified]);

	const handleRotate = useCallback((direction: RotationDirection) => {
		setOrientationError("");
		setOrientationRotation((prev) =>
			normalizeRotation(prev + (direction === "right" ? 90 : -90)),
		);
		setAreArrowButtonsSwapped((prev) => !prev);
	}, []);

	const handleOrientationVerify = useCallback(() => {
		if (orientationRotation === orientationTargetRotation) {
			setAuthStage("success");
			return;
		}

		setOrientationError(
			"矢印の向きと一致していません。もう少し回してください。",
		);
	}, [orientationRotation, orientationTargetRotation]);

	useEffect(() => {
		if (!isChallengeOpen) {
			return;
		}

		const handlePointerDownOutside = (event: PointerEvent) => {
			const target = event.target as Node | null;
			if (!target) {
				return;
			}

			if (recaptchaWrapRef.current?.contains(target)) {
				return;
			}

			setIsChallengeOpen(false);
			resetChallenge();
		};

		const updateChallengePosition = () => {
			const anchorRect = recaptchaCheckRef.current?.getBoundingClientRect();
			const cardEl = challengeCardRef.current;
			if (!anchorRect || !cardEl) {
				return;
			}

			const gap = 12;
			const viewportPadding = 8;
			const cardWidth = cardEl.offsetWidth;
			const cardHeight = cardEl.offsetHeight;
			const verticalCenter = anchorRect.top + anchorRect.height / 2;
			const centeredTop = verticalCenter - cardHeight / 2;
			const rightSpace = window.innerWidth - anchorRect.right - viewportPadding;
			const leftSpace = anchorRect.left - viewportPadding;

			let left = anchorRect.right + gap;
			let top = centeredTop;

			if (rightSpace >= cardWidth) {
				setChallengePlacement("right");
			} else if (leftSpace >= cardWidth) {
				setChallengePlacement("left");
				left = anchorRect.left - cardWidth - gap;
			} else {
				setChallengePlacement("bottom");
				left = Math.min(
					Math.max(anchorRect.left, viewportPadding),
					window.innerWidth - cardWidth - viewportPadding,
				);
				top = anchorRect.bottom + gap;
				if (top + cardHeight > window.innerHeight - viewportPadding) {
					top = anchorRect.top - cardHeight - gap;
				}
			}

			const minTop = viewportPadding;
			const maxTop = Math.max(
				viewportPadding,
				window.innerHeight - cardHeight - viewportPadding,
			);
			const minLeft = viewportPadding;
			const maxLeft = Math.max(
				viewportPadding,
				window.innerWidth - cardWidth - viewportPadding,
			);

			setChallengePosition({
				top: Math.min(Math.max(top, minTop), maxTop),
				left: Math.min(Math.max(left, minLeft), maxLeft),
			});
		};

		const rafId = window.requestAnimationFrame(updateChallengePosition);
		document.addEventListener("pointerdown", handlePointerDownOutside);
		window.addEventListener("resize", updateChallengePosition);
		window.addEventListener("scroll", updateChallengePosition, true);

		return () => {
			window.cancelAnimationFrame(rafId);
			document.removeEventListener("pointerdown", handlePointerDownOutside);
			window.removeEventListener("resize", updateChallengePosition);
			window.removeEventListener("scroll", updateChallengePosition, true);
		};
	}, [isChallengeOpen, resetChallenge]);

	return (
		<main>
			<div className={styles.mainArea}>
				<img
					src="/img/login/tompedia.png"
					alt="とんペディアロゴ"
					width="256"
					className="mb-8 block"
				/>
				<div className={`${styles.loginBox} flex flex-col gap-3`}>
					{authStage === "login" && (
						<LoginStage
							isCaptchaVerified={isCaptchaVerified}
							isChallengeOpen={isChallengeOpen}
							captchaPattern={captchaPattern}
							selectedIndexes={selectedIndexes}
							challengeError={challengeError}
							challengePlacement={challengePlacement}
							challengePosition={challengePosition}
							recaptchaWrapRef={recaptchaWrapRef}
							recaptchaCheckRef={recaptchaCheckRef}
							challengeCardRef={challengeCardRef}
							onCaptchaToggle={handleCaptchaToggle}
							onToggleTile={toggleTile}
							onRefreshChallenge={handleRefreshChallenge}
							onVerifyChallenge={handleVerifyChallenge}
							onLogin={handleLoginSubmit}
							bindTap={bindTap}
						/>
					)}

					{authStage === "orientation" && (
						<OrientationStage
							orientationImagePath={orientationImagePath}
							orientationRotation={orientationRotation}
							orientationTargetRotation={orientationTargetRotation}
							areArrowButtonsSwapped={areArrowButtonsSwapped}
							orientationError={orientationError}
							onRotate={handleRotate}
							onVerify={handleOrientationVerify}
							bindTap={bindTap}
						/>
					)}

					{authStage === "success" && <SuccessStage />}
				</div>
			</div>
		</main>
	);
}
