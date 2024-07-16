import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // ○
import { Button, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

import axios from 'axios';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "./firebase";

function Notification() {
const [invitedEvent, setInvitedEvent] = useState<Event[]>([]);

  type Event = {
    event_id: number,
    event_name: string,
    event_date: Date,
    detail: string,
    creator_name: string
    status: number,
    group_name: string
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const firebase_uid = user.uid;
  
        const response = await axios.post<Event[]>(
          `https://chat-express-zpxu.onrender.com/api/user/event`,
          {
            firebase_uid: firebase_uid 
          }
        );
        setInvitedEvent(response.data);
      }} catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (invitedEvent.length > 0) {
      console.log(invitedEvent);
    }
  }, [invitedEvent]);

  const updateStatus = async (event_id: number, status: number) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const firebase_uid = user.uid;

        await axios.put('https://chat-express-zpxu.onrender.com/api/user/event/status', {
          event_id: event_id,
          firebase_uid: firebase_uid,
          status: status
        });

        // ステータス更新後のイベントリストを再取得
        setInvitedEvent(prevEvents =>
          prevEvents.map(event =>
            event.event_id === event_id ? { ...event, status: status } : event
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };



  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/menu"
      >
        戻る
      </Button>
      <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <Typography variant="h5" gutterBottom className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
  招待されたイベント
</Typography>
<List>
  {invitedEvent.map((event) => {
    if (event.status == 3) {
      return (
        <Paper key={event.event_id} elevation={3} className="mb-4">
          <ListItem>
            <ListItemText
             primary={
              <>
                <Typography variant="caption" color="textSecondary">{`グループ名: ${event.group_name}`}</Typography>
                <Typography variant="h6">{event.event_name}</Typography>
              </>
            }
              secondary={`日付: ${event.event_date} 作成者: ${event.creator_name}`}
              primaryTypographyProps={{ variant: "h6" }}
            />
            <div>
              <IconButton aria-label="maru" size="small" onClick={() => updateStatus(event.event_id, 1)}>
                <RadioButtonUncheckedIcon color="primary" />
              </IconButton>
              <IconButton aria-label="batu" size="small" onClick={() => updateStatus(event.event_id, 2)}>
                <CloseIcon color="error" />
              </IconButton>
            </div>
          </ListItem>
        </Paper>
      ); 
    }
    return null; 
  })}
</List>
        </div>
      </div>
    </div>
  );
}

export default Notification;