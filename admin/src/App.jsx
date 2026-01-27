import { IoClose } from "react-icons/io5";
import { CgMenuRight } from "react-icons/cg";
import { useState } from "react";
import Sidebar from "./compononts/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900/50 z-10 ${isSidebarOpen ? "block" : "hidden"}`}
      >
        <button className="absolute right-4 top-4">
          <IoClose size={24} className="text-white" />
        </button>
      </div>
      <div className="min-h-screen flex">
        {/* sidebar */}
        <div
          className={`min-h-screen z-20 fixed top-0 md:left-0 transition-all duration-500 ${isSidebarOpen ? "left-0" : "-left-52"}`}
        >
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        {/* main content */}
        <div className="z-0 flex-1 relative min-h-screen overflow-y-auto md:ml-52">
          <button
            className={`absolute top-4 right-4 text-2xl md:hidden ${isSidebarOpen ? "hidden" : "block"}`}
            onClick={toggleSidebar}
          >
            <CgMenuRight />
          </button>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
