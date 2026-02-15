import logo from "../../assets/logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-65 bg-white flex flex-col justify-between shadow-xl fixed top-0 left-0 h-screen">
      <div className="p-2 mt-2.5">
        <img src={logo} alt="logo...." className="w-52 h-15.5 object-contain" />
        <p className="text-[#6A717F] mb-0.5 text-[15px] px-4 mt-7.25 font-light">
          Product
        </p>
        <nav className="space-y-3 p-1.5 mt-1.5 ">
          <NavLink to="/">
            {({ isActive }) => {
              return <div
                className={` px-4 py-2.25 text-[16px] rounded-lg flex gap-2   items-center
             
                ${isActive ? "bg-[#00B207] font-normal text-white" : "font-light text-[#6A717F]"}
             
             `}
              >
                <LuLayoutDashboard className="size-5.5" />
                <span>Products</span>
              </div>;
            }}
          </NavLink>

          <NavLink to="/categories">
            {({ isActive }) => {
              return <div
                className={` px-4 py-2.25 text-[16px] rounded-lg flex gap-2   items-center
             
                ${isActive ? "bg-[#00B207] font-normal text-white" : "font-light text-[#6A717F]"}
             
             `}
              >
                <MdOutlineCategory className="size-5.5" />
                <span>Categories</span>
              </div>;
            }}
          </NavLink>

          <NavLink to="/deals">
            {({ isActive }) => {
              return <div
                className={` px-4 py-2.25 text-[16px] rounded-lg flex gap-2   items-center
             
                ${isActive ? "bg-[#00B207] font-normal text-white" : "font-light text-[#6A717F]"}
             
             `}
              >
                <CiDiscount1 className="size-5.5" />
                <span>Deals</span>
              </div>;
            }}
          </NavLink>
          <NavLink to="/blogs">
            {({ isActive }) => {
              return <div
                className={` px-4 py-2.25 text-[16px] rounded-lg flex gap-2   items-center
             
                ${isActive ? "bg-[#00B207] font-normal text-white" : "font-light text-[#6A717F]"}
             
             `}
              >
                <BsLayoutTextWindowReverse className="size-5.5" />
                <span>Blogs</span>
              </div>;
            }}
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto px-6 pb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <span className="text-sm font-medium">Abiskar</span>
      </div>
    </aside>
  );
}
