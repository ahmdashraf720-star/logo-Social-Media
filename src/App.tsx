import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/route";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer} from 'react-toastify';


export default function App() {
  return (
    <div>
      
    <RouterProvider router={routes} />
        <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
    />

    </div>
  )
}
