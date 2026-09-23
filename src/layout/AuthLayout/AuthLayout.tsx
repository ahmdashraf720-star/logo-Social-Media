import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
     <div className="min-h-screen bg-[#FFF9F5]">
      <Outlet />
    </div>
  )
}
