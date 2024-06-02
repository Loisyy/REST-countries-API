// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import EachCountry from "./components/EachCountry";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Countries />} />
      <Route path="/country/:name" element={<EachCountry />} />
    </Routes>
  );
}

export default App;
