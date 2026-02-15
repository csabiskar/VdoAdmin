import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

export default function MainLayout() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Sidebar />
      
      {/* Push content right */}
      <main className="ml-65 pl-5.5 pt-24 pr-14">
        <Outlet />
      </main>
    </div>
  );
}
