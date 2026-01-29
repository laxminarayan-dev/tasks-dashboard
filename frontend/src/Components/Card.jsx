import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaHtml5, FaCss3, FaJsSquare, FaReact } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

function Card({ task, currentSection }) {
  return (
    <div
      className={`group rounded-xl  bg-linear-to-br from-violet-50 via-violet-300 to-violet-50 shadow-sm hover:shadow-md transition-all duration-1000 ease-in-out overflow-hidden h-38`}
    >
      <div className={`p-5 h-[inherit]`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-md font-semibold text-slate-900 line-clamp-1">
              {task[1].title}
            </p>
            <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-1">
              {task[1].detail}
            </p>
            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
              {new Date(task[1].createdAt)
                .toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(",", "")
                .replaceAll("/", "-")}
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-transparent text-slate-700  ml-2 flex items-center gap-1">
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
            onClick={() => window.open(task[1].siteLink, "_blank")}
            className={` bg-violet-200 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-700 px-3 py-2 z-20 hover:bg-violet-500 hover:text-slate-50 cursor-pointer`}
          >
            <FiExternalLink className="text-sm" />
            <span>View Project</span>
          </button>
          <button
            onClick={() => window.open(task[1].codeLink, "_blank")}
            className={`rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-white bg-slate-700 px-3 py-2 transition-colors z-20 hover:bg-slate-900 cursor-pointer`}
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
