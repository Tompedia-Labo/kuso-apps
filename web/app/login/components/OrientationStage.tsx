import type { TouchEvent } from "react";
import styles from "../style.module.css";
import type { RotationDirection } from "../types";

type BindTapResult = {
	onClick: () => void;
	onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => void;
};

type BindTap = (action: () => void) => BindTapResult;

type OrientationStageProps = {
	orientationImagePath: string;
	orientationRotation: number;
	orientationTargetRotation: number;
	areArrowButtonsSwapped: boolean;
	orientationError: string;
	onRotate: (direction: RotationDirection) => void;
	onVerify: () => void;
	bindTap: BindTap;
};

export function OrientationStage({
	orientationImagePath,
	orientationRotation,
	orientationTargetRotation,
	areArrowButtonsSwapped,
	orientationError,
	onRotate,
	onVerify,
	bindTap,
}: OrientationStageProps) {
	const directions = areArrowButtonsSwapped
		? (["right", "left"] as RotationDirection[])
		: (["left", "right"] as RotationDirection[]);

	return (
		<div className={styles.secondStage}>
			<p className={styles.stageTag}>本当にロボットではありませんか？</p>
			<h2 className={styles.stageTitle}>画像の向きを揃えてください</h2>
			<div className={styles.orientationCard}>
				<div className={styles.orientationPair}>
					<div className={styles.orientationFrame}>
						<div
							className={styles.orientationImage}
							role="img"
							aria-label="向きを合わせる画像"
							style={{
								backgroundImage: `url(${orientationImagePath})`,
								transform: `rotate(${orientationRotation}deg)`,
							}}
						/>
					</div>
					<div className={styles.orientationTarget}>
						<div
							className={styles.orientationTargetArrow}
							role="img"
							aria-label="正しい向きを示す矢印"
							style={{ transform: `rotate(${orientationTargetRotation}deg)` }}
						/>
					</div>
				</div>
				<p className={styles.orientationMeta}>回転ボタンで向きを調整</p>
				<div className={styles.orientationControls}>
					{directions.map((direction) => (
						<button
							type="button"
							key={direction}
							{...bindTap(() => onRotate(direction))}
							className={styles.rotateButton}
						>
							{direction === "left" ? "↺" : "↻"}
						</button>
					))}
				</div>
				{orientationError && (
					<p className={styles.orientationError}>{orientationError}</p>
				)}
				<button
					type="button"
					{...bindTap(onVerify)}
					className={styles.orientationVerify}
				>
					確認
				</button>
			</div>
		</div>
	);
}
