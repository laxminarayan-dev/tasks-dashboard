import React, { Fragment } from "react"
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "./Components/Sidebar"


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);


  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  return (
    <Fragment>
      {/* overlay backdrop when sidebar is open */}
      {isSidebarOpen && (
        <Fragment>

          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-2xl z-30 md:hidden"
            onClick={handleSidebarToggle}
          >
          </div>
          <button onClick={handleSidebarToggle}>
            <RxCross2 className="fixed top-6 right-8 text-slate-100 text-2xl cursor-pointer z-40 md:hidden" />
          </button>
        </Fragment>
      )}

      {/* whole body containing sidebar and main content */}
      <div className="relative flex min-h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />

        {/* main content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1>Welcome to Laxmi Narayan's Website</h1>
            <button
              onClick={handleSidebarToggle}
              className={`px-4 py-2 cursor-pointer text-slate-700 ${isSidebarOpen ? 'hidden' : 'block'} md:hidden `}
            >
              <CgMenuRightAlt className="text-2xl" />
            </button>
          </div>
          <p>This is the main content area.</p>
        </div>
      </div>
    </Fragment>
  )
}

export default App
