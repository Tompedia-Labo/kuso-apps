import type { TouchEvent } from "react";
import styles from "../style.module.css";
import type {
	CaptchaPattern,
	ChallengePlacement,
	ChallengePosition,
} from "../types";

type BindTapResult = {
	onClick: () => void;
	onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => void;
};

type BindTap = (action: () => void) => BindTapResult;

type LoginStageProps = {
	isCaptchaVerified: boolean;
	isChallengeOpen: boolean;
	captchaPattern: CaptchaPattern;
	selectedIndexes: number[];
	challengeError: string;
	challengePlacement: ChallengePlacement;
	challengePosition: ChallengePosition;
	recaptchaWrapRef: React.RefObject<HTMLDivElement | null>;
	recaptchaCheckRef: React.RefObject<HTMLSpanElement | null>;
	challengeCardRef: React.RefObject<HTMLDivElement | null>;
	onCaptchaToggle: () => void;
	onToggleTile: (index: number) => void;
	onRefreshChallenge: () => void;
	onVerifyChallenge: () => void;
	onLogin: () => void;
	bindTap: BindTap;
};

export function LoginStage({
	isCaptchaVerified,
	isChallengeOpen,
	captchaPattern,
	selectedIndexes,
	challengeError,
	challengePlacement,
	challengePosition,
	recaptchaWrapRef,
	recaptchaCheckRef,
	challengeCardRef,
	onCaptchaToggle,
	onToggleTile,
	onRefreshChallenge,
	onVerifyChallenge,
	onLogin,
	bindTap,
}: LoginStageProps) {
	return (
		<>
			<h1 className="text-xl font-semibold my-5">ログイン</h1>
			<div className="flex items-center gap-6 w-100">
				<label htmlFor="username" className="whitespace-nowrap">
					ユーザー名
				</label>
				<input
					type="text"
					id="username"
					placeholder="ユーザー名"
          required={true}
					className={`${styles.input} w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6`}
				/>
			</div>
			<div className="flex items-center gap-6 w-100">
				<label htmlFor="password" className="whitespace-nowrap">
					パスワード
				</label>
				<input
					type="password"
					id="password"
					placeholder="パスワード"
          required={true}
					className={`${styles.input} w-full flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6`}
				/>
			</div>
			<div ref={recaptchaWrapRef} className={styles.recaptchaWrap}>
				<div className={styles.recaptcha}>
					<div className={styles.recaptchaMain}>
						<button
							type="button"
							{...bindTap(onCaptchaToggle)}
							className={styles.recaptchaLabel}
							aria-pressed={isCaptchaVerified}
						>
							<span
								ref={recaptchaCheckRef}
								className={`${styles.recaptchaCheck} ${
									isCaptchaVerified ? styles.recaptchaCheckChecked : ""
								}`}
							>
								<span className={styles.recaptchaCheckBox}>
									<span className={styles.recaptchaCheckMark} />
								</span>
							</span>
							<span className={styles.recaptchaText}>
								私はロボットではありません
							</span>
						</button>
					</div>
				</div>

				{isChallengeOpen && (
					<div
						ref={challengeCardRef}
						className={styles.challengeCard}
						data-placement={challengePlacement}
						style={{
							top: challengePosition.top,
							left: challengePosition.left,
						}}
						role="dialog"
						aria-modal="false"
						aria-labelledby="captcha-title"
					>
						<div className={styles.challengeHeader}>
							<p id="captcha-title" className={styles.challengeTitle}>
								<span className="text-2xl font-bold">
									{captchaPattern.targetName}
								</span>
								<br />
								の画像をすべて選択します。
								<br />
								すべて選択し終わったら [確認] をクリックしてください。
							</p>
						</div>
						<div className={styles.challengeGrid}>
							{captchaPattern.imagePaths.slice(0, 9).map((imagePath, index) => (
								<button
									type="button"
									key={imagePath}
									{...bindTap(() => onToggleTile(index))}
									className={`${styles.challengeTile} ${
										selectedIndexes.includes(index)
											? styles.challengeTileSelected
											: ""
									}`}
								>
									<img
										src={imagePath}
										alt={`captcha tile ${index + 1}`}
										width={104}
										height={104}
										className={styles.challengeTileImage}
									/>
									<span className={styles.challengeTileCheck} aria-hidden="true" />
								</button>
							))}
						</div>
						{challengeError && (
							<p className={styles.challengeError}>{challengeError}</p>
						)}
						<div className={styles.challengeFooter}>
							<button
								type="button"
								{...bindTap(onRefreshChallenge)}
								className={styles.challengeActionIcon}
								aria-label="別パターン"
							>
								↻
							</button>
							<button
								type="button"
								{...bindTap(onVerifyChallenge)}
								className={styles.challengeVerify}
							>
								確認
							</button>
						</div>
					</div>
				)}
			</div>
			<button
				type="button"
				{...bindTap(onLogin)}
				disabled={!isCaptchaVerified}
				className={`${styles.button} ${styles.loginSubmit} bg-sky-500 text-white font-semibold py-2 px-20 rounded-sm hover:opacity-70 transition-opacity duration-500 cursor-pointer`}
			>
				ログイン
			</button>
		</>
	);
}
