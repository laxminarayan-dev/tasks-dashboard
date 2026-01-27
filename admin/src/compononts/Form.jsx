import { IoAdd } from "react-icons/io5";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { FaHtml5, FaCss3, FaJsSquare, FaReact } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";

function Form({ fetchTasks }) {
  const [selectedTech, setSelectedTech] = useState("html");
  const [isOpen, setIsOpen] = useState(false);
  const [currentLinkInput, setCurrentLinkInput] = useState(null);
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDetail: "",
    siteLink: "",
    codeLink: "",
    technology: "html",
  });
  const [validationErrors, setValidationErrors] = useState({
    taskTitle: "",
    taskDetail: "",
    siteLink: "",
    codeLink: "",
    technology: "",
  });
  const techOptions = [
    { value: "html", icon: <FaHtml5 size={18} /> },
    {
      value: "html-css",
      icon: (
        <div className="flex items-center gap-1">
          <FaHtml5 size={18} />
          <MdAdd size={14} />
          <FaCss3 size={18} />
        </div>
      ),
    },
    {
      value: "html-css-js",
      icon: (
        <div className="flex items-center gap-1">
          <FaHtml5 size={18} />
          <MdAdd size={14} />
          <FaCss3 size={18} />
          <MdAdd size={14} />
          <FaJsSquare size={18} />
        </div>
      ),
    },
    { value: "react", icon: <FaReact size={18} /> },
  ];
  const currentOption = techOptions.find((opt) => opt.value === selectedTech);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`); // Debug log
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      technology: selectedTech,
    }));
  }, [selectedTech]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (formData.taskTitle.trim() === "") {
      errors.taskTitle = "Task Title is required.";
      isValid = false;
    }
    if (formData.taskDetail.trim() === "") {
      errors.taskDetail = "Task Detail is required.";
      isValid = false;
    }
    if (formData.technology.trim() === "") {
      errors.technology = "Technology is required.";
      isValid = false;
    }
    // Both links are required
    if (formData.siteLink.trim() === "") {
      errors.siteLink = "Site link is required.";
      isValid = false;
    }
    if (formData.codeLink.trim() === "") {
      errors.codeLink = "Code link is required.";
      isValid = false;
    }
    // Validate format if not empty
    if (formData.siteLink && !/^https?:\/\/.+\..+/.test(formData.siteLink)) {
      errors.siteLink = "Please enter a valid Site link.";
      isValid = false;
    }
    if (formData.codeLink && !/^https?:\/\/.+\..+/.test(formData.codeLink)) {
      errors.codeLink = "Please enter a valid Code link.";
      isValid = false;
    }

    setValidationErrors(errors);
    setTimeout(() => {
      setValidationErrors({});
    }, 2000);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCurrentLinkInput(null);
    if (validateForm()) {
      try {
        // Send data to backend API (using relative path since admin will be served from same origin)
        const response = await fetch("./api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Task added successfully:", result);
          alert("Task added successfully!");

          // Reset form
          setFormData({
            taskTitle: "",
            taskDetail: "",
            siteLink: "",
            codeLink: "",
            technology: "html",
          });
          setSelectedTech("html");
          setCurrentLinkInput(null);
          fetchTasks();
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error adding task. Please try again.");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-102 sm:max-w-lg bg-linear-to-b from-slate-100 via-indigo-200/30 to-slate-100 rounded-2xl border border-slate-200/60 shadow-md"
      >
        <h1 className="px-6 pt-6 pb-2 text-xl font-semibold text-slate-800">
          Add New Task
        </h1>
        <div
          className={`group rounded-xl border border-slate-300/50 bg-white shadow-sm hover:shadow transition-all duration-200 m-6 mt-3`}
        >
          <div className={`p-5 h-[inherit]`}>
            <div className="flex items-start justify-between mb-3 gap-2">
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  name="taskTitle"
                  onChange={(e) => handleChange(e)}
                  value={formData.taskTitle}
                  placeholder="Task Num : Task Title"
                  className={`w-full border px-2 py-1 rounded-md text-md sm:text-lg font-semibold text-slate-900 ${
                    validationErrors.taskTitle
                      ? "border-red-500"
                      : "border-slate-200"
                  }`}
                />
                {validationErrors.taskTitle && (
                  <p className="text-red-500 text-[10px] px-1">
                    {validationErrors.taskTitle}
                  </p>
                )}

                <input
                  type="text"
                  name="taskDetail"
                  onChange={(e) => handleChange(e)}
                  value={formData.taskDetail}
                  className={`w-full border px-2 py-1 rounded-md text-sm sm:text-md text-slate-600 mt-1 ${
                    validationErrors.taskDetail
                      ? "border-red-500"
                      : "border-slate-200"
                  }`}
                  placeholder="Task Detail"
                />
                {validationErrors.taskDetail && (
                  <p className="text-red-500 text-[10px] px-1">
                    {validationErrors.taskDetail}
                  </p>
                )}
              </div>
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`text-[10px] px-2 py-1 rounded-full bg-slate-50 text-slate-700 border flex items-center gap-1 hover:bg-slate-100 transition ${
                    validationErrors.technology
                      ? "border-red-500"
                      : "border-slate-200"
                  }`}
                >
                  {currentOption?.icon}
                </button>

                {isOpen && (
                  <div className="absolute top-0 right-0 mt-1 w-48 bg-white border border-slate-300 rounded-lg shadow-lg z-100">
                    {techOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSelectedTech(option.value);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition border-b last:border-b-0"
                      >
                        {option.icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative flex gap-2 h-10">
              <div
                className={`flex-1 flex flex-col  ${currentLinkInput == null || currentLinkInput === 0 ? "flex-1" : "flex-0 hidden"}`}
              >
                <button
                  onClick={() => {
                    setCurrentLinkInput((prev) => (prev === 0 ? null : 0));
                  }}
                  type="button"
                  className={`border rounded-2xl flex flex-col items-center justify-center gap-2 text-xs font-medium text-slate-700 px-3 py-2 z-20 min-h-fit ${
                    validationErrors.siteLink
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                >
                  <div className="flex gap-2">
                    <FiExternalLink className="text-sm" />
                    <span>Project Link</span>
                  </div>
                </button>
                {validationErrors?.siteLink && (
                  <p className="text-red-500 text-[10px] px-1">
                    {validationErrors?.siteLink}
                  </p>
                )}
              </div>
              <div
                className={` flex flex-col ${currentLinkInput == null || currentLinkInput === 1 ? "flex-1" : "flex-0 hidden"} `}
              >
                <button
                  onClick={() => {
                    setCurrentLinkInput((prev) => (prev === 1 ? null : 1));
                  }}
                  type="button"
                  className={`rounded-2xl flex items-center justify-center gap-2 text-xs font-medium text-white px-3 py-2 transition-colors z-20 border-2 ${
                    validationErrors.codeLink
                      ? "bg-red-600 border-red-500"
                      : "bg-slate-700 border-slate-700"
                  }`}
                >
                  <FiGithub className="text-sm" />
                  <span>Code Link</span>
                </button>
                {validationErrors?.codeLink && (
                  <p className="text-red-500 text-[10px] px-1">
                    {validationErrors?.codeLink}
                  </p>
                )}
              </div>
            </div>
            {currentLinkInput === 0 && (
              <input
                type="text"
                name="siteLink"
                onChange={(e) => handleChange(e)}
                value={formData.siteLink}
                className={`text-slate-700 border w-full px-4 py-2 rounded-2xl mt-2 placeholder-slate-400 text-sm ${
                  validationErrors.siteLink
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
                placeholder="Paste link here"
              />
            )}
            {currentLinkInput === 1 && (
              <input
                name="codeLink"
                type="text"
                onChange={(e) => handleChange(e)}
                value={formData.codeLink}
                className={`text-slate-700 border w-full px-4 py-2 rounded-2xl mt-2 placeholder-slate-400 text-sm ${
                  validationErrors.codeLink
                    ? "border-red-500"
                    : "border-slate-300"
                }`}
                placeholder="Paste link here"
              />
            )}
          </div>
        </div>
        {/*    */}

        <div className="flex justify-end items-center pb-6 px-6 pt-2">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-linear-to-r from-indigo-500 to-indigo-800/70 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 flex items-center justify-center gap-2 font-medium transition-all shadow-sm hover:shadow-md"
          >
            <IoAdd className="font-bold text-xl" /> Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
