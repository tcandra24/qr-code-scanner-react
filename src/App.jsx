import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}

export default App;
