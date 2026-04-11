export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{textAlign: "center", backgroundColor: "#825DAB"}}>
      {children}
    </div>
  );
}
