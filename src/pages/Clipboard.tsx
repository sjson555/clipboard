import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Container } from "react-bootstrap";
import ClipboardItemCard from "../components/ClipboardItemCard";
import useClipboard, { ClipboardData } from "../hooks/useClipboard";

const Clipboard: React.FC = () => {
  const { clipboardItems, error, getClipboardData }: ClipboardData =
    useClipboard();
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const arrayBufferToString = (buffer: ArrayBuffer): string => {
    const uintArray = new Uint8Array(buffer);
    const array = Array.from(uintArray);
    const binary = String.fromCharCode.apply(null, array);
    return btoa(binary);
  };

  const handleViewDetail = (item: string | ArrayBuffer): void => {
    if (typeof item === "string") {
      setSelectedItem(item);
    } else {
      const convertedItem = arrayBufferToString(item);
      setSelectedItem(convertedItem);
    }
    setShowDetailModal(true);
  };

  const handleCloseModal = (): void => {
    setShowDetailModal(false);
  };

  return (
    <Container className="my-24 d-flex flex-column align-items-center">
      <h1 className="">Clipboard</h1>
      <Button className="btn btn-dark mt-3 " onClick={getClipboardData}>
        클립보드 데이터 가져오기
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {clipboardItems.map((item, index) => (
        <ClipboardItemCard
          key={index}
          item={typeof item === "string" ? item : ""}
          onViewDetail={() => handleViewDetail(item)}
        />
      ))}

      <Modal show={showDetailModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>자세히 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              {selectedItem.startsWith("data:image") ? (
                <img
                  src={selectedItem}
                  alt="Clipboard"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p style={{ wordWrap: "break-word" }}>{selectedItem}</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Clipboard;
