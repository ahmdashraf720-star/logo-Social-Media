import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <div>
      
      <div className="min-h-screen bg-[#FFF9F5]">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
