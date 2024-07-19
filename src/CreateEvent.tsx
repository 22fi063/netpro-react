import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

type GroupData = {
  group_id: number;
  group_name: string;
};

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [groupId, setGroupId] = useState(1);
  const [groupNames, setGroupNames] = useState<GroupData[]>([]);
  const navigate = useNavigate();
  const [detail, setDetail] = useState("");

  

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;

      if (user) {
        console.log(groupId);
        const response = await axios.post(
          "https://chat-express-zpxu.onrender.com/api/events",
          {
            event_name: eventName,
            event_date: eventDate,
            firebase_uid: user.uid,
            group_id: groupId,
          }
        );
        console.log("Event created:", response.data);
        navigate("/event/invite", {
          state: { groupId: groupId, eventName: eventName },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const firebase_uid = user.uid;
  
          const response = await axios.post(
            `https://chat-express-zpxu.onrender.com/api/users/group`,
            {
              firebase_uid: firebase_uid
            }
          );
  
          if (response.data && Array.isArray(response.data.groups)) {
            setGroupNames(response.data.groups);
            if (response.data.groups.length > 0) {
              setGroupId(response.data.groups[0].group_id);
            }
          } else {
            console.error("Unexpected response format:", response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    
    fetchMembers();
  }, []);

  const handleGroupChange = (event: SelectChangeEvent<number>) => {
    setGroupId(Number(event.target.value));
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            イベントの作成
          </h2>{" "}
          <form className="w-full" onSubmit={handleCreateEvent}>
            <TextField
              required
              margin="none"
              id="name"
              variant="outlined"
              label="イベント名"
              type="text"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="!mb-3"
            />
            <TextField
              required
              margin="none"
              id="date"
              variant="outlined"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              fullWidth
              className="!mb-3"
            />
           <FormControl fullWidth variant="outlined" className="!mb-3">
      <InputLabel id="group-select-label">グループを選択</InputLabel>
      <Select
        labelId="group-select-label"
        value={groupId}
        onChange={handleGroupChange}
        label="グループを選択"
      >
        {groupNames.map(({group_id, group_name}) => (
          <MenuItem key={group_id} value={group_id}>
            {group_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
              margin="none"
              id="detail"
              variant="outlined"
              label="詳細"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="!mb-3"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="!text-xl"
            >
              イベント作成・メンバー選択
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
