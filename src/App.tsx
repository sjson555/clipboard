import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import ClipboardItemCard from "./ClipboardItemCard";
import useClipboard from "./useClipboard";

function App() {
  const { clipboardText, clipboardImage, error, getClipboardData } =
    useClipboard();
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    getClipboardData();
  }, [getClipboardData]);

  const handleViewDetail = () => {
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="container">
      <h1 className="mt-5">Clipboard App</h1>
      <button className="btn btn-primary mt-3" onClick={getClipboardData}>
        클립보드 데이터 가져오기
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {(clipboardText || clipboardImage) && (
        <ClipboardItemCard
          text={clipboardText}
          imageUrl={clipboardImage ? clipboardImage : undefined}
          onViewDetail={handleViewDetail}
        />
      )}

      <Modal show={showDetailModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>자세히 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clipboardText && <p>텍스트: {clipboardText}</p>}
          {clipboardImage && <img src={clipboardImage} alt="Clipboard" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
