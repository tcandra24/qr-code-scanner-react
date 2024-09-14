import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./providers/appProvider";

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}

export default App;
