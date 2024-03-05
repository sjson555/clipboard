import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Clipboard from "./pages/Clipboard";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/clipboard" element={<Clipboard />} />
    </Routes>
  );
}

export default App;
