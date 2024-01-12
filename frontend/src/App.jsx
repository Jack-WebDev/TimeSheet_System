import { Outlet } from "react-router-dom";
// import { Container } from "react-bootstrap";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <ToastContainer/>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
