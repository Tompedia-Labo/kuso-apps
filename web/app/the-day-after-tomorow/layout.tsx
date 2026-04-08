export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{textAlign: "center", backgroundColor: "#825DAB"}}>
      {children}
      <small style={{ color: "white"}}>© 2026 とんペディア_ラボ. All rights reserved.</small>
    </div>
  );
}
