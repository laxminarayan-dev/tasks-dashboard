import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaHtml5, FaCss3, FaJsSquare, FaReact } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

const CardGroup = ({ taskData, currentSection }) => {
  return (
    <div
      className={`grid-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 overflow-y-auto p-4 max-h-[calc(100vh-12rem)]`}
    >
      {taskData[currentSection].map((task) => {
        return (
          <div
            key={task.id}
            className={`hover:scale-101 group rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-1000 ease-in-out overflow-hidden h-34`}
          >
            <div className={`p-5 h-[inherit]`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-md font-semibold text-slate-900 line-clamp-1">
                    Task {task.id}: {task.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                    {task.detail}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 ml-2 flex items-center gap-1">
                  {currentSection === "html" ? (
                    <FaHtml5 size={18} />
                  ) : currentSection === "html-css" ? (
                    <>
                      <FaHtml5 size={18} />
                      <MdAdd size={14} />
                      <FaCss3 size={18} />
                    </>
                  ) : currentSection === "html-css-js" ? (
                    <>
                      <FaHtml5 size={18} />
                      <MdAdd size={14} />
                      <FaCss3 size={18} />
                      <MdAdd size={14} />
                      <FaJsSquare size={18} />
                    </>
                  ) : (
                    <FaReact size={18} />
                  )}
                  {/*  */}
                </span>
              </div>
              <div className="relative flex gap-2 h-10">
                <button
                  onClick={() => window.open(task.link, "_blank")}
                  className={`border border-slate-300 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-700 px-3 py-2 z-20`}
                >
                  <FiExternalLink className="text-sm" />
                  <span>View Project</span>
                </button>
                <button
                  onClick={() => window.open(task.code, "_blank")}
                  className={`rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-white bg-slate-700 px-3 py-2 transition-colors z-20`}
                >
                  <FiGithub className="text-sm" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CardGroup;
