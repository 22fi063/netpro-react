import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // ○
import { Button, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Notification() {
  const events = [
    { id: 1, name: "おまつり", type: "たろう", date: "2024-07-13",groupId:"1" },
  ];

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
      <Typography variant="h5"  gutterBottom className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            招待されたイベント
          </Typography>
          <List>
            {events.map((event) => (
              <Paper key={event.id} elevation={3} className="mb-4">
                <ListItem>
                <ListItemText
                    primary={event.name}
                    secondary={`日付: ${event.date} 作成者: ${event.type}グループ名: ${event.groupId}`}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                  <div>
                    <IconButton aria-label="edit" size="small">
                    <RadioButtonUncheckedIcon color="primary" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                    <CloseIcon color="error" />
                    </IconButton>
                  </div>
                </ListItem>
              </Paper>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Notification;