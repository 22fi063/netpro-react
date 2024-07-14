import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/home"
      >
        戻る
      </Button>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-8/12">
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/event/create"
            className="!text-xl !mb-5"
          >
            イベント作成
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/event/list"
            className="!text-xl !mb-5"
          >
            イベント確認・編集
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/notification"
            className="!text-xl !mb-5"
          >
            招待されたイベント
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
