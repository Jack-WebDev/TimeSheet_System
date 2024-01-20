import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8001/api/auth/login', { email, password });
      const { success, role } = response.data;

      console.log(response)
      if (success) {
        setAuthenticated(true);
        setRole(role);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (authenticated) {
    // Redirect based on the user's role
    if (role === 'Employee') {
      return <Navigate to="/employee" />;
    } else if (role === 'Administrator') {
      return <Navigate to="/admin" />;
    } else if (role === 'Manager') {
      return <Navigate to="/manager" />;
    }
  }

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
