import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"; // △
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // ○
import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import React, { useState } from "react";
import { Box } from "@mui/system";

function createDate(
  name: string,
  sunday: string,
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
  friday: string,
  saturday: string
) {
  return {
    name,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  };
}

const data = [
  createDate("たろう", "○", "△", "×", "○", "△", "×", "○"),
  createDate("はなこ", "△", "○", "△", "×", "○", "△", "×"),
  createDate("すみれ", "×", "△", "○", "△", "×", "○", "△"),
  createDate("あかり", "○", "△", "×", "○", "△", "×", "○"),
  createDate("ゆうか", "△", "○", "△", "×", "○", "△", "×"),
];

const events = [
  { id: 1, name: "おまつり", type: "たろう", date: "2024-07-13" },
  { id: 2, name: "", type: "" },
  { id: 3, name: "", type: "" },
];

const groupNames = ["グループA", "グループB", "dadadadiashdsiohadoi"]; // グループ名のリスト

function Calendar() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupSelect = (groupName: string) => {
    setSelectedGroup(groupName);
    handleClose();
    // ドロップダウンメニューで選択された処理を追加する場合はここに記述します
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <header className="w-full p-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          ログアウト
        </Button>
      </header>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400]">
          <Box display="flex" justifyContent="center" mb={2}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="split button"
            >
              <Button onClick={handleClick}>
                {selectedGroup || "デフォルトのグループ名"}
              </Button>
              <Button 
              component={RouterLink}
              to="/select"
              color="secondary"
              >
                追加
              </Button>
            </ButtonGroup>
            <Menu
              id=""
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuList id="split-button-menu" autoFocusItem>
                {groupNames.map((groupName) => (
                  <MenuItem
                    key={groupName}
                    onClick={() => handleGroupSelect(groupName)}
                  >
                    {groupName}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
          <TableContainer className="w-full max-w-4xl">
            <Table aria-label="schedule table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">7/13 (日)</TableCell>
                  <TableCell align="center">7/14 (月)</TableCell>
                  <TableCell align="center">7/15 (火)</TableCell>
                  <TableCell align="center">7/16 (水)</TableCell>
                  <TableCell align="center">7/17 (木)</TableCell>
                  <TableCell align="center">7/18 (金)</TableCell>
                  <TableCell align="center">7/19 (土)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {Object.values(row)
                      .slice(1)
                      .map((value, index) => (
                        <TableCell key={index} align="center">
                          {value === "○" && (
                            <RadioButtonUncheckedIcon color="primary" />
                          )}
                          {value === "△" && (
                            <ChangeHistoryIcon color="secondary" />
                          )}
                          {value === "×" && <CloseIcon color="error" />}{" "}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <List>
            {events.map((event) => (
              <Paper key={event.id} elevation={3} className="mb-4">
                <ListItem>
                  <ListItemText
                    primary={event.name}
                    secondary={`日付: ${event.date} 作成者: ${event.type}`}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                  <IconButton color="primary" component={RouterLink} to="/chat">
                    <ChatIcon />
                  </IconButton>
                </ListItem>
              </Paper>
            ))}
          </List>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/menu"
              className="!mt-20"
              style={{
                bottom: "2rem",
                zIndex: 1000,
              }}
            >
              メニュー
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
