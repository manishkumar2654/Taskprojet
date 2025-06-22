import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import "../css/MyTask.css";

const MyTask = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    let api = `${BackEndUrl}/user/mytask/?id=${localStorage.getItem("userid")}`;
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

  const submitTask = async (id) => {
    let api = `${BackEndUrl}/user/completetask/?id=${id}`;
    try {
      await axios.get(api);
    } catch (error) {
      console.log(error);
    }
    loadData();
  };

  const ans = mydata.map((key) => (
    <tr key={key._id}>
      <td>{key.title}</td>
      <td>{key.description}</td>
      <td>{key.comday}</td>
      <td>
        {key.taskstatus ? (
          <Button className="task-btn submitted" disabled>Task Submitted</Button>
        ) : (
          <Button className="task-btn" onClick={() => submitTask(key._id)}>
            Submit Task
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="mytask-container">
      <h3 className="mytask-heading">Task List Given By Admin</h3>
      <div className="mytask-table-wrapper">
        <Table striped bordered hover responsive className="mytask-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completion Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyTask;
