import { Button, TextField } from "@mui/material";
import axios from 'axios';
import { FormEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from './firebase';

function Create() {
  const [groupname, setGroupname] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const response = await axios.post('http://localhost:3000/api/groups', {
          group_name: groupname
          });
          console.log('Group created:', response.data);
        }
      navigate("/home");
      } catch (error) {
        console.error(error);
      }
    };
  return (
   <div>
     <Button
     variant="contained"
     color="primary"
     className="fixed top-8 left-8"
     component={RouterLink}
     to="/"
     >
     はじめから
     </Button>
     <div className="flex flex-col items-center justify-center min-h-screen">
       <h1 className="text-4xl mb-10">
             グループ名を入力してください
           </h1>
         <form className="flex flex-col w-5/12" onSubmit={handleSubmit}>
             <TextField
              required
              margin="none"
               id="username"
               name="username"
               variant="outlined"
               label="グループ名"
               type="text"
               fullWidth
               value={groupname}
               onChange={(e) => setGroupname(e.target.value)}
               className="!mb-3"
             />
               <Button
                 variant="contained"
                 type="submit"
               >
                 グループ作成
               </Button>
         </form>
     </div>
   </div>
  );
}

export default Create;
