import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Principal from "../pages/Principal";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;