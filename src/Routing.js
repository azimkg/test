import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CRUD from "./pages/CRUD";
import Tables from "./pages/Tables";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="/privateRoute" element={<CRUD />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
