import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import EditDepartment from "./EditDepartment";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);

  const handleEdit = (DepartmentID) => {
    setShowEditModal(true);
    setSelectedUserID(DepartmentID);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedUserID(null);
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/admin/department"
      );
      setDepartments(response.data.rows);
    } catch (error) {
      console.error("Error fetching department:", error);
      toast.error("Forbidden: Admin access required!");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSuccess = () => {
    fetchDepartments();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddDepartment = () => {
    axios
      .post(`http://localhost:8001/api/admin/department`, {
        departmentName,
      })
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        toast.success("Department details updated successfully");
      })
      .catch((error) => {
        console.error("Error updating department details:", error);
      });

    handleCloseModal();
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
              <td>{department.projectCount}</td>
              <td>
                {" "}
                <Button
                  className="me-3"
                  variant="secondary"
                  onClick={() => handleEdit(department.DepartmentID)}
                >
                  Edit
                </Button>
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
      </Table>
        <Button className="mt-3" variant="primary" onClick={handleShowModal}>
          Add
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
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
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

      <EditDepartment
        show={showEditModal}
        onHide={handleEditModalClose}
        DepartmentID={selectedUserID}
        onEdit={handleSuccess}
      />
    </>
  );
};

export default DepartmentTable;
