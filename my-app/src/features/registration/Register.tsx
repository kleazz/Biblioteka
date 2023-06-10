import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({});

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://localhost:7226/api/Authenticate/register/",
        {
          ...input,
        }
      );
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="registrationdiv">
        <div className="biblologo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7cm"
            height="7cm"
            fill="currentColor"
            className="bi bi-book"
            viewBox="0 0 16 18"
            style={{ marginTop: "3cm", marginLeft: "3.7cm", color: "white" }}
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
          <h1 style={{ marginLeft: "4.8cm", color: "white" }}>Biblioteka</h1>
        </div>
        <div
          className="container d-flex justify-content-center align-items-center loginContainer h-75"
          style={{ marginTop: "65px" }}
        >
          <Col>
            <Form onSubmit={handleSubmit} style={{ padding: "20px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                id="loginBtn"
                className="btn btn-success btn-block loginBtn"
              >
                Register
              </Button>
            </Form>
            <div className="d-flex flex-column align-items-center mt-4">
              <span style={{ fontSize: "14px", color: "#61605d" }}>
                Already have an account?
              </span>
              <a href="/" className="link-success">
                Login
              </a>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default Register;
