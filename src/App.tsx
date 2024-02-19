import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useClipboard from "./useClipboard";

function App() {
  const { clipboardText, clipboardImage, error, getClipboardData } =
    useClipboard();

  return (
    <div className="container">
      <h1 className="mt-5">Clipboard App</h1>
      <button className="btn btn-primary mt-3" onClick={getClipboardData}>
        클립보드 데이터 가져오기
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {clipboardText && <p>클립보드 텍스트: {clipboardText}</p>}
      {clipboardImage && (
        <div>
          <p>클립보드 이미지:</p>
          <img src={clipboardImage} alt="Clipboard" />
        </div>
      )}
    </div>
  );
}

export default App;
