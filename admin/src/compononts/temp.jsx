import { FaHtml5, FaCss3, FaJsSquare, FaReact } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { FiExternalLink, FiGithub } from "react-icons/fi";

function Card({ task }) {
  return (
    <div
      key={task.id}
      className={`group rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 via-indigo-100 to-slate-50 shadow-sm hover:shadow-md transition-all duration-1000 ease-in-out overflow-hidden h-34 max-w-102`}
    >
      <div className={`p-5 h-[inherit]`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-md font-semibold text-slate-900 line-clamp-1">
              {task.title || "Untitled Task"}
            </p>
            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
              {task.detail || "No details provided."}
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 ml-2 flex items-center gap-1">
            {task.technology === "html" ? (
              <FaHtml5 size={18} />
            ) : task.technology === "html-css" ? (
              <>
                <FaHtml5 size={18} />
                <MdAdd size={14} />
                <FaCss3 size={18} />
              </>
            ) : task.technology === "html-css-js" ? (
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
            aria-label="view-project"
            onClick={() => window.open(task.link || "#", "_blank")}
            className={`bg-white border border-slate-300 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-700 px-3 py-2 z-20`}
          >
            <FiExternalLink className="text-sm" />
            <span>View Project</span>
          </button>
          <button
            aria-label="view-code"
            onClick={() => window.open(task.code || "#", "_blank")}
            className={`bg-slate-700 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-white px-3 py-2 transition-colors z-20`}
          >
            <FiGithub className="text-sm" />
            <span>View Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
