export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#1d1b20" }}>
      {children}
    </div>
  );
}
