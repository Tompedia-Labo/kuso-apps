export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{
        backgroundColor: "white",
        color: "black"
      }}>明日の翌日は？</h1>
      <hr style={{ margin: "20px 0" }} />
      {children}
    </div>
  );
}
