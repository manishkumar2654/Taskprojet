import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from "react-bootstrap/Table";
import right from "../images/right.avif";
import wrong from "../images/w.webp";
import Button from "react-bootstrap/esm/Button";
import Pagination from "react-bootstrap/Pagination";
import "../css/TaskDetail.css"; 

const TaskDetail = () => {
  const [mydata, setMydata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const loadData = async () => {
    let api = `${BackEndUrl}/admin/taskdetail`;
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

  const changeTaskStatus = async (id) => {
    let api = `${BackEndUrl}/admin/changetaskstatus/?id=${id}`;
    try {
      await axios.get(api);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    let api = `${BackEndUrl}/admin/deletetask/?id=${id}`;
    try {
      await axios(api);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = mydata.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(mydata.length / tasksPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="task-detail-container">
      <h2 className="task-detail-heading">Task Detail List</h2>

      <div className="task-table-wrapper">
        <Table striped bordered hover responsive className="task-detail-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((key, index) => (
              <tr key={key._id}>
                <td>
                  <img
                    src={key.taskstatus ? right : wrong}
                    width="30"
                    height="30"
                    alt="status"
                    className="status-icon"
                  />
                </td>
                <td>{indexOfFirstTask + index + 1}</td>
                <td>{key.userid.name}</td>
                <td>{key.userid.email}</td>
                <td>{key.title}</td>
                <td>{key.description}</td>
                <td>
                  {key.taskstatus ? (
                    <Button
                      variant="success"
                      size="sm"
                      className="task-action-btn"
                      onClick={() => changeTaskStatus(key._id)}
                    >
                      ReAssign
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      size="sm"
                      className="task-action-btn"
                      disabled
                    >
                      Pending...
                    </Button>
                  )}
                </td>
                <td
                  className="task-delete-cell"
                  onClick={() => deleteTask(key._id)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="task-pagination">
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default TaskDetail;
