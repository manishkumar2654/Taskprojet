import '../css/AdminDashBoard.css';
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="admin-header">
        <h1>Welcome To Admin Dashboard</h1>
      </div>

      <div className="admin-welcome">
        <h5>
          Welcome: {localStorage.getItem("adminuser")}
          <a href="#" onClick={logout} className="admin-logout-link">
            Logout
          </a>
        </h5>
      </div>

      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <Link to="createuser" className="admin-menu-link">
            Create New User
          </Link>
          <br />
          <br />
          <Link to="assigntask" className="admin-menu-link">
            Assign Task
          </Link>
          <br />
          <br />
          <Link to="taskdetail" className="admin-menu-link">
            Task Details
          </Link>
        </div>

        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
