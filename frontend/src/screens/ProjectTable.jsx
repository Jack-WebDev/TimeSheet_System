
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'


const ProjectTable = () => {
  const [departments, setDepartments] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', projects: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/admin/project"
        );
        setDepartments(response.data.rows);
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
    console.log('Adding department:', newDepartment);
    // Close the modal after adding
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Number of Projects</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.DepartmentID}>
              <td>{department.DepartmentName}</td>
              <td>{department.projects}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>
        Add Department
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="departmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                name="name"
                value={newDepartment.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="numberOfProjects">
              <Form.Label>Number of Projects</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of projects"
                name="projects"
                value={newDepartment.projects}
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
            Add Department
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectTable;
