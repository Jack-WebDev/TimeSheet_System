import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import EditProject from "../components/EditProject";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);

  const handleEdit = (ProjectID) => {
    setShowEditModal(true);
    setSelectedUserID(ProjectID);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedUserID(null);
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/project"
      );
      setProjects(response.data.rows);
    } catch (error) {
      console.error("Error fetching Project:", error);
      toast.error("Forbidden: Admin access required!");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSuccess = () => {
    fetchProjects();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddProject = () => {
    axios
      .post(`http://localhost:8001/api/admin/project`, {
        projectName,
      })
      .then((response) => {
        console.log(response);
        toast.success("Project details updated successfully");
      })
      .catch((error) => {
        console.error("Error updating Project details:", error);
      });

    handleCloseModal();
  };

  const handleDelete = (ProjectID) => {
    axios
      .delete(`http://localhost:8001/api/admin/project/${ProjectID}`)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        toast.success("Project has been deleted");
      })
      .catch((error) => {
        console.error("Error deleting status:", error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((Project) => (
            <tr key={Project.ProjectID}>
              <td>{Project.ProjectName}</td>
              <td>
                {" "}
                <Button
                  className="me-3"
                  variant="secondary"
                  onClick={() => handleEdit(Project.ProjectID)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(Project.ProjectID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <Button className="mt-3" variant="primary" onClick={handleShowModal}>
          Add
        </Button>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      <EditProject
        show={showEditModal}
        onHide={handleEditModalClose}
        ProjectID={selectedUserID}
        onEdit={handleSuccess}
      />
    </>
  );
};

export default ProjectTable;
