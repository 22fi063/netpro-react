import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <RouterLink to="/event/create" className="no-underline">
          <Button
            variant="contained"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
          >
            予定を記入
          </Button>
        </RouterLink>
      </div>
      <div className="w-full">
        <RouterLink to="/notification" className="no-underline">
          <Button
            variant="contained"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
          >
            遊びの受信
          </Button>
        </RouterLink>
      </div>
      <div className="w-64">
        <RouterLink to="/calendar" className="no-underline">
          <Button
            variant="contained"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
          >
            カレンダーの確認
          </Button>
        </RouterLink>
      </div>
    </div>
  );
}

export default Home;
