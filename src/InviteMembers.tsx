import { Button } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { auth } from './firebase';

interface Member {
  user_id: number;
  name: string;
  email: string;
}

interface InviteMembersProps {
  groupId: number;
  eventName: string;
}

const InviteMembers = () => {
  const location = useLocation();
  const { groupId } = location.state as InviteMembersProps;
  const { eventName } = location.state as InviteMembersProps;
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get<Member[]>(`http://localhost:3000/api/groups/${groupId}/members`);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [groupId]);

  const handleSelectMember = (memberId: number) => {
    setSelectedMembers(prevSelected =>
      prevSelected.includes(memberId) ? prevSelected.filter(id => id !== memberId) : [...prevSelected, memberId]
    );
  };

  const handleInviteMembers = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await axios.post('http://localhost:3000/api/invite-members', 
          {
            event_name: eventName,
            user_ids: selectedMembers
          },

        );
        console.log('Members invited');
      }
    } catch (error) {
      console.error('Error inviting members:', error);
    }
  };

  return (
    <div>
      <h2>Invite Members to Event</h2>
      <ul>
        {members.map(member => (
          <li key={member.user_id}>
            <label>
              <input
                type="checkbox"
                checked={selectedMembers.includes(member.user_id)}
                onChange={() => handleSelectMember(member.user_id)}
              />
              {member.name} ({member.email})
            </label>
          </li>
        ))}
      </ul>
      <Button onClick={handleInviteMembers}
           sx={{ mt: 3, mb: 2 }}
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              招待を送る
            </Button>
            <RouterLink to="/home" className="no-underline">
          <div className="flex flex-col">
            <Button
           sx={{ mt: 3, mb: 2 }}
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
            >
              戻る
            </Button>
          </div>
        </RouterLink>
     
    </div>
  );
};

export default InviteMembers;
