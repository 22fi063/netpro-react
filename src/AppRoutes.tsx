// ルーティングの設定
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Calendar from "./Calendar";
import Create from "./Create";
import CreateEvent from "./CreateEvent";
import Home from "./Home";
import InviteMembers from "./InviteMembers";
import Join from "./Join";
import Login from "./Login";
import Notification from "./Notification";
import Registry from "./Registry";
import Select from "./Select";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select" element={<Select />} />
      <Route path="/create" element={<Create />} />
      <Route path="/join" element={<Join />} />
      <Route path="/menu" element={<Home />} />
      <Route path="/home" element={<Calendar />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/event/create" element={<CreateEvent />} />
      <Route path="/event/invite" element={<InviteMembers />} />
    </Routes>
  );
};

export default AppRoutes;
