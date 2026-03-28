import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import productIcon from "../../assets/Dashboradicons/browse.svg";
import categoryIcon from "../../assets/Dashboradicons/category.png";
import blogIcon from "../../assets/Dashboradicons/blog.svg";
import dealsIcon from "../../assets/Dashboradicons/deals.svg";
import ordersIcon from "../../assets/Dashboradicons/orders.svg";
import icon1 from "../../assets/whiteicons/browse.png";
import icon4 from "../../assets/whiteicons/blogs.png";
import icon3 from "../../assets/whiteicons/deals.png";
import icon2 from "../../assets/whiteicons/category.png";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import icon5 from "../../assets/whiteicons/orders.png";

export default function Sidebar() {
  const routes = [
    {
      path: "/",
      label: "Products",
      image: productIcon,
      icon: icon1,
    },
    {
      path: "/categories",
      label: "Categories",
      image: categoryIcon,
      icon: icon2,
    },
    {
      path: "/deals",
      label: "Deals",
      image: dealsIcon,
      icon: icon3,
    },
    {
      path: "/blogs",
      label: "Blogs",
      image: blogIcon,
      icon: icon4,
    },
    {
      path: "/orders",
      label: "Orders",
      image: ordersIcon,
      icon: icon1,
    },
  ];

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <aside className="w-65 bg-white flex flex-col justify-between shadow-xl fixed top-0 left-0 h-screen">
      <div className="p-2 mt-2.5">
        <img src={logo} alt="logo...." className="w-52 h-15.5 object-contain" />
        <p className="text-[#6A717F] mb-0.5 text-[15px] px-4 mt-7.25 font-light">
          Product
        </p>
        <nav className="space-y-3 p-1.5 mt-1.5 ">
          {routes?.map((value, i) => (
            <NavLink to={value.path} key={i}>
              {({ isActive }) => {
                return (
                  <div
                    className={` px-4 py-2.25 text-[16px] rounded-lg flex gap-2   items-center
             
                ${isActive ? "bg-[#00B207] font-normal text-white" : "font-light text-[#6A717F]"}
             
             `}
                  >
                    <img
                      src={isActive ? value.icon : value.image}
                      alt="icons..."
                      className="size-5.5"
                    />
                    <span>{value.label}</span>
                  </div>
                );
              }}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-6 pb-6 flex flex-col justify-start items-start gap-0">
        <div
          className="flex justify-left px-3 py-3 items-center gap-2 duration-200 
         hover:bg-red-100 w-full cursor-pointer rounded-lg text-gray-500"
          onClick={() => onLogout()}
        >
          <div>
            <LogOut size={20} />
          </div>
          <span className="text-sm font-medium">Log out</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img
            src={logo}
            alt=""
            className="w-15 h-15  rounded-full object-contain"
          />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </aside>
  );
}
