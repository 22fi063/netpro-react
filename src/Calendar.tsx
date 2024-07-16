import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"; // △
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // ○
import {
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Tooltip
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "./firebase";


type CalenderData = {
user_id: number,
user_name: string,
status
}

type GroupData = {
  group_id: number,
  group_name: string
}


  type Event = {
    event_id: number,
    event_name: string,
    event_date: Date,
    detail: string,
    creator_name: string
    status: number,
    group_name: string
  }

function Calendar() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [groupNames, setGroupNames] = useState<GroupData[]>([]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [statuses, setStatuses] = useState<CalenderData[]>([]);
  const [joinEvent, setJoinEvent] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {const user = auth.currentUser;
        if (user) {
          const firebase_uid = user.uid;
  
        const response = await axios.post(
          `http://localhost:3000/api/users/group`,
          {
            firebase_uid: firebase_uid
          }
        );
        setGroupNames(response.data);
      }}catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (groupNames.length > 0) {
      setSelectedGroup(groupNames[0].group_name);
      setSelectIndex(groupNames[0].group_id);
    }
  }, [groupNames]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/groups/calendar`,
          {
            group_id: selectIndex
          }
        );
        setStatuses(response.data);
      }catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchCalendarData();
  }, [selectIndex]);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const firebase_uid = user.uid;
  
        const response = await axios.post<Event[]>(
          `http://localhost:3000/api/user/event`,
          {
            firebase_uid: firebase_uid 
          }
        );
        setJoinEvent(response.data);
      }} catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (joinEvent.length > 0) {
      console.log(joinEvent);
    }
  }, [joinEvent]);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(selectedGroup);
    console.log(selectIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupSelect = (groupId: number, groupName: string) => {
    setSelectIndex(groupId);
    setSelectedGroup(groupName);
    handleClose();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    // 削除処理を実行する場所
    setOpenDialog(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("test");
  };

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'形式
  });

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
              <Button component={RouterLink} to="/select" color="secondary">
                追加
              </Button>
            </ButtonGroup>
            <Tooltip title="groupIdをコピー">
              <IconButton aria-label="copy" size="small" onClick={handleCopy}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="null"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuList id="split-button-menu" autoFocusItem>
                {groupNames.map(({ group_id, group_name }) => (
                  <MenuItem
                    key={group_id}
                    onClick={() => handleGroupSelect(group_id, group_name)}
                  >
                    {group_name}
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
            {dates.map((date, index) => (
              <TableCell key={index} align="center">{date}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {statuses.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell component="th" scope="row">{user.user_name}</TableCell>
              {dates.map((date, index) => {
                const status = user.status[date] || '-';
                return (
                  <TableCell key={index} align="center">
                    {status === '○' && <RadioButtonUncheckedIcon color="primary" />}
                    {status === '△' && <ChangeHistoryIcon color="secondary" />}
                    {status === '×' && <CloseIcon color="error" />}
                    {status === '-' && '-'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <List>
  {joinEvent.map((event) => {
    if (event.status == 1) {
      return (
        <Paper key={event.event_id} elevation={3} className="mb-4">
          <ListItem>
            <ListItemText
              primary={event.event_name}
              secondary={`日付: ${event.event_date} 作成者: ${event.creator_name}`}
              primaryTypographyProps={{ variant: "h6" }}
            />
            <IconButton color="primary" component={RouterLink} to="/chat">
              <ChatIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={handleDeleteClick}>
                      <DeleteIcon />
                    </IconButton>
                    <Dialog open={openDialog} onClose={handleCancel}
                    >
                      <DialogContent>
                        本当にに削除しますか？
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                          キャンセル
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="primary">
                          削除
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </ListItem>
                </Paper>
      );
    }
    return null;
  })}
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
