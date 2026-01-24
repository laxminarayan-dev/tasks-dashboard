import { Fragment, useState, useEffect } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { FiCode, FiLayers, FiCpu, FiZap } from "react-icons/fi";
import Sidebar from "./Components/Sidebar";
import "./scrollbar.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("html");

  const tasksBySection = {
    html: [
      {
        id: 1,
        title: "Semantic Structure",
        detail: "Build a semantic HTML layout using proper tags.",
      },
      {
        id: 2,
        title: "Forms & Validation",
        detail: "Create accessible forms with native validation attributes.",
      },
      {
        id: 3,
        title: "Tables & Lists",
        detail: "Present data via tables and nested lists effectively.",
      },
      {
        id: 4,
        title: "Media Embeds",
        detail: "Embed images, audio, and video with captions.",
      },
      {
        id: 5,
        title: "Metadata & SEO",
        detail: "Use meta tags, title, and alt text correctly.",
      },
    ],
    "html-css": [
      {
        id: 1,
        title: "Responsive Grid",
        detail: "Implement a responsive grid for a gallery.",
      },
      {
        id: 2,
        title: "Flexbox Layout",
        detail: "Create a header/footer layout with flexbox.",
      },
      {
        id: 3,
        title: "Typography",
        detail: "Style headings, paragraphs, and links consistently.",
      },
      {
        id: 4,
        title: "Theme Toggle",
        detail: "Add light/dark theme using CSS variables.",
      },
    ],
    "html-css-js": [
      {
        id: 1,
        title: "Modal Component",
        detail: "Build a modal with open/close and focus trap.",
      },
      {
        id: 2,
        title: "Form Handling",
        detail: "Validate and submit forms with client-side JS.",
      },
      {
        id: 3,
        title: "Tabs & Accordion",
        detail: "Create interactive tabs and accordion UI.",
      },
    ],
    react: [
      {
        id: 1,
        title: "Stateful Counter",
        detail: "Create a counter with increment/decrement and reset.",
      },
      {
        id: 2,
        title: "Fetch API",
        detail: "Load data with hooks and show loading/error states.",
      },
      {
        id: 3,
        title: "Todo List",
        detail: "CRUD todos with local state and effects.",
      },
      {
        id: 4,
        title: "Context API Setup",
        detail: "Build a theme context provider with light/dark mode.",
      },
      {
        id: 5,
        title: "Custom Hooks",
        detail: "Create useFetch, useLocalStorage, and useDebounce hooks.",
      },
      {
        id: 6,
        title: "Form Validation",
        detail: "Build a form with validation using controlled components.",
      },
      {
        id: 7,
        title: "Search Filter",
        detail: "Implement real-time search with state and filtering.",
      },
      {
        id: 8,
        title: "Pagination",
        detail: "Create pagination controls for a large dataset.",
      },
      {
        id: 9,
        title: "Shopping Cart",
        detail: "Build a cart with add/remove/update quantity features.",
      },
      {
        id: 10,
        title: "User Authentication",
        detail: "Implement login/logout with state and persistence.",
      },
      {
        id: 11,
        title: "Photo Gallery",
        detail: "Create an image gallery with lightbox and navigation.",
      },
      {
        id: 12,
        title: "Weather App",
        detail: "Fetch weather data and display with conditional rendering.",
      },
      {
        id: 13,
        title: "Blog Comments",
        detail: "Build nested comments with add, edit, delete functionality.",
      },
      {
        id: 14,
        title: "User Dashboard",
        detail: "Create a dashboard with charts and profile info.",
      },
      {
        id: 15,
        title: "Real-time Chat",
        detail: "Build a chat interface with messages and user list.",
      },
      {
        id: 16,
        title: "Movie Database",
        detail: "Fetch and display movies with filters and search.",
      },
      {
        id: 17,
        title: "Drag & Drop",
        detail: "Implement drag and drop for tasks or items.",
      },
      {
        id: 18,
        title: "Social Feed",
        detail: "Build a feed with posts, likes, and comments.",
      },
      {
        id: 19,
        title: "Expense Tracker",
        detail: "Track expenses with categories and monthly reports.",
      },
      {
        id: 20,
        title: "Notification System",
        detail: "Create toast/alert notifications with auto-dismiss.",
      },
      {
        id: 21,
        title: "Video Player",
        detail: "Build a custom video player with controls and playlist.",
      },
      {
        id: 22,
        title: "Music Playlist",
        detail: "Create a music player with play queue and metadata.",
      },
      {
        id: 23,
        title: "E-commerce Checkout",
        detail: "Build a multi-step checkout flow with validation.",
      },
    ],
  };

  const sections = [
    {
      key: "html",
      title: "HTML",
      count: tasksBySection["html"].length,
      description: "Markup challenges and semantic structure.",
      Icon: FiCode,
    },
    {
      key: "html-css",
      title: "HTML & CSS",
      count: tasksBySection["html-css"].length,
      description: "Styling, layouts, and responsive design.",
      Icon: FiLayers,
    },
    {
      key: "html-css-js",
      title: "HTML & CSS & JS",
      count: tasksBySection["html-css-js"].length,
      description: "Interactivity and DOM logic tasks.",
      Icon: FiCpu,
    },
    {
      key: "react",
      title: "React",
      count: tasksBySection["react"].length,
      description: "Components, hooks, and state management.",
      Icon: FiZap,
    },
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  const breadcrumbLabel =
    currentSection && currentSection !== "html"
      ? sections.find((s) => s.key === currentSection)?.title || "html"
      : "html";

  return (
    <Fragment>
      {/* overlay backdrop when sidebar is open */}
      {isSidebarOpen && (
        <Fragment>
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-2xl z-30 md:hidden"
            onClick={handleSidebarToggle}
          ></div>
          <button onClick={handleSidebarToggle} className="md:hidden">
            <RxCross2 className="fixed top-6 right-8 text-slate-100 text-2xl cursor-pointer z-40 md:hidden" />
          </button>
        </Fragment>
      )}

      {/* whole body containing sidebar and main content */}
      <div className="relative flex min-h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        {/* main content */}
        <div className="flex-1 p-6 md:p-8 bg-linear-to-br from-slate-50 to-slate-100">
          {/* Top header + mobile trigger */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Dashboard
              </h1>
              <p className="text-sm md:text-base text-slate-600">
                Welcome to Laxmi Narayan's task portfolio
              </p>
            </div>
            <button
              onClick={handleSidebarToggle}
              className={`px-3 py-2 rounded-md cursor-pointer text-slate-700 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 ${isSidebarOpen ? "hidden" : "block"} md:hidden`}
            >
              <CgMenuRightAlt className="text-xl" />
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            <a href="#html" className="hover:text-slate-900">
              Home
            </a>
            <span className="text-slate-400">/</span>
            <span className="font-medium text-slate-900">
              {breadcrumbLabel}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-4">
            {tasksBySection[currentSection].map((task) => (
              <div
                key={task.id}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Task {task.id}: {task.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {task.detail}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                      {breadcrumbLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* {sections.map(({ key, title, count, description, Icon }) => {
              const active = currentSection === key;
              return (
                <div
                  key={key}
                  className={`group rounded-xl border ${active ? "border-slate-300" : "border-slate-200"} bg-white shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="p-5 flex items-start gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"} shadow-inner`}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-semibold text-slate-900">
                          {title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                        >
                          {count} tasks
                        </span>
                      </div>
                      {!active && (
                        <p className="mt-1 text-sm text-slate-600">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                  {active ? (
                    <div className="px-5 pb-5">
                      <div className="rounded-lg border border-slate-200 bg-slate-50">
                        <ul className="divide-y divide-slate-200 max-h-56 overflow-auto">
                          {tasksBySection[key].map((task) => (
                            <li key={task.id} className="p-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="text-sm font-medium text-slate-900">
                                    Task {task.id}: {task.title}
                                  </p>
                                  <p className="text-xs text-slate-600 mt-0.5">
                                    {task.detail}
                                  </p>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                                  {title}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 pb-5">
                      <a
                        href={`#${key}`}
                        className="text-sm font-medium text-slate-700 hover:text-slate-900"
                      >
                        View tasks →
                      </a>
                    </div>
                  )}
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
