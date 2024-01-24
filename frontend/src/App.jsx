import { Outlet } from "react-router-dom";
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
