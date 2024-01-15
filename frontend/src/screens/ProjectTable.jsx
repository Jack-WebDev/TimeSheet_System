
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'


const ProjectTable = () => {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', projects: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/admin/project"
        );
        console.log(response.data.rows)
        setProjects(response.data.rows);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Forbidden: Admin access required!");
      }
    };

    fetchUsers();
  }, []);


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddDepartment = () => {
    // Add logic to handle adding a new department (e.g., API call)
    console.log('Adding department:', newProject);
    // Close the modal after adding
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.ProjectID}>
              <td>{project.ProjectName}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>
        Add Project
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDepartment}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectTable;
