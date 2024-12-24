import DefaultLayout from "../../layouts/Default";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const Generator = () => {
  const [text, isText] = useState("");
  const qrRef = useRef();

  const downloadQrCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

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
        <div className="w-auto" ref={qrRef}>
          {text && (
            <QRCodeCanvas
              className="relative border-8 overflow-hidden border-gray-600 bg-gray-60 rounded-3xl flex flex-col w-96 h-96 justify-center items-center bg-no-repeat bg-cover shadow-2xl"
              value={text}
              size={400}
              marginSize={1}
            />
          )}
        </div>
        <div className="w-auto">
          <button
            onClick={downloadQrCode}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Generator;
