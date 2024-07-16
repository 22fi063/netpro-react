import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function EventList() {
  const events = [
    { id: 1, name: "おまつり", type: "たろう", date: "2024-07-13" },
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
          <Typography
            variant="h5"
            gutterBottom
            className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4"
          >
            作成したイベント一覧
          </Typography>
          <List>
            {events.map((event) => (
              <Paper key={event.id} elevation={3} className="mb-4">
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant="caption" color="textSecondary">{`グループ名: ${event.type}`}</Typography>
                        <Typography variant="h6">{event.name}</Typography>
                      </>
                    }
                    secondary={`日付: ${event.date} 作成者: ${event.type}`}
                  />
                  <div>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon />
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

export default EventList;
