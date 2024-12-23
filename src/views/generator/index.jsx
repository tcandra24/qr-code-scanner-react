import DefaultLayout from "../../layouts/Default";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Generator = () => {
  const [text, isText] = useState("");

  return (
    <DefaultLayout>
      <input
        className="w-96 border-2 rounded border-gray-300"
        type="text"
        onChange={(e) => isText(e.target.value)}
      />
      {text && <QRCodeSVG value={text} />}
    </DefaultLayout>
  );
};

export default Generator;
