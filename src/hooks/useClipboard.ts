import React, { useState, useEffect } from "react";

export interface ClipboardData {
  clipboardItems: string[]; // 배열로 클립보드 데이터 저장
  error: string;
  getClipboardData: () => void;
}

function useClipboard(): ClipboardData {
  const [clipboardItems, setClipboardItems] = useState<string[]>([]); // 클립보드 아이템 배열
  const [error, setError] = useState("");

  const getClipboardData = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      const latestItem = clipboardItems[clipboardItems.length - 1];
      if (latestItem.types.includes("text/plain")) {
        const textBlob = await latestItem.getType("text/plain");
        const text = await textBlob.text();
        setClipboardItems(prevItems => [...prevItems, text]); // 이전 아이템과 새로운 텍스트를 합쳐 배열에 추가
      } else if (latestItem.types.includes("image/png")) {
        const imageBlob = await latestItem.getType("image/png");
        const imageUrl = URL.createObjectURL(imageBlob);
        setClipboardItems(prevItems => [...prevItems, imageUrl]); // 이전 아이템과 새로운 이미지 URL을 합쳐 배열에 추가
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
