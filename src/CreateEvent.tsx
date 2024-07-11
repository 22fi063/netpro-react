import { Button } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { auth } from './firebase';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [groupId, setGroupId] = useState(1);

  const handleCreateEvent = async () => {
    try {
        const user = auth.currentUser;
        
        if (user) {
          console.log(groupId);
          const response = await axios.post('http://localhost:3000/api/events', 
            {
              event_name: eventName,
              event_date: eventDate,
              firebase_uid: user.uid,
              group_id: groupId
            }
          );
          console.log('Event created:', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <div>
    <h2>Create Event</h2>
    <input
      type="text"
      value={eventName}
      onChange={(e) => setEventName(e.target.value)}
      placeholder="Event Name"
    />
    <input
      type="date"
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
    />
    <input
      type="number"
      value={groupId !== null ? groupId : ''}
      onChange={(e) => setGroupId(parseInt(e.target.value))}
      placeholder="Group ID"
    />
    <Button onClick={handleCreateEvent}
           sx={{ mt: 3, mb: 2 }}
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              イベント作成
            </Button>
    <RouterLink to="/event/invite" state={{ groupId: groupId, eventName: eventName }} className="no-underline">
          <div className="flex flex-col">
            <Button
           sx={{ mt: 3, mb: 2 }}
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              メンバー招待
            </Button>
          </div>
        </RouterLink>
  </div>
  );
};

export default CreateEvent;
