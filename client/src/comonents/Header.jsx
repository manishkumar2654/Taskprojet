import '../css/Header.css';
import Form from 'react-bootstrap/Form';
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import BackEndUrl from '../config/BackendUrl';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackEndUrl}/user/userlogin`;
    try {
      const response = await axios.post(api, { email, password });
      console.log(response);
      localStorage.setItem("username", response.data.User.name);
      localStorage.setItem("userid", response.data.User._id);
      navigate("userdashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">The Task Management System</h1>
        <FaUserCircle className="header-user-icon" onClick={handleShow} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="login-modal-form" onSubmit={handleSubmit}>
            <Form.Group className="login-form-group" controlId="formBasicEmail">
              <Form.Label className="login-label">Enter Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="login-form-group" controlId="formBasicPassword">
              <Form.Label className="login-label">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Button className="login-button" variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
