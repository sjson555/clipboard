import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface MainProps {
  nickname: string;
  roomUrl: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoomCreation: () => void;
  handleRoomJoin: () => void;
}

const Main: React.FC<MainProps> = ({
  nickname,
  roomUrl,
  handleNicknameChange,
  handleRoomCreation,
  handleRoomJoin,
}) => {
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = () => {
    // Implement your create room logic here
    // For example, emit an event to create a room
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your join room logic here
    // For example, emit an event to join a room with roomId
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Enter your nickname</Form.Label>
          <Form.Control
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="nickname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter room URL</Form.Label>
          <Form.Control
            type="text"
            value={roomUrl}
            onChange={(e) => handleRoomJoin()}
            placeholder="room URL "
          />
        </Form.Group>

        <Button variant="primary" onClick={handleRoomJoin}>
          Join Room
        </Button>
      </Form>

      <div className="mt-3">
        <Button variant="success" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default Main;
