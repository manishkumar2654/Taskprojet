import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../css/UserDashBoard.css"; 

const UserDashBoard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="user-dashboard-container">
      <header className="user-dashboard-header">
        <h1>User Dashboard</h1>
      </header>

      <div className="user-dashboard-welcome">
        <p>
          Welcome: <strong>{localStorage.getItem("username")}</strong>!
          <a href="#" onClick={logout} className="user-dashboard-logout">
            Logout
          </a>
        </p>
      </div>

      <div className="user-dashboard-navbar">
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
          <Container>
            <Navbar.Brand>User Area</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
              <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
              <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
              <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <main className="user-dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashBoard;
