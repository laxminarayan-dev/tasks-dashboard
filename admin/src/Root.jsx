import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import App from "./App";
import Tasks from "./pages/Tasks";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="/tasks/" element={<Tasks />} />
        <Route path="html-css" element={<Main />} />
        <Route path="html-css-js" element={<Main />} />
        <Route path="react" element={<Main />} />
      </Route>
    </Routes>
  );
}

export default Root;
