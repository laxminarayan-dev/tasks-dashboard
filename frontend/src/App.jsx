import { Fragment, useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Overlay from "./Components/Overlay";
import MainContent from "./Components/MainContent";
const backend_url = import.meta.env.VITE_BACKEND_URL;

// import taskData from "./store/taskData";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("html");
  const [taskData, setTaskData] = useState({});
  const [breadcrumbLabel, setBreadcrumbLabel] = useState("HTML");
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        console.log("backend url: ", backend_url);

        const response = await fetch(`${backend_url}/api/tasks`);
        const data = await response.json();
        setTaskData(data.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchTaskData();
  }, []);

  useEffect(() => {
    const section = location.pathname.replace("/", "");
    setCurrentSection(section || "html");
    setBreadcrumbLabel(`${section.toUpperCase() || "HTML"}`);
  }, [location]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <Fragment>
      {/* overlay backdrop when sidebar is open */}
      <Overlay
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* whole body containing sidebar and main content */}
      <div className="relative flex min-h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
          currentSection={currentSection}
        />

        {/* main content */}
        <div className="flex-1 p-6 md:p-8 bg-linear-to-br from-slate-50 to-slate-100">
          {/* Top header + mobile trigger */}
          <MainContent
            taskData={taskData}
            currentSection={currentSection}
            breadcrumbLabel={breadcrumbLabel}
            handleSidebarToggle={handleSidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
