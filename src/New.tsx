import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

function New() {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );
  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/"
      >
      はじめから
      </Button>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400]">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            当てはまる方を選んでください
          </h2>
          <div className="flex justify-center">
            <Button
              onClick={() => handleSelect("join")}
              className={`w-60 h-60 shadow-lg !mr-10 ${
                selectedOption === "join" ? "!bg-blue-600 !text-white" : ""
              }`}
            >
              <GroupIcon className="mr-2" />
              既存のチームに参加
            </Button>
            <Button
              onClick={() => handleSelect("create")}
              className={`w-60 h-60 shadow-lg ${
                selectedOption === "create" ? "!bg-blue-600 !text-white" : ""
              }`}
            >
              <StarIcon className="mr-2" />
              チームを新規作成
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              className="!mt-10 "
              component={RouterLink}
              to={selectedOption ? `/${selectedOption}` : "#"}
              disabled={!selectedOption}
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
