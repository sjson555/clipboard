import { useState, useEffect } from "react";

function useClipboard() {
  const [clipboardText, setClipboardText] = useState("");
  const [clipboardImage, setClipboardImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const getClipboardData = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const latestItem = clipboardItems[clipboardItems.length - 1];
      if (latestItem.types.includes("text/plain")) {
        const textBlob = await latestItem.getType("text/plain");
        const text = await textBlob.text();
        setClipboardText(text);
        setClipboardImage(null);
      } else if (latestItem.types.includes("image/png")) {
        const imageBlob = await latestItem.getType("image/png");
        const imageUrl = URL.createObjectURL(imageBlob);
        setClipboardText("");
        setClipboardImage(imageUrl);
      }
    } catch (error) {
      setError("클립보드 데이터를 읽는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    getClipboardData();
  }, []);

  return { clipboardText, clipboardImage, error, getClipboardData };
}

export default useClipboard;
