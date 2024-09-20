import DefaultLayout from "../../layouts/Default";
import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import { useAppState } from "../../providers/appProvider";

import api from "../../services/api";

const Home = () => {
  const [isPause, setIsPause] = useState(false);
  const [resultScan, setResultScan] = useState("");

  const { base_url, scan_end_point, token } = useAppState();

  const onScan = async (result) => {
    const [readerValue] = result;
    const value = readerValue.rawValue;

    setResultScan(value);

    if (base_url && scan_end_point) {
      try {
        const apiService = api(base_url);
        apiService.defaults.headers.common["Authorization"] = token;

        const { data } = await apiService.post(scan_end_point, {
          token: value,
        });

        if (!data.success) {
          throw new Error(data.message);
        }

        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isUrl = (value) => {
    const urlRegex =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i;

    return urlRegex.test(value);
  };

  return (
    <>
      <DefaultLayout>
        <div className="w-full h-full flex justify-center flex-col items-center bg-cover gap-2">
          <div className="w-auto">
            <div className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl">
              <Scanner
                paused={isPause}
                scanDelay={2000}
                className="absolute top-0 left-0 bg-black opacity-60 w-full h-full"
                onScan={onScan}
                onError={(error) => console.error(error)}
              />
            </div>
          </div>
          <div className="relative flex gap-2">
            <div className="w-1/4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsPause(!isPause)}
              >
                {isPause ? "Scan" : "Pause"}
              </button>
            </div>
          </div>
          {isUrl(resultScan) ? (
            <div className="relative flex my-3">
              <a href={resultScan} target="_blank">
                <span class="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded ">
                  {resultScan}
                </span>
              </a>
            </div>
          ) : (
            ""
          )}
          <div className="relative flex my-3">
            <textarea
              className="w-96 border-2 rounded border-gray-300"
              cols="30"
              rows="5"
              value={resultScan}
              disabled={true}
            ></textarea>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
