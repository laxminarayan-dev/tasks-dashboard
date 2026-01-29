import { Fragment } from "react";
import { RxCross2 } from "react-icons/rx";
const Overlay = ({ isSidebarOpen, handleSidebarToggle }) => {
  return (
    <>
      {isSidebarOpen && (
        <Fragment>
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-2xl z-30 md:hidden"
            onClick={handleSidebarToggle}
          ></div>
          <button
            onClick={handleSidebarToggle}
            className="fixed z-100 md:hidden"
          >
            <RxCross2 className="fixed top-6 right-8 text-slate-100 text-2xl cursor-pointer z-40 md:hidden" />
          </button>
        </Fragment>
      )}
    </>
  );
};
export default Overlay;
