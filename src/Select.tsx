import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { Button } from "@mui/material";
import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";

function Select() {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Button
      variant="contained"
      color="primary"
      className="fixed top-8 left-8"
      component={RouterLink}
      to="/"
      >
      はじめから
      </Button>
      <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl mb-10">
            当てはまる方を選んでください
          </h1>
          <div className="flex">
            <Button
              onClick={() => handleSelect('join')}
              className={`w-60 h-60 shadow-lg !mr-10 ${selectedOption === 'join' ? '!bg-blue-600 !text-white' : ''}`}
            >
                <GroupIcon className='mr-2'/>
                既存のチームに参加
            </Button>
            <Button
              onClick={() => handleSelect('create')}
               className={`w-60 h-60 shadow-lg ${selectedOption === 'create' ? '!bg-blue-600 !text-white' : ''}`}
            >
                <StarIcon className='mr-2'/>
                チームを新規作成
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="!mt-10"
            component={RouterLink}
            to={selectedOption ? `/${selectedOption}` : "#"}
            disabled={!selectedOption}
          >
            次へ
          </Button>
        </div>
    </div>
  );
}

export default Select;
