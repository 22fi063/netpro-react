// ルーティングの設定
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Home from "./Home";
import Create from "./Create";
import Select from "./Select";
import Join from "./Join";
import Calender from "./Calender";
import Notification from "./Notification";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select" element={<Select />} />
      <Route path="/create" element={<Create />} />
      <Route path="/join" element={<Join />} />
      <Route path="/home" element={<Home />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/notification" element={<Notification />} />
    </Routes>
  );
};

export default AppRoutes;
