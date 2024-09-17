import DefaultLayout from "../../layouts/Default";
import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";

import { useAppState } from "../../providers/appProvider";

import api from "../../services/api";

const Home = () => {
  const [isPause, setIsPause] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const { baseUrl, scanEndPoint, token } = useAppState();

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setCameras(videoDevices);

    if (videoDevices.length > 0) {
      setSelectedCamera(videoDevices[0].deviceId);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const onScan = async (result) => {
    const [readerValue] = result;
    const value = readerValue.rawValue;

    if (!baseUrl) {
      toast.error("Base URL Belum terisi");

      return;
    }

    if (!scanEndPoint) {
      toast.error("End Point Belum terisi");

      return;
    }

    try {
      const apiService = api(baseUrl);
      apiService.defaults.headers.common["Authorization"] = token;

      const { data } = await apiService.post(scanEndPoint, {
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

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="w-full h-full flex justify-center flex-col items-center bg-cover gap-2">
          {cameras && (
            <div className="relative flex w-full">
              <div className="max-w-sm mx-auto">
                <label
                  htmlFor="cameras"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select camera
                </label>
                <select
                  id="cameras"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  onChange={(e) => handleCameraChange(e)}
                  value={selectedCamera}
                >
                  <option>Choose a camera</option>
                  {cameras.map((camera) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                      {camera.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl">
            <Scanner
              paused={isPause}
              scanDelay={2000}
              className="absolute top-0 left-0 bg-black opacity-60 w-full h-full"
              onScan={onScan}
              constraints={{ video: { deviceId: selectedCamera } }}
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
