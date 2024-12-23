import { useState } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      console.log("Copied to clipboard");
    } catch (error) {
      setIsCopied(false);
      console.log(error);
    }
  };

  return { isCopied, copyToClipboard };
};

export default useClipboard;
