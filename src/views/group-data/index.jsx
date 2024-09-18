import DefaultLayout from "../../layouts/Default";
import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { dataReducer, INITIAL_STATE } from "../../reducers/dataReducer";
import { useAppState } from "../../providers/appProvider";
import { toast } from "react-toastify";

import api from "../../services/api";

const Index = () => {
  const [stateData, dispatchData] = useReducer(dataReducer, INITIAL_STATE);
  const { baseUrl, groupEndPoint, groupDetailEndPoint, token } = useAppState();

  const getData = async () => {
    if (baseUrl && groupEndPoint && groupDetailEndPoint) {
      try {
        const apiService = api(baseUrl);
        apiService.defaults.headers.common["Authorization"] = token;

        const { data } = await apiService.get(groupEndPoint);

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
              class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info!</span> Group is Empty
              </div>
            </div>
          </div>
        )}

        {stateData.groups &&
          stateData.groups.length > 0 &&
          stateData.groups.map((group) => (
            <div
              className="lg:w-1/4 w-full rounded overflow-hidden shadow-lg"
              key={group.id}
            >
              <Link to={`/group/${group.slug}`} className="w-full">
                <img className="w-full" src={group.image} alt={group.slug} />
              </Link>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{group.name}</div>
                <p className="text-gray-700 text-base">{group.description}</p>
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Index;
