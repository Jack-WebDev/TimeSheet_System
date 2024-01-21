import { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:8001/api/auth/login",
        { email, password }
      );
      const { success, role } = response.data;

      console.log(response);
      if (success) {
        setAuthenticated(true);
        setRole(role);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (authenticated) {
    // Redirect based on the user's role
    if (role === "Employee") {
      return <Navigate to="/employee" />;
    } else if (role === "Administrator") {
      return <Navigate to="/admin" />;
    } else if (role === "Manager") {
      return <Navigate to="/manager" />;
    }
  }

  return (
    <div className="d-flex">
    <img src="/illustration-flowing-conversation.svg" alt="" className="login_img" />
    <FormContainer>
      <h1>Login</h1>

      <Form>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin} className="mt-3">
          Login
        </Button>

        <Row className="py-3">
          <Col>
            Dont Have An Account? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
    </div>
  );
};

export default Login;
