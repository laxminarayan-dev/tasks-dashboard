import { Fragment } from "react";
import CardGroup from "./CardGroup.jsx";
import { CgMenuRightAlt } from "react-icons/cg";

const MainContent = ({
  taskData,
  currentSection,
  breadcrumbLabel,
  handleSidebarToggle,
  isSidebarOpen,
}) => {
  return (
    <Fragment>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Welcome to Laxmi Narayan's task dashboard.
          </p>
        </div>
        <button
          onClick={handleSidebarToggle}
          className={`px-3 py-2 rounded-md cursor-pointer text-slate-700 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 ${isSidebarOpen ? "hidden" : "block"} md:hidden`}
        >
          <CgMenuRightAlt className="text-xl" />
        </button>
      </div>
      {/* // Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
        <a href="" className="hover:text-slate-900">
          Home
        </a>
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-900">{breadcrumbLabel}</span>
      </div>
      {/* // Cards Grid */}
      <CardGroup taskData={taskData} currentSection={currentSection} />
    </Fragment>
  );
};

export default MainContent;
