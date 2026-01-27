import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Uncomment this when backend is ready
      // const response = await fetch("./api/tasks");
      // const data = await response.json();
      // setTasks(data.data);

      // Placeholder data
      setTasks({
        html: [
          { id: 1, title: "HTML Task 1", createdAt: "2024-06-20T10:00:00Z" },
          { id: 2, title: "HTML Task 2", createdAt: "2024-06-18T12:00:00Z" },
        ],
        "html-css": [
          {
            id: 3,
            title: "HTML-CSS Task 1",
            createdAt: "2024-06-19T09:30:00Z",
          },
        ],
        "html-css-js": [
          {
            id: 4,
            title: "HTML-CSS-JS Task 1",
            createdAt: "2024-06-17T14:15:00Z",
          },
        ],
        react: [
          { id: 5, title: "React Task 1", createdAt: "2024-06-21T08:45:00Z" },
        ],
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    // Combine all tasks and sort by createdAt descending
    const tempData = [
      ...(tasks?.html || []),
      ...(tasks?.["html-css"] || []),
      ...(tasks?.["html-css-js"] || []),
      ...(tasks?.react || []),
    ];
    tempData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setDisplayData(tempData);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, displayData, fetchTasks, loading, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
