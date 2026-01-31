import { IoClose } from "react-icons/io5";
import { CgMenuRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import Sidebar from "./compononts/Sidebar";
import Main from "./pages/Main";
import Tasks from "./pages/Tasks";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState({});
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPage") || "dashboard",
  );
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Uncomment this when backend is ready
      const response = await fetch("./api/tasks");
      if (response.status !== 200) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Combine all tasks and sort by createdAt descending
    if (tasks === null) return;
    const sortedData = Object.entries(tasks)
      .sort(([, a], [, b]) => new Date(b.createdAt) - new Date(a.createdAt))
      .reduce((acc, [id, value]) => {
        acc[id] = value;
        return acc;
      }, {});

    setDisplayData(sortedData);
  }, [tasks]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900/50 z-10 ${isSidebarOpen ? "block" : "hidden"}`}
      >
        <button aria-label="close-button" className="absolute right-4 top-4">
          <IoClose size={24} className="text-white" />
        </button>
      </div>
      <div className="min-h-screen flex">
        {/* sidebar */}
        <div
          className={`min-h-screen z-20 fixed top-0 md:left-0 transition-all duration-500 ${isSidebarOpen ? "left-0" : "-left-52"}`}
        >
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <main>
          {/* main content */}
          <div className="z-0 flex-1 relative min-h-screen overflow-y-auto md:ml-52">
            <button
              aria-label="menu-button"
              className={`absolute top-4 right-4 text-2xl md:hidden ${isSidebarOpen ? "hidden" : "block"}`}
              onClick={toggleSidebar}
            >
              <CgMenuRight />
            </button>
            {currentPage === "dashboard" && (
              <Main displayData={displayData} fetchTasks={fetchTasks} />
            )}
            {currentPage === "tasks" && (
              <Tasks
                tasks={tasks}
                fetchTasks={fetchTasks}
                setCurrentPage={setCurrentPage}
                loading={loading}
              />
            )}
            {currentPage === "settings" && (
              <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <div className="mt-2">
                  <p className="text-slate-600">Manage your settings here.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
