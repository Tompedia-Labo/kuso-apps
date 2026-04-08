import styles from "./style.module.css"
export default function Page() {
  const now = new Date();

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(now.getDate() + 2);

  const formatted = dayAfterTomorrow.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const yy = "2026"
  const MM = "04"
  const dd = "11"
  const hh = "04"
  const mm = "56"
  const isAm = true

  return (
    <div>
      <h2>明後日のToDo</h2>
      <div className={styles.mainArea}>
        <div className={styles.datetimeArea}>
          <div className={styles.dateArea}>
            <div className={styles.dateDblock}>{dd}</div>
            <div className={styles.dateYblock}>{yy}</div>
            <div className={styles.dateMblock}>{MM}</div>
          </div>
          <div className={styles.clockArea}>
            <div className={styles.clockAMPMblock}>
              <div className={`${styles.clockAMblock} ${isAm ? styles.selectedAMPM : styles.unselectedAMPM}`}>AM</div>
              <div className={`${styles.clockAMblock} ${isAm ? styles.unselectedAMPM : styles.selectedAMPM}`}>PM</div>
            </div>
            <div className={styles.clockHblock}>{hh}</div>
            <div className={styles.clockMblock}>{mm}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
