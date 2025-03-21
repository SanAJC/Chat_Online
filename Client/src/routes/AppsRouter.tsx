import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { ChatWindow } from "../components/ChatWindow";

export const AppsRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/chat/:receiverId" element={<ChatWindow />} />
    </Routes>
  );
};
