import React, { useState, useEffect } from "react";

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
      const latestItem = clipboardItems[clipboardItems.length - 1];
      if (latestItem.types.includes("text/plain")) {
        const textBlob = await latestItem.getType("text/plain");
        const text = await textBlob.text();
        setClipboardItems(prevItems => [...prevItems, text]); 
      } else if (latestItem.types.includes("image/png")) {
        const imageBlob = await latestItem.getType("image/png");
        const reader = new FileReader();
        reader.onload = () => {
          setClipboardItems(prevItems => [...prevItems, reader.result as string | ArrayBuffer]); 
        };
        reader.readAsDataURL(imageBlob);
      }
    } catch (error) {
      setError("클립보드 데이터를 읽는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    getClipboardData();
  }, []);

  return { clipboardItems, error, getClipboardData };
}

export default useClipboard;
