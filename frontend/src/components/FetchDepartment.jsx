import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FetchDepartment = async () => {
  // eslint-disable-next-line no-unused-vars
  const [departments, setDepartments] = useState([]);

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

export default FetchDepartment;
