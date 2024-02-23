import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main"; // 경로 수정
import Clipboard from "./pages/Clipboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main
            nickname=""
            roomUrl=""
            handleNicknameChange={() => {}}
            handleRoomCreation={() => {}}
            handleRoomJoin={() => {}}
          />
        }
      />
      <Route path="/clipboard" element={<Clipboard />} />
    </Routes>
  );
}

export default App;
