// components/navbar/Layout.js
import StickyNavbar from "./StickyNavbar";
import { Outlet } from 'react-router-dom'; 

export default function Layout() {
  return (
    <div>

      <div>
        <StickyNavbar />
      </div>

      <main className="page-height">
        <Outlet /> 
      </main>

    </div>
  );
}