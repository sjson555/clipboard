import React from "react";
import { Card, Button } from "react-bootstrap";

interface ClipboardItemCardProps {
  item: string;
  onViewDetail: (item: string) => void;
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
