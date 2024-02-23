import React from "react";

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
  return (
    <div>
      <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="Enter your nickname"
      />
      <button onClick={handleRoomCreation}>Create Room</button>
      <input
        type="text"
        value={roomUrl}
        onChange={handleRoomJoin}
        placeholder="Enter room URL to join"
      />
      <button onClick={handleRoomJoin}>Join Room</button>
    </div>
  );
};

export default Main;
