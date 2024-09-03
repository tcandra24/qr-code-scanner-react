import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast, ToastContainer } from "react-toastify";

import api from "./services/api";

function App() {
  const [isPause, setIsPause] = useState(false);

  const onScan = async (result) => {
    const [readerValue] = result;
    const value = readerValue.rawValue;

    try {
      api.defaults.headers.common["Authorization"] = "123123";

      const { data } = await api.post("/scan-qr", {
        token: value,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center flex-col items-center inset-0 z-50 bg-green-100 overflow-y-scroll bg-cover gap-2">
        <div className="absolute bg-gradient-to-tl from-indigo-600  to-green-600 opacity-80 inset-0 "></div>
        <div className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-64 justify-center items-center bg-no-repeat bg-cover shadow-2xl">
          <Scanner
            paused={isPause}
            scanDelay={2000}
            className="absolute bg-black opacity-60 inset-0 "
            onScan={onScan}
          />
        </div>
        <div className="relative flex ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsPause(!isPause)}
          >
            {isPause ? "Scan" : "Pause"}
          </button>
        </div>
      </div>
      <ToastContainer theme="colored" position="bottom-right" />
    </>
  );
}

export default App;
