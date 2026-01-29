import Card from "./Card";
const CardGroup = ({ taskData = {}, currentSection }) => {
  const sectionWiseData = Object.entries(taskData).filter((data) => {
    if (currentSection == data[1]["technology"]) {
      return data;
    }
  });

  return (
    <div
      className={`grid-scroll grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-6 overflow-y-auto p-4 ${Object.keys(taskData).length > 0 && sectionWiseData.length > 0 ? "max-h-[calc(100dvh-12rem)]" : "min-h-[calc(100dvh-12rem)]"} `}
    >
      {Object.keys(taskData).length > 0 && sectionWiseData.length > 0 ? (
        sectionWiseData.map((task) => {
          return (
            <Card key={task[0]} task={task} currentSection={currentSection} />
          );
        })
      ) : (
        <div className="col-span-full text-center text-slate-600 font-medium flex items-center justify-center">
          No tasks available for this topic.
        </div>
      )}
    </div>
  );
};
export default CardGroup;
