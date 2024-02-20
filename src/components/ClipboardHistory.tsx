import React from "react";
import { Card } from "react-bootstrap";

interface ClipboardHistoryProps {
  history: string[];
}

const ClipboardHistory: React.FC<ClipboardHistoryProps> = ({ history }) => {
  return (
    <div>
      <h3>클립보드 기록</h3>
      {history.map((item, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Text>{item}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ClipboardHistory;
