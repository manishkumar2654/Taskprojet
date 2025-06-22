import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BackEndUrl from '../config/BackendUrl';
import { useState } from 'react';
import axios from 'axios';
import "../css/CreateUser.css"; 

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackEndUrl}/admin/usercreation`;
    try {
      const response = await axios.post(api, {
        name: name,
        email: email,
        designation: designation,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="create-user-heading">Create New User</h2>
      <Form className="create-user-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDesignation">
          <Form.Label>Select Designation</Form.Label>
          <Form.Select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value="">-- Select Designation --</option>
            <option>Programmer</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>DataBase Developer</option>
            <option>Analyst</option>
            <option>Coder</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="create-user-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
