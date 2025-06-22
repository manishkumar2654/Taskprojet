import "../css/Home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BackEndUrl from '../config/BackendUrl';

const Home = () => {
    const [adminid, setAdminid] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let api = `${BackEndUrl}/admin/logincheck`;
            const response = await axios.post(api, { adminid, password });
            console.log(response);
            localStorage.setItem("adminuser", response.data.admin.name);
            navigate("admindashboard");
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div className="home-form-container">
            <h2 className="home-form-title">Admin Login Form</h2>
            <Form className="home-form" onSubmit={handleSubmit}>
                <Form.Group className="home-form-group" controlId="formBasicEmail">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={adminid}
                        onChange={(e) => setAdminid(e.target.value)}
                        placeholder="Enter ID"
                    />
                </Form.Group>

                <Form.Group className="home-form-group" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Button className="home-login-btn" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Home;
