import { useState } from "react";
import { useAppDispatch } from "../../providers/appProvider";
import DefaultLayout from "../../layouts/Default";
import { useAppState } from "../../providers/appProvider";

const Setting = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [token, setToken] = useState("");
  const [dataEndPoint, setDataEndPoint] = useState("");
  const [scanEndPoint, setScanEndPoint] = useState("");

  const dispatch = useAppDispatch();
  const {
    baseUrl: baseUrlState,
    token: tokenState,
    dataEndPoint: dataEndPointState,
    scanEndPoint: scanEndPointState,
  } = useAppState();

  const submit = (e) => {
    e.preventDefault();

    if (baseUrl) {
      dispatch({
        type: "SET_BASE_URL",
        payload: baseUrl,
      });

      setBaseUrl("");
    }

    if (token) {
      dispatch({
        type: "SET_TOKEN",
        payload: token,
      });

      setToken("");
    }

    if (dataEndPoint) {
      dispatch({
        type: "SET_DATA_END_POINT",
        payload: dataEndPoint,
      });

      setDataEndPoint("");
    }

    if (scanEndPoint) {
      dispatch({
        type: "SET_SCAN_END_POINT",
        payload: scanEndPoint,
      });

      setScanEndPoint("");
    }
  };

  const clear = () => {
    dispatch({
      type: "SET_BASE_URL",
      payload: "",
    });

    dispatch({
      type: "SET_TOKEN",
      payload: "",
    });

    dispatch({
      type: "SET_DATA_END_POINT",
      payload: "",
    });

    dispatch({
      type: "SET_SCAN_END_POINT",
      payload: "",
    });

    setBaseUrl("");
    setToken("");
    setDataEndPoint("");
    setScanEndPoint("");
  };

  return (
    <>
      <DefaultLayout>
        <div className="max-w-lg rounded mx-auto overflow-hidden mb-5">
          <div className="w-full max-w-lg">
            <div className="flex flex-wrap">
              <div className="w-full px-3 mb-6 md:mb-0 p-3">
                <h3 className="uppercase tracking-wide text-gray-700 text-lg font-bold">
                  Base URL
                </h3>
                <p className="text-base">{baseUrlState ? baseUrlState : "-"}</p>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0 p-3">
                <h3 className="uppercase tracking-wide text-gray-700 text-lg font-bold">
                  Token
                </h3>
                <p className="text-base">{tokenState ? tokenState : "-"}</p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 p-3">
                <h3 className="uppercase tracking-wide text-gray-700 text-lg font-bold">
                  Data End Point
                </h3>
                <p className="text-base">
                  {dataEndPointState ? dataEndPointState : "-"}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 p-3">
                <h3 className="uppercase tracking-wide text-gray-700 text-lg font-bold">
                  Scan End Point
                </h3>
                <p className="text-base">
                  {scanEndPointState ? scanEndPointState : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg rounded mx-auto overflow-hidden shadow-lg p-10 border-2">
          <form className="w-full max-w-lg" onSubmit={submit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="base-url"
                >
                  Base URL
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="base-url"
                  type="text"
                  onChange={(e) => setBaseUrl(e.target.value)}
                  value={baseUrl}
                  placeholder="Base URL"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="token"
                >
                  Token
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="token"
                  type="text"
                  onChange={(e) => setToken(e.target.value)}
                  value={token}
                  placeholder="Token"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="data-end-point"
                >
                  Data End Point
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="data-end-point"
                  type="text"
                  onChange={(e) => setDataEndPoint(e.target.value)}
                  value={dataEndPoint}
                  placeholder="Data End Point"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="scan-end-point"
                >
                  Scan End Point
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="scan-end-point"
                  type="text"
                  onChange={(e) => setScanEndPoint(e.target.value)}
                  value={scanEndPoint}
                  placeholder="Scan End Point"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-3 justify-start">
              <div className="w-full md:w-1/3 px-1 mb-6 md:mb-0">
                <button
                  className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Save
                </button>
              </div>
              <div className="w-full md:w-1/3 px-1 mb-6 md:mb-0">
                <button
                  className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={clear}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Setting;
