import DefaultLayout from "../../layouts/Default";
import { useEffect, useReducer } from "react";
import { dataReducer, INITIAL_STATE } from "../../reducers/dataReducer";
import { toast } from "react-toastify";

import api from "../../services/api";

const Data = () => {
  const [stateData, dispatchData] = useReducer(dataReducer, INITIAL_STATE);

  const getData = async () => {
    try {
      api.defaults.headers.common["Authorization"] = "123123";

      const { data } = await api.get("/registrations");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatchData({
        type: "GET_DATA",
        payload: data.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <>
          {stateData &&
            stateData.data.map((data) => (
              <div className="max-w-5xl lg:mx-auto mx-5 mt-8" key={data.id}>
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-500 md:text-5xl lg:text-6xl">
                  {data.name}
                </h2>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
                  {data.description}
                </p>
                {data.registration.map((registration) => (
                  <div
                    className="w-full rounded overflow-hidden shadow-lg my-4"
                    key={registration.id}
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {registration.registration_number}
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="my-4 md:mb-0">
                          <p className="text-gray-700 text-base">
                            {registration.fullname}
                          </p>
                        </div>
                        <div className="my-2 md:mb-0">
                          <span
                            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${
                              registration.is_scan === "Sudah Scan"
                                ? "bg-green-300 text-green-900"
                                : "bg-red-300 text-red-900"
                            }`}
                          >
                            {registration.is_scan}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </>
      </DefaultLayout>
    </>
  );
};

export default Data;
