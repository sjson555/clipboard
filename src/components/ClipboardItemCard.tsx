import React from "react";
import { Card, Button } from "react-bootstrap";

interface ClipboardItemCardProps {
  item: string; // 클립보드 아이템은 문자열 형태로 전달됩니다.
  onViewDetail: (item: string) => void; // 자세히 보기 이벤트 핸들러는 문자열을 인자로 받습니다.
}

const ClipboardItemCard: React.FC<ClipboardItemCardProps> = ({
  item,
  onViewDetail,
}) => {
  const isImageUrl = item.startsWith("http") || item.startsWith("data:image");
  const truncatedText =
    item.length > 100 ? item.substring(0, 100) + "..." : item;

  return (
    <Card className="shadow-sm" style={{ width: "18rem", margin: "10px" }}>
      {isImageUrl && (
        <Card.Img variant="top" src={item} style={{ objectFit: "cover" }} />
      )}
      <Card.Body className="d-flex flex-column justify-content-between">
        {!isImageUrl && <Card.Text>{truncatedText}</Card.Text>}
        <Button
          variant="primary"
          className="mt-auto"
          onClick={() => onViewDetail(item)}
        >
          자세히 보기
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClipboardItemCard;
