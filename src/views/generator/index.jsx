import DefaultLayout from "../../layouts/Default";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Generator = () => {
  const [text, isText] = useState("");

  return (
    <DefaultLayout>
      <div className="w-full h-full flex justify-center flex-col items-center bg-cover gap-2">
        <div className="w-auto">
          <textarea
            cols="5"
            rows="5"
            className="w-96 border-2 rounded border-gray-300"
            onChange={(e) => isText(e.target.value)}
          ></textarea>
        </div>
        <div className="w-auto">
          {text && (
            <QRCodeSVG
              className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl p-5"
              value={text}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Generator;
