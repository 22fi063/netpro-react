// ルーティングの設定
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Calendar from "./Calendar";
import Create from "./Create";
import Home from "./Home";
import Join from "./Join";
import Login from "./Login";
import Notification from "./Notification";
import Select from "./Select";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select" element={<Select />} />
      <Route path="/create" element={<Create />} />
      <Route path="/join" element={<Join />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
};

export default AppRoutes;
