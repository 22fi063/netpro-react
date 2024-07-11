import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get<Member[]>(
          `http://localhost:3000/api/groups/${groupId}/members`
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [groupId]);

  const handleSelectMember = (memberId: number) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleInviteMembers = async () => {
    console.log(eventName);
    try {
      const user = auth.currentUser;
      if (user) {
        await axios.post("http://localhost:3000/api/invite-members", {
          event_name: eventName,
          user_ids: selectedMembers,
        });
        console.log("Members invited");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error inviting members:", error);
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
     <div className="w-8/12">
       <h1 className="text-4xl mb-10">メンバー選択</h1>
         <ul className="mb-10">
           {members.map((member) => (
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
         <Button
           fullWidth
           onClick={handleInviteMembers}
           variant="contained"
           className="!text-xl"
         >
           招待を送る
         </Button>
     </div>
      </div>
  </div>
  );
};

export default InviteMembers;
