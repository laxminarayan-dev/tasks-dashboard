import Form from "../compononts/Form";
import Card from "../compononts/Card";
import { useTaskContext } from "../hooks/useTaskContext";

function Main() {
  const { displayData, fetchTasks } = useTaskContext();
  return (
    <>
      {/* actual content */}
      <div className="py-9 px-10 pb-16 min-h-screen bg-slate-50">
        {/* header */}
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        {/* body */}
        <div className="mt-2">
          <p className="text-slate-600">Welcome to the admin panel!</p>
        </div>

        <div className="mt-8 flex flex-col gap-10">
          <Form fetchTasks={fetchTasks} />
          <div>
            <h1 className="text-xl font-bold">Recent Tasks</h1>
            <div className="mt-4 grid-scroll grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayData.length > 0 ? (
                displayData.map((task) => <Card key={task.id} task={task} />)
              ) : (
                <p className="text-slate-600">No tasks available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
