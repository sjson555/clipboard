import { useState } from "react";

export function useClipboard() {
  const [clipboardText, setClipboardText] = useState("");
  const [clipboardImage, setClipboardImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const getClipboardData = () => {
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        clipboardItems.forEach((clipboardItem) => {
          if (clipboardItem.types.includes("text/plain")) {
            clipboardItem.getType("text/plain").then((blob) => {
              blob.text().then((text) => setClipboardText(text));
            });
          } else if (clipboardItem.types.includes("image/png")) {
            clipboardItem.getType("image/png").then((blob) => {
              resizeImage(blob, 300)
                .then((resizedImageUrl: string) => {
                  setClipboardImage(resizedImageUrl);
                })
                .catch((error) =>
                  console.error("이미지 크기 조절 실패:", error)
                );
            });
          }
        });
      })
      .catch((error) => setError("클립보드 데이터를 읽는 데 실패했습니다."));
  };

  return { clipboardText, clipboardImage, error, getClipboardData };
}

function resizeImage(blob: Blob, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (!event.target) {
        reject("이미지를 읽는 동안 오류가 발생했습니다.");
        return;
      }
      const img = new Image();
      img.src = event.target.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scaleFactor = maxSize / Math.max(img.width, img.height);
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("캔버스 컨텍스트를 가져오는 데 실패했습니다.");
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((resizedBlob) => {
          if (!resizedBlob) {
            reject("이미지를 Blob으로 변환하는 동안 오류가 발생했습니다.");
            return;
          }
          const resizedImageUrl = URL.createObjectURL(resizedBlob);
          resolve(resizedImageUrl);
        }, "image/png");
      };
      img.onerror = () => reject("이미지를 로드하는 동안 오류가 발생했습니다.");
    };
    reader.onerror = () => reject("이미지를 읽는 동안 오류가 발생했습니다.");
  });
}

export default useClipboard;
