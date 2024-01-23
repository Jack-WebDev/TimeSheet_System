import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EditUser = ({ show, onHide, userID, onEdit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch user details based on the userID and populate the form
    axios
      .get(`http://localhost:8001/api/auth/users/${userID}`)
      .then((response) => {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [show, userID]);

  const handleSave = () => {
    // Perform the update using axios.put as you did before
    axios
      .put(`http://localhost:8001/api/auth/users/${userID}`, {
        name,
        email,
        role,
      })
      .then((response) => {
        console.log(response);
        toast.success("User details updated successfully");
        onEdit();
        onHide();
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter full name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select role</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Administrator">Administrator</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
