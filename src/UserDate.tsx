import { Button, MenuItem, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function UserDate() {
    const [schedule, setSchedule] = useState<{ [key: string]: string }>({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: ""
    });
    const navigate = useNavigate();


    const handleScheduleChange = (day: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setSchedule({ ...schedule, [day]: event.target.value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert(`予定が登録されました`);
        navigate("/home")
    };

    return (
        <div className="bg-gray-100">
            <Button
                variant="contained"
                color="primary"
                className="fixed top-8 left-8"
                component={RouterLink}
                to="/home"
            >
                戻る
            </Button>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-[800px]">
                    <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6">
                        予定共有アプリケーションへようこそ
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-wrap justify-between space-x-2">
                            {Object.keys(schedule).map((day) => (
                                <TextField
                                    key={day}
                                    select
                                    label={`${day}`}
                                    value={schedule[day]}
                                    onChange={handleScheduleChange(day)}
                                    variant="outlined"
                                    margin="normal"
                                    style={{ width: "12%" }}
                                >
                                    <MenuItem value="○">○</MenuItem>
                                    <MenuItem value="×">×</MenuItem>
                                    <MenuItem value="△">△</MenuItem>
                                </TextField>
                            ))}
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            className="w-full bg-blue-500 py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
                        >
                            予定を登録
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserDate;