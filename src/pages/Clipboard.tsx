import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Container } from "react-bootstrap";
import ClipboardItemCard from "../components/ClipboardItemCard";
import useClipboard, { ClipboardData } from "../hooks/useClipboard";

const Clipboard: React.FC = () => {
  const { clipboardItems, error, getClipboardData }: ClipboardData =
    useClipboard();
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // 선택한 클립보드 아이템

  const handleViewDetail = (item: string): void => {
    setSelectedItem(item); // 클립보드 아이템 선택
    setShowDetailModal(true);
  };

  const handleCloseModal = (): void => {
    setShowDetailModal(false);
  };

  return (
    <Container>
      <h1 className="mt-5">Clipboard App</h1>
      <Button className="btn btn-dark mt-3 " onClick={getClipboardData}>
        클립보드 데이터 가져오기
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {clipboardItems.map((item, index) => (
        <ClipboardItemCard
          key={index}
          item={item}
          onViewDetail={() => handleViewDetail(item)} // 각 클립보드 아이템에 대한 자세히 보기 이벤트 핸들러 추가
        />
      ))}

      <Modal show={showDetailModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>자세히 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              {selectedItem.startsWith("data:image") ? ( // 선택한 아이템이 이미지인 경우 이미지로 렌더링
                <img
                  src={selectedItem}
                  alt="Clipboard"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p style={{ wordWrap: "break-word" }}>{selectedItem}</p> // 선택한 아이템이 텍스트인 경우 텍스트로 렌더링
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
