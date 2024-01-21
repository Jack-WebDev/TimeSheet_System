import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role:"",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/api/auth/register",
        form
      );
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      const res = error.response.data;
      // Handle errors
      toast.error(res.error);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your full name..."
            onChange={onChangeHandler}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={onChangeHandler}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={onChangeHandler}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>

        <Row className="py-3">
          <Col>
            Already Have An Account? <Link to="/login">Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
