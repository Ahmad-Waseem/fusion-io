import StickyNavbar from "./StickyNavbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">

      <div className="navbar-height">
        <StickyNavbar />
      </div>

      <main className="page-height">
        {children}
      </main>

    </div>
  );
}
