import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'; // △
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // ○
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
  return { name, sunday, monday, tuesday, wednesday, thursday, friday, saturday };
}
const data = [
  createDate('たろう', '○', '△', '×', '○', '△', '×', '○'),
  createDate('はなこ', '△', '○', '△', '×', '○', '△', '×'),
  createDate('すみれ', '×', '△', '○', '△', '×', '○', '△'),
  createDate('あかり', '○', '△', '×', '○', '△', '×', '○'),
  createDate('ゆうか', '△', '○', '△', '×', '○', '△', '×'),
];
function Calendar() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth:  600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">7/13 (日)</TableCell>
            <TableCell align="right">7/14 (月)</TableCell>
            <TableCell align="right">7/15 (火)</TableCell>
            <TableCell align="right">7/16 (水)</TableCell>
            <TableCell align="right">7/17 (木)</TableCell>
            <TableCell align="right">7/18 (金)</TableCell>
            <TableCell align="right">7/19 (土)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
                </TableCell>
                {Object.values(row).slice(1).map((value, index) => (
                  <TableCell key={index} align="right">
                  {value === '○' && <RadioButtonUncheckedIcon color="primary" />}
                    {value === '△' && <ChangeHistoryIcon color="secondary" />}
                    {value === '×' && <CloseIcon color="error" />}                  </TableCell>
                ))}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Calendar;
