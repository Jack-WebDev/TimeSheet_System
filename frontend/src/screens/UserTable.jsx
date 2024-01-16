import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditUser from "../components/EditUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);

  const handleEdit = (userID) => {
    setShowEditModal(true);
    setSelectedUserID(userID);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedUserID(null);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/auth/users");

      setUsers(response.data.response[0]);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Please try again.");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuccess = () => {
    fetchUsers();
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(user.UserID)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.UserID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditUser
        show={showEditModal}
        onHide={handleEditModalClose}
        userID={selectedUserID}
        onEdit={handleSuccess}
      />
    </>
  );
};

// const handleEdit = (UserID) => {
//   axios
//     .put(`http://localhost:8001/api/auth/users/${UserID}`, {})
//     .then((response) => {
//       console.log(response);
//       toast.success("Timesheet status updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating timesheet status:", error);
//     });
// };

const handleDelete = (UserID) => {
  axios
    .delete(`http://localhost:8001/api/auth/users/${UserID}`, {})
    .then((response) => {
      console.log(response);
      toast.success("Timesheet status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating timesheet status:", error);
    });
};

export default UserTable;
