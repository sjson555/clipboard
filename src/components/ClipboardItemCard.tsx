import React from "react";
import { Card, Button } from "react-bootstrap";

interface ClipboardItemCardProps {
  text?: string;
  imageUrl?: string;
  onViewDetail?: () => void;
}

const ClipboardItemCard: React.FC<ClipboardItemCardProps> = ({
  text,
  imageUrl,
  onViewDetail,
}) => {
  const truncatedText =
    text && text.length > 100 ? text.substring(0, 100) + "..." : text;

  return (
    <Card className="shadow-sm" style={{ width: "18rem", margin: "10px" }}>
      {imageUrl && (
        <Card.Img variant="top" src={imageUrl} style={{ objectFit: "cover" }} />
      )}
      <Card.Body className="d-flex flex-column justify-content-between">
        {text && <Card.Text>{truncatedText}</Card.Text>}
        <Button variant="primary" className="mt-auto" onClick={onViewDetail}>
          자세히 보기
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClipboardItemCard;
