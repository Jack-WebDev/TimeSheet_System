import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// UserTable component
const UserTable = () => {
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/auth/users"
        );

        console.log(response.data.response[0])
        setUsers(response.data.response[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
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
  );
};

const handleEdit = () => {
  // Assuming you have an API endpoint to handle the approval/rejection
  axios
    .put(`http://localhost:8001/api/auth/users`, {
    })
    .then((response) => {
      // Update the UI or perform other actions if needed
      console.log(response);
      toast.success("Timesheet status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating timesheet status:", error);
    });
};

const handleDelete = () => {};

export default UserTable;
