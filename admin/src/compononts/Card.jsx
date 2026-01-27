import { FaHtml5, FaCss3, FaJsSquare, FaReact } from "react-icons/fa";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useState } from "react";

function Card({ task, editable = false, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = async () => {
    try {
      const updatedTask = {
        ...editedTask,
        id: task.id,
        technology: task.technology,
      };

      const response = await fetch(`./api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTask.title,
          detail: editedTask.detail,
          link: editedTask.link,
          code: editedTask.code,
          technology: task.technology
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();

      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`./api/tasks/${task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technology: task.technology }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div
      key={task.id}
      className={`group rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 via-indigo-100 to-slate-50 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden ${isEditing ? "min-h-58" : "h-34"} max-w-102`}
    >
      <div className={`p-5 ${isEditing ? "" : "h-[inherit]"}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                  className="text-md font-semibold text-slate-900 w-full border border-slate-300 rounded px-2 py-1 mb-2"
                />
                <textarea
                  value={editedTask.detail}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, detail: e.target.value })
                  }
                  className="text-xs text-slate-600 w-full border border-slate-300 rounded px-2 py-1"
                  rows="2"
                />
              </>
            ) : (
              <>
                <p className="text-md font-semibold text-slate-900 line-clamp-1">
                  {task.title || "Untitled Task"}
                </p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                  {task.detail || "No details provided."}
                </p>
              </>
            )}
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
          </span>
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 mb-3">
            <input
              type="url"
              value={editedTask.link || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, link: e.target.value })
              }
              placeholder="Project Link"
              className="flex-1 text-sm border border-slate-300 rounded px-2 py-1"
            />
            <input
              type="url"
              value={editedTask.code || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, code: e.target.value })
              }
              placeholder="Code Link"
              className="flex-1 text-sm border border-slate-300 rounded px-2 py-1"
            />
          </div>
        ) : null}

        <div className="relative flex gap-2 h-10">
          {editable && isEditing ? (
            <>
              <button
                onClick={handleSave}
                className={`bg-green-600 text-white rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium px-3 py-2 hover:bg-green-700 transition-colors z-20`}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className={`bg-slate-400 text-white rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium px-3 py-2 hover:bg-slate-500 transition-colors z-20`}
              >
                Cancel
              </button>
            </>
          ) : editable ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`bg-blue-600 text-white rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium px-3 py-2 hover:bg-blue-700 transition-colors z-20`}
              >
                <MdEdit className="text-sm" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className={`bg-red-600 text-white rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium px-3 py-2 hover:bg-red-700 transition-colors z-20`}
              >
                <MdDelete className="text-sm" />
                <span>Remove</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => window.open(task.link || "#", "_blank")}
                className={`bg-white border border-slate-300 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-700 px-3 py-2 z-20`}
              >
                <FiExternalLink className="text-sm" />
                <span>View Project</span>
              </button>
              <button
                onClick={() => window.open(task.code || "#", "_blank")}
                className={`bg-slate-700 rounded-2xl flex-1 flex items-center justify-center gap-2 text-xs font-medium text-white px-3 py-2 transition-colors z-20`}
              >
                <FiGithub className="text-sm" />
                <span>View Code</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
