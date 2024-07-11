import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"; // △
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"; // ○
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";

function createDate(
  name: string,
  sunday: string,
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
  friday: string,
  saturday: string
) {
  return {
    name,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  };
}
const data = [
  createDate("たろう", "○", "△", "×", "○", "△", "×", "○"),
  createDate("はなこ", "△", "○", "△", "×", "○", "△", "×"),
  createDate("すみれ", "×", "△", "○", "△", "×", "○", "△"),
  createDate("あかり", "○", "△", "×", "○", "△", "×", "○"),
  createDate("ゆうか", "△", "○", "△", "×", "○", "△", "×"),
];
function Calendar() {
  return (
 <div>
    <Button
     variant="contained"
     color="primary"
     className="fixed top-8 left-8"
     component={RouterLink}
     to="/"
     >
     ログアウト
     </Button>
    <div className="w-11/12">
       <div className="flex flex-col items-center justify-center min-h-screen">
       <TableContainer>
         <Table aria-label="schedule table">
           <TableHead>
             <TableRow>
               <TableCell></TableCell>
               <TableCell align="center">7/13 (日)</TableCell>
               <TableCell align="center">7/14 (月)</TableCell>
               <TableCell align="center">7/15 (火)</TableCell>
               <TableCell align="center">7/16 (水)</TableCell>
               <TableCell align="center">7/17 (木)</TableCell>
               <TableCell align="center">7/18 (金)</TableCell>
               <TableCell align="center">7/19 (土)</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {data.map((row) => (
               <TableRow
                 key={row.name}
               >
                 <TableCell component="th" scope="row">
                   {row.name}
                 </TableCell>
                 {Object.values(row)
                   .slice(1)
                   .map((value, index) => (
                     <TableCell key={index} align="center">
                       {value === "○" && (
                         <RadioButtonUncheckedIcon color="primary" />
                       )}
                       {value === "△" && <ChangeHistoryIcon color="secondary" />}
                       {value === "×" && <CloseIcon color="error" />}{" "}
                     </TableCell>
                   ))}
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
       <Button
       variant="contained"
       color="primary"
       component={RouterLink}
       to="/menu"
       className="!mt-10"
       >
       メニュー
       </Button>
      </div>
    </div>
 </div>
  );
}
export default Calendar;
