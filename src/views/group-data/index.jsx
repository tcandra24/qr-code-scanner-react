import DefaultLayout from "../../layouts/Default";
import { useEffect, useReducer } from "react";
import { dataReducer, INITIAL_STATE } from "../../reducers/dataReducer";
import { useAppState } from "../../providers/appProvider";
import { toast } from "react-toastify";

// components
import CardImage from "../../components/card-image";

import api from "../../services/api";

const Index = () => {
  const [stateData, dispatchData] = useReducer(dataReducer, INITIAL_STATE);
  const { base_url, group_end_point, group_detail_end_point, token } =
    useAppState();

  const getData = async () => {
    if (base_url && group_end_point && group_detail_end_point) {
      try {
        const apiService = api(base_url);
        apiService.defaults.headers.common["Authorization"] = token;

        const { data } = await apiService.get(group_end_point);

        if (!data.success) {
          throw new Error(data.message);
        }

        dispatchData({
          type: "GET_GROUP",
          payload: data.data,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {stateData.groups && stateData.groups.length === 0 && (
          <div className="lg:w-1/4 w-full">
            <div
              className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Info!</span> Group is Empty
              </div>
            </div>
          </div>
        )}

        {stateData.groups &&
          stateData.groups.length > 0 &&
          stateData.groups.map((group, index) => (
            <CardImage key={index} group={group} />
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Index;
