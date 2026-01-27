import React from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import Card from "../compononts/Card";

function Tasks() {
  const { tasks } = useTaskContext();
  return (
    <div className="p-6">
      {/* header */}
      <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
      {/* body */}
      <div className="mt-2">
        <p className="text-slate-600">Manage your tasks here.</p>
      </div>
      <div className="mt-8">
        {Object.keys(tasks).map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-xl font-semibold capitalize mb-4">
              {category.replace(/-/g, " ")}
            </h2>
            <div
              className={`grid-scroll grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-6 overflow-y-auto p-4 ${Object.keys(tasks).length > 0 && tasks[category].length > 0 ? "max-h-[calc(100dvh-12rem)]" : "min-h-[calc(100dvh-12rem)]"} `}
            >
              {tasks[category].length > 0 ? (
                tasks[category].map((task) => (
                  <Card key={task.id} task={task} editable={true} />
                ))
              ) : (
                <p className="text-slate-600">No tasks in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
