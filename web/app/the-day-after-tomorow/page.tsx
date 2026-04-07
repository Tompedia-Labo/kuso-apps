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

  return (
    <div>
      <h2>明後日の日付</h2>
      <p>{formatted}</p>
    </div>
  );
}
