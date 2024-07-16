import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function App() {
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
                    <h2 className="text-2xl font-crimson-text font-semibold text-center text-gray-800 mb-6 space-x-4">
                        
                    </h2>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/login"
                        className="w-full bg-blue-500 py-2 px-4 rounded-lg text-lg hover:bg-blue-700"
                    >
                        ログインする
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
