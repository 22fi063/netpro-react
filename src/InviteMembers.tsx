import { Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get<Member[]>(
          `https://chat-express-zpxu.onrender.com/api/groups/${groupId}/members`
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
        await axios.post(
          "https://chat-express-zpxu.onrender.com/api/invite-members",
          {
            event_name: eventName,
            user_ids: selectedMembers,
          }
        );
        console.log("Members invited");
        setShowPopup(true); // 招待が成功したらポップアップを表示
      }
    } catch (error) {
      console.error("Error inviting members:", error);
    }
  };
  const handleClosePopup = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowPopup(false); // ポップアップを閉じる
    navigate("/home");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosePopup}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="bg-gray-100">
      <Button
        variant="contained"
        color="primary"
        className="fixed top-8 left-8"
        component={RouterLink}
        to="/event/create"
        disabled={showPopup} // ポップアップ表示中は無効
      >
        戻る
      </Button>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-10/12">
          <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            メンバー選択
          </h2>
          <ul className="mb-10">
            {members.map((member) => (
              <li key={member.user_id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.user_id)}
                    onChange={() => handleSelectMember(member.user_id)}
                    disabled={showPopup} // ポップアップ表示中は無効
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
            disabled={showPopup} // ポップアップ表示中は無効
          >
            招待を送る
          </Button>
          <Snackbar
            open={showPopup} // showPopup ステートに基づいて表示
            autoHideDuration={6000}
            onClose={handleClosePopup}
            message="招待を送信しました！"
            action={action}
          />
        </div>
      </div>
    </div>
  );
};

export default InviteMembers;
