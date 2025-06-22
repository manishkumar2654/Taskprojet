import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../css/AssignTask.css";

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [input, setInput] = useState({});
  const [show, setShow] = useState(false);
  const [userid, setUserid] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (uid) => {
    setUserid(uid);
    setShow(true);
  }

  const loadData = async () => {
    let api = `${BackEndUrl}/admin/showuserdata`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackEndUrl}/admin/assigntask`;
    try {
      const response = await axios.post(api, { ...input, userid });
      console.log(response.data);
      handleClose(); // close modal on success
    } catch (error) {
      console.log(error);
    }
  };

  let no = 0;
  const ans = mydata.map((key) => {
    no++;
    return (
      <tr key={key._id}>
        <td>{no}</td>
        <td>{key.name}</td>
        <td>{key.email}</td>
        <td>{key.designation}</td>
        <td>
          <Button variant="outline-info" className="assign-btn" onClick={() => handleShow(key._id)}>
            Assign Task
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="assign-container">
      <h2 className="assign-heading">Assign Task To User</h2>
      <hr />
      <div className="table-wrapper">
        <Table striped bordered hover responsive className="assign-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="assign-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Enter Task Title</Form.Label>
              <Form.Control type="text" name="title" onChange={handleInput} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Enter Description</Form.Label>
              <Form.Control type="text" name="description" onChange={handleInput} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDay">
              <Form.Label>Completion Day</Form.Label>
              <Form.Control type="text" name="complday" onChange={handleInput} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-task-btn">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignTask;
