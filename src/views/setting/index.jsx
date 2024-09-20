import { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "../../providers/appProvider";
import DefaultLayout from "../../layouts/Default";
import { useAppState } from "../../providers/appProvider";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSettingSchema } from "../../utils/validation";

import SettingDisplay from "../../components/setting-display";

import useSettings from "../../hooks/useSettings";
import { dispatchAction } from "../../utils/dispatchActions";

import { toast } from "react-toastify";

const Setting = () => {
  const { clearForm, form } = useSettings();

  const fileInput = useRef("");
  const dispatch = useAppDispatch();

  const {
    base_url: base_url_state,
    token: token_state,
    scan_end_point: scan_end_point_state,
    group_end_point: group_end_point_state,
    group_detail_end_point: group_detail_end_point_state,
  } = useAppState();

  const readFile = (files, setFieldValue) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      try {
        const jsonData = JSON.parse(fileReader.result);

        setFieldValue("base_url", jsonData.base_url);
        setFieldValue("token", jsonData.token);
        setFieldValue("scan_end_point", jsonData.scan_end_point);
        setFieldValue("group_end_point", jsonData.group_end_point);
        setFieldValue(
          "group_detail_end_point",
          jsonData.group_detail_end_point
        );
      } catch (error) {
        toast.error(error.message);
      }
    };

    fileReader.readAsText(files.current.files[0], "UTF-8");
  };

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          dispatchAction(dispatch, key, values[key]);
        }
      });

      resetForm();
      fileInput.current.value = "";
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    Object.keys(form).forEach((key) => {
      dispatchAction(dispatch, key, null);
    });

    clearForm();
    fileInput.current.value = "";
  }, [dispatch, form, clearForm]);

  return (
    <>
      <DefaultLayout>
        <div className="max-w-lg rounded mx-auto overflow-hidden mb-5">
          <div className="w-full max-w-lg">
            <div className="flex flex-wrap">
              <SettingDisplay title="Base URL" value={base_url_state} />
              <SettingDisplay title="Token" value={token_state} />
              <SettingDisplay
                title="Scan End Point"
                value={scan_end_point_state}
                classCustom="md:w-1/2"
              />
              <SettingDisplay
                title="Group End Point"
                value={group_end_point_state}
                classCustom="md:w-1/2"
              />
              <SettingDisplay
                title="Group Detail End Point"
                value={group_detail_end_point_state}
                classCustom="md:w-1/2"
              />
            </div>
          </div>
        </div>
        <div className="max-w-lg rounded mx-auto overflow-hidden shadow-lg p-10 border-2">
          <Formik
            initialValues={form}
            validationSchema={validationSettingSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-full max-w-lg">
                {/* Base URL */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="baseUrl"
                    >
                      Base URL
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="baseUrl"
                      name="base_url"
                      type="text"
                      placeholder="Base URL"
                    />
                    <ErrorMessage
                      name="base_url"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>

                {/* Token */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="token"
                    >
                      Token
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="token"
                      name="token"
                      type="text"
                      placeholder="Token"
                    />
                    <ErrorMessage
                      name="token"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>

                {/* Group End Point & Group Detail End Point */}
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="groupEndPoint"
                    >
                      Group End Point
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="groupEndPoint"
                      name="group_end_point"
                      type="text"
                      placeholder="Group End Point"
                    />
                    <ErrorMessage
                      name="group_end_point"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="groupDetailEndPoint"
                    >
                      Group Detail End Point
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="groupDetailEndPoint"
                      name="group_detail_end_point"
                      type="text"
                      placeholder="Group Detail End Point"
                    />
                    <ErrorMessage
                      name="group_detail_end_point"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>

                {/* Data End Point & Scan End Point */}
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="scanEndPoint"
                    >
                      Scan End Point
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="scanEndPoint"
                      name="scan_end_point"
                      type="text"
                      placeholder="Scan End Point"
                    />
                    <ErrorMessage
                      name="scan_end_point"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                </div>

                {/* Import Setting */}
                <div className="flex flex-wrap -mx-3 mb-3">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="file-setting"
                    >
                      Import Setting
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight cursor-pointer focus:outline-none focus:bg-white focus:border-gray-500"
                      id="file-setting"
                      type="file"
                      ref={fileInput}
                      onChange={() => readFile(fileInput, setFieldValue)}
                      placeholder="File Setting"
                      accept="application/JSON"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap -mx-3 mt-3 justify-start">
                  <div className="w-full md:w-1/4 px-1 mb-6 md:mb-0">
                    <button
                      className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                  <div className="w-full md:w-1/4 px-1 mb-6 md:mb-0">
                    <button
                      className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none w-full text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={clear}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Setting;
