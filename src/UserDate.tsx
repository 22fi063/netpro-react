import { Button, MenuItem, TextField } from "@mui/material";
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from './firebase'; // Firebase authをインポート

function UserDate() {
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    const [schedule, setSchedule] = useState<{ [key: string]: string }>({
        [dates[0]]: "",
        [dates[1]]: "",
        [dates[2]]: "",
        [dates[3]]: "",
        [dates[4]]: "",
        [dates[5]]: "",
        [dates[6]]: ""
    });

    const navigate = useNavigate();

    const handleScheduleChange = (day: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setSchedule({ ...schedule, [day]: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (user) {
            const firebase_uid = user.uid;

            const schedules = Object.keys(schedule).map((day) => {
                const value = schedule[day];
                let status;
                if (value === "○") status = 0;
                else if (value === "△") status = 1;
                else if (value === "×") status = 2;
                else status = null;
                return { date: day, status };
            });
            try {
                const response = await axios.post('https://chat-express-zpxu.onrender.com/api/schedules/batch', {
                    schedules,
                    firebase_uid
                });

                if (response.status === 201) {
                    alert('予定が登録されました');
                    navigate("/home");
                } else {
                    alert('エラーが発生しました');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('サーバーエラーが発生しました');
            }
        } else {
            alert('ユーザーが認証されていません');
        }
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
