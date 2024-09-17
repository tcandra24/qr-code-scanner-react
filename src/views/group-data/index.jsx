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
    if (!baseUrl) {
      toast.error("Base URL Belum terisi");

      return;
    }

    if (!groupEndPoint) {
      toast.error("End Point Belum terisi");

      return;
    }

    if (!groupDetailEndPoint) {
      toast.error("End Point Belum terisi");

      return;
    }

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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-row flex-wrap gap-5">
        {stateData.groups &&
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
