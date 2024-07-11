import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [groupId, setGroupId] = useState(1);
  const navigate = useNavigate();

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;

      if (user) {
        console.log(groupId);
        const response = await axios.post("http://localhost:3000/api/events", {
          event_name: eventName,
          event_date: eventDate,
          firebase_uid: user.uid,
          group_id: groupId,
        });
        console.log("Event created:", response.data);
        navigate("/event/invite", { state: { groupId: groupId, eventName: eventName } });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <h1 className="text-4xl mb-10">イベントの作成</h1>
        <form className="w-5/12" onSubmit={handleCreateEvent}>
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
          <TextField
            required
            margin="none"
            id="number"
            variant="outlined"
            type="number"
            fullWidth
            value={groupId !== null ? groupId : ""}
            onChange={(e) => setGroupId(parseInt(e.target.value))}
            className="!mb-10"
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
  );
};

export default CreateEvent;
