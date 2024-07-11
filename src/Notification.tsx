import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Notification() {
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl mb-10">予定共有アプリケーションへようこそ</h1>
          <Button
            variant="contained"
             component={RouterLink}
            to="/login"
            className="w-96 bg-blue-500 py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
          >
            ログインする
          </Button>
      </div>
    </div>
  );
}

export default Notification;
