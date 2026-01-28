import { useEffect, useState } from "react";
import Card from "../compononts/Card";
import SkeletonCard from "../compononts/SkeletonCard";

function Tasks({ tasks, fetchTasks, setCurrentPage, loading }) {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const catergory = [];
    if (Object.keys(tasks).length > 0) {
      Object.entries(tasks).map((task) => {
        if (!catergory.includes(task[1]["technology"])) {
          catergory.push(task[1]["technology"]);
        }
      });
    }
    setTechnologies(catergory);
  }, [tasks]);

  return (
    <div className="p-6 flex flex-col">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
        <p className="mt-2 text-slate-600">Manage your tasks here.</p>
      </div>
      {/* body */}
      <div className="mt-8 flex-1">
        {loading && (
          <div
            className={`grid-scroll grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-6 overflow-y-auto p-4 ${Object.keys(tasks).length > 0 && technologies.length > 0 ? "max-h-[calc(100dvh-12rem)]" : "min-h-[calc(100dvh-12rem)]"} `}
          >
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
        {!loading && tasks && technologies.length > 0
          ? technologies.map((category) => (
              <div key={category} className="mb-6">
                <h2 className="text-xl font-semibold capitalize mb-4">
                  {category.replace(/-/g, " ")}
                </h2>
                <div
                  className={`grid-scroll grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-6 overflow-y-auto p-4 ${Object.keys(tasks).length > 0 && technologies.length > 0 ? "max-h-[calc(100dvh-12rem)]" : "min-h-[calc(100dvh-12rem)]"} `}
                >
                  {technologies.length > 0 ? (
                    Object.entries(tasks).map((task) => {
                      if (task[1]["technology"] === category) {
                        return (
                          <Card
                            key={task[0]}
                            data={task}
                            editable={true}
                            fetchTasks={fetchTasks}
                          />
                        );
                      }
                    })
                  ) : (
                    <p className="text-slate-600">No tasks in this category.</p>
                  )}
                </div>
              </div>
            ))
          : !loading && (
              <div className="w-full h-[calc(100dvh-16rem)] flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-violet-600">
                  No Task Created Yet.
                </h3>
                <button
                  className="border border-violet-200 shadow-md cursor-pointer bg-linear-to-br from-violet-50 via-violet-300 to-violet-50 px-4 py-1 rounded-2xl m-4 text-violet-700"
                  onClick={() => {
                    setCurrentPage("dashboard");
                  }}
                >
                  Create One
                </button>
              </div>
            )}
      </div>
    </div>
  );
}

export default Tasks;
