import { Fragment, useState, useEffect } from "react";

import Sidebar from "./Components/Sidebar";
import taskData from "./store/taskData.js";
import { useLocation } from "react-router-dom";
import Overlay from "./Components/Overlay.jsx";
import MainContent from "./Components/MainContent.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("html");
  const [breadcrumbLabel, setBreadcrumbLabel] = useState("HTML");
  const location = useLocation();
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
