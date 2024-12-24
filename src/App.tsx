import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import Weather from "./components/pages/Weather";
import "react-toastify/ReactToastify.css";
function App() {
  return (
    <>
      <Weather />
      <ToastContainer />
    </>
  );
}

export default App;
