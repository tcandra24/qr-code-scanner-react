import DefaultLayout from "../../layouts/Default";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import api from "../../services/api";

const Home = () => {
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
      <DefaultLayout>
        <div className="w-full h-full flex justify-center flex-col items-center bg-cover gap-2">
          <div className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl">
            <Scanner
              paused={isPause}
              scanDelay={2000}
              className="absolute top-0 left-0 bg-black opacity-60 w-full h-full"
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
      </DefaultLayout>
    </>
  );
};

export default Home;
