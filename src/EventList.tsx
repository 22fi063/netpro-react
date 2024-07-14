import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EventList() {
  const events = [
    { id: 1, name: "おまつり", type: "たろう" },
    { id: 2, name: "", type: "" },
    { id: 3, name: "", type: "" },
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
          <Typography variant="h5" gutterBottom className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
            作成したイベント一覧
          </Typography>
          <List>
            {events.map((event) => (
              <Paper key={event.id} elevation={3} className="mb-4">
                <ListItem>
                  <ListItemText
                    primary={event.name}
                    secondary={"作成者:" + event.type}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                  <div>
                    <IconButton aria-label="edit" size="small">
                      <EditIcon />
                    </IconButton>
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
