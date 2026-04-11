import styles from "../style.module.css";

export function SuccessStage() {
	return (
		<div className={styles.successStage}>
			<p className={styles.stageTag}>ようこそ！</p>
			<h2 className={styles.stageTitle}>ログインに成功しました</h2>
			<img
				src="/img/login/congrat.png"
				alt="おめでとう"
				width="240"
				className="mt-6"
			/>
		</div>
	);
}
