import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EditDepartment = ({ show, onHide, DepartmentID, onEdit}) => {
  const [departmentName, setDepartmentName] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/admin/department/${DepartmentID}`)
      .then((response) => {
        const data = response.data;
        setDepartmentName(data.DepartmentName);
      })
      .catch((error) => {
        console.error("Error fetching department details:", error);
      });
  }, [show, DepartmentID]);

  const handleSave = () => {
    axios
      .put(`http://localhost:8001/api/admin/department/${DepartmentID}`, {
        departmentName,
      })
      .then((response) => {
        console.log(response);
        toast.success("Department details updated successfully");
        onEdit();
        onHide();
      })
      .catch((error) => {
        console.error("Error updating department details:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
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

export default EditDepartment;
