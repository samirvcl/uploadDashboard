import { Navbar } from "../components/Navbar";

export function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <main style={{width: "100%"}}>{children}</main>
    </div>
  );
}
