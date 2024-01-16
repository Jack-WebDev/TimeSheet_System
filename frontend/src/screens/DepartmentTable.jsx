import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  // const [departmentName, setDepartmentName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: "", projects: 0 });
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [selectedUserID, setSelectedUserID] = useState(null);

  // const handleEdit = (userID) => {
  //   setShowEditModal(true);
  //   setSelectedUserID(userID);
  // };

  // const handleEditModalClose = () => {
  //   setShowEditModal(false);
  //   setSelectedUserID(null);
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/admin/department"
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
    axios
      .post(`http://localhost:8001/api/admin/department`, {
        newDepartment,
      })
      .then((response) => {
        console.log(response);
        toast.success("User details updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });

    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (DepartmentID) => {
    axios
      .delete(`http://localhost:8001/api/admin/department/${DepartmentID}`)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        toast.success("Department has been deleted");
      })
      .catch((error) => {
        console.error("Error deleting status:", error);
      });
  };

  // const handleSave = () => {
  //   // Perform the update using axios.put as you did before
  //   axios
  //     .put(`http://localhost:8001/api/auth/users/${userID}`, {
  //       departmentName,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       toast.success("User details updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating user details:", error);
  //     });
  // };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Number of Projects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.DepartmentID}>
              <td>{department.DepartmentName}</td>
              <td>{department.projects}</td>
              <td>
                {" "}
                {/* <Button className="me-3" variant="secondary" onClick={handleEdit(department.DepartmentID)}>
                  Edit
                </Button> */}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(department.DepartmentID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <Button className="me-3" variant="primary" onClick={handleShowModal}>
          Add
        </Button>
      </Table>

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
                value={newDepartment.departmentName}
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

export default DepartmentTable;
