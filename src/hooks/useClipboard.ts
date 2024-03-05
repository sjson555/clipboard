import { useState, useEffect } from "react";

export interface ClipboardData {
  clipboardItems: (string | ArrayBuffer)[];
  error: string;
  getClipboardData: () => void;
}

function useClipboard(): ClipboardData {
  const [clipboardItems, setClipboardItems] = useState<(string | ArrayBuffer)[]>([]);
  const [error, setError] = useState("");

  const getClipboardData = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      if (clipboardItems.length === 0) {
        setError("클립보드에 데이터가 없습니다.");
        return;
      }

      const latestItem = clipboardItems[clipboardItems.length - 1];
      if (latestItem.types.includes("text/plain")) {
        const textBlob = await latestItem.getType("text/plain");
        const text = await textBlob.text();
        setClipboardItems(prevItems => [text, ...prevItems.slice(0, 3)]);
      } else if (latestItem.types.includes("image/png")) {
        const imageBlob = await latestItem.getType("image/png");
        if (!imageBlob) {
          setError("클립보드에 이미지가 없습니다.");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setClipboardItems(prevItems => [reader.result as string | ArrayBuffer, ...prevItems.slice(0, 3)]);
        };
        reader.readAsDataURL(imageBlob);
      } else {
        setError("지원되지 않는 클립보드 형식입니다.");
      }
    } catch (error) {
      setError("클립보드 데이터를 읽는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    const clipboardEventListener = () => {
      getClipboardData();
    };

    document.addEventListener('paste', clipboardEventListener);

    return () => {
      document.removeEventListener('paste', clipboardEventListener);
    };
  }, []);

  return { clipboardItems, error, getClipboardData };
}

export default useClipboard;
