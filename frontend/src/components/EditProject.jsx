import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const EditProject = ({ show, onHide, ProjectID, onEdit }) => {
  const [projectName, setProjectName] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/admin/project/${ProjectID}`)
      .then((response) => {
        const data = response.data;
        setProjectName(data.projectName);
      })
      .catch((error) => {
        console.error("Error fetching Project details:", error);
      });
  }, [show, ProjectID]);

  const handleSave = () => {
    axios
      .put(`http://localhost:8001/api/admin/project/${ProjectID}`, {
        projectName,
      })
      .then((response) => {
        console.log(response);
        toast.success("Project details updated successfully");
        onEdit();
        onHide();
      })
      .catch((error) => {
        console.error("Error updating Project details:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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

export default EditProject;
