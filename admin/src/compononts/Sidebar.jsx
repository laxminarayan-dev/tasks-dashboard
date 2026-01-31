import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { useEffect } from "react";

function Sidebar({ currentPage, setCurrentPage, setIsSidebarOpen }) {
  const links = [
    { name: "Dashboard", url: "/dashboard", icon: <MdDashboard /> },
    { name: "Tasks", url: "/tasks", icon: <FaTasks /> },
    { name: "Settings", url: "/settings", icon: <IoSettings /> },
  ];

  return (
    <div className="bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-8 h-screen w-52 flex flex-col gap-8 justify-start">
      <div className="">
        <h1 className="text-2xl text-indigo-50">Admin Panel</h1>
        <h2 className="text-xs text-slate-400">CodeSquadZ's Task</h2>
      </div>
      <hr className="border-slate-700/70" />
      <nav>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li
              className={`flex justify-start items-center gap-2 px-2 py-1 rounded-sm ${currentPage.toLowerCase() === link.name.toLowerCase() ? "text-slate-900 bg-linear-to-r from-indigo-300 via-indigo-400 to-indigo-500 border-l-4 border-indigo-100" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
              key={link.name}
              onClick={() => {
                setIsSidebarOpen(false);
                setCurrentPage(link.name.toLocaleLowerCase());
              }}
            >
              <button
                aria-label="sidebar-button"
                className="flex justify-start items-center gap-2"
              >
                {link.icon} {link.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
