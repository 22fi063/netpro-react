import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
 <div>
     <Button
      variant="contained"
      color="primary"
      className="fixed top-8 left-8"
      component={RouterLink}
      to="/home"
      >
      戻る
      </Button>
     <div className="flex flex-col items-center justify-center min-h-screen">
       <div className="w-8/12">
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
           to="/notification"
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
           イベントの招待
         </Button>
       </div>
     </div>
 </div>
  );
}

export default Home;
