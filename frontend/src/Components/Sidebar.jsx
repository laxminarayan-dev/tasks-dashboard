import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, currentSection, handleSidebarToggle }) => {
  const links = [
    { name: "HTML", to: "html", id: 1 },
    { name: "HTML & CSS", to: "html-css", id: 2 },
    { name: "HTML & CSS & JS", to: "html-css-js", id: 3 },
    { name: "React", to: "react", id: 4 },
  ];

  const navigate = useNavigate();

  return (
    // Sidebar container with responsive slide-in and modern styling
    <div
      className={`fixed left-0 top-0 h-screen w-72 md:w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 z-40
            bg-linear-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-950 border-r border-slate-900/10 shadow-2xl`}
    >
      <div className="relative z-20 h-screen flex flex-col">
        {/* Header / Profile */}
        <div className="px-5 pt-6 pb-4 flex items-center gap-3">
          <div className="h-10 w-10 text-slate-200 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-900/90 flex items-center justify-center text-sm font-bold">
            LN
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-slate-950 font-semibold tracking-tight">
              Laxmi Narayan
            </h2>
            <p className="text-xs text-slate-700">Task Dashboard</p>
          </div>
        </div>

        <div className="px-5">
          <div className="h-px w-full bg-slate-900/10" />
        </div>

        {/* Navigation */}
        <nav className="px-5 py-5 flex-1 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider font-semibold mb-3 text-slate-700/60">
            Type of Tasks
          </p>
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = currentSection === link.to;
              return (
                <li key={link.id}>
                  <button
                    aria-label="sidebar-btn"
                    className={`group flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                                        ${
                                          isActive
                                            ? "bg-slate-900 text-slate-100 border border-slate-900/20 shadow-md"
                                            : "text-slate-700/70 hover:text-slate-900 hover:bg-white/5"
                                        }`}
                    onClick={() => {
                      navigate(`/${link.to}`);
                      handleSidebarToggle();
                    }}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${isActive ? "bg-violet-400" : "bg-slate-900/40 group-hover:bg-slate-900/70"}`}
                    />
                    <span className="truncate">{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
