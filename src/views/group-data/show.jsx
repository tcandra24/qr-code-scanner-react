import DefaultLayout from "../../layouts/Default";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { dataReducer, INITIAL_STATE } from "../../reducers/dataReducer";
import { useAppState } from "../../providers/appProvider";
import { toast } from "react-toastify";

import api from "../../services/api";

const Show = () => {
  const [stateData, dispatchData] = useReducer(dataReducer, INITIAL_STATE);
  // const [search, onSearch] = useState("");
  const { base_url, group_detail_end_point, token } = useAppState();

  const { slug } = useParams();

  const getData = async () => {
    try {
      const apiService = api(base_url);
      apiService.defaults.headers.common["Authorization"] = token;

      const { data } = await apiService.get(
        `${group_detail_end_point}/${slug}`
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatchData({
        type: "GET_GROUP_DETAIL",
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
          {stateData.group && (
            <div className="max-w-5xl lg:mx-auto mx-5 mt-8">
              <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">
                {stateData.group.name}
              </h2>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl">
                {stateData.group.description}
              </p>

              {/* <form className="w-full my-3 mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-500 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search Name.."
                    onChange={(e) => onSearch(e.value.target)}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    Search
                  </button>
                </div>
              </form> */}

              {stateData.group.registration &&
                stateData.group.registration.map((registration) => (
                  <div
                    className="w-full rounded overflow-hidden shadow-lg my-4"
                    key={registration.id}
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        <h2 className="text-gray-700">
                          {registration.registration_number}
                        </h2>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="my-4 md:mb-0">
                          <p className="text-gray-500 text-base font-medium">
                            {registration.fullname}
                          </p>
                          <p className="my-3">
                            {registration.seats.map((seat) => (
                              <span className="bg-green-100 text-green-800 text-lg font-medium me-2 px-2.5 py-0.5 rounded">
                                {seat.name}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="my-2 md:mb-0">
                          <span
                            className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ${
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
          )}
        </>
      </DefaultLayout>
    </>
  );
};

export default Show;
