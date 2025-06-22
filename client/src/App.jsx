import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./pages/AdminDashBoard";
import CreateUser from "./pages/CreateUser";
import UserDashBoard from "./pages/UserDashBoard";
import MyTask from "./pages/MyTask";
import AssignTask from "./pages/AssignTask";
import TaskDetail from "./pages/TaskDetail";
import "./css/App.css"; 

const App = () => {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="admindashboard" element={<AdminDashBoard />}>
            <Route path="createuser" element={<CreateUser />} />
            <Route path="assigntask" element={<AssignTask />} />
            <Route path="taskdetail" element={<TaskDetail />} />
          </Route>

          <Route path="userdashboard" element={<UserDashBoard />}>
            <Route path="mytask" element={<MyTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
