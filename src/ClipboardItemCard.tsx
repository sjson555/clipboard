import React from "react";
import { Card, Button } from "react-bootstrap";

interface ClipboardItemCardProps {
  text?: string;
  imageUrl?: string;
  onViewDetail: () => void;
}

const ClipboardItemCard: React.FC<ClipboardItemCardProps> = ({
  imageUrl,
  onViewDetail,
}) => {
  return (
    <Card className="shadow-sm" style={{ width: "18rem", margin: "10px" }}>
      {imageUrl && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body className="d-flex flex-column justify-content-between">
        <Button variant="primary" className="mt-auto" onClick={onViewDetail}>
          자세히 보기
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClipboardItemCard;
