import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: 200,
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
  '&.selected': {
    backgroundColor: '#B2EBF2', // 選択時の背景色を設定
    boxShadow: theme.shadows[8],
  },
}));

const ImageIcon = styled('div')({
  fontSize: '5rem',
  color: '#616161',
});

const ImageText = styled(Typography)({
  marginTop: '1rem',
  fontFamily: 'Roboto',
  color: '#616161',
});

function Select() {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-[#212A30] min-h-screen justify-center flex flex-col items-center">
      <div className="flex flex-col items-center mt-24">
        <h2 className="text-black text-xl font-roboto mb-8">
          当てはまる方を選んでください
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg flex">
          <ImageButton 
            onClick={() => handleSelect('join')} 
            className={selectedOption === 'join' ? 'selected' : ''}
          >
            <ImageIcon>
              <GroupIcon />
            </ImageIcon>
            <ImageText variant="subtitle1">
              既存のチームに参加
            </ImageText>
          </ImageButton>
          <ImageButton 
            onClick={() => handleSelect('create')} 
            className={selectedOption === 'create' ? 'selected' : ''}
          >
            <ImageIcon>
              <StarIcon />
            </ImageIcon>
            <ImageText variant="subtitle1">
              チームを新規作成
            </ImageText>
          </ImageButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-8 bg-[#00B1B8] text-white px-8 py-4 rounded-full shadow-lg font-roboto hover:bg-[#018C92]"
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
