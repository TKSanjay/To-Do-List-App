import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./TaskList.css";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableData() {
  const [users, setUsers] = React.useState([]);

  console.log(users);

  const [open, setOpen] = React.useState(false);

  const currentEditData = { name: "", taskStatus: "" };

  const [editData, setEditData] = React.useState(currentEditData);

  // console.log(editData);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1717/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err, "err");
    }
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  const putUsers = async (value, setValue) => {
    const data = {
      id: users.length + 1,
      ...value,
    };
    try {
      await axios.put("http://localhost:1717/users/" + data.id, data);
      getUsers();
      setValue({ name: "", taskStatus: "" });
    } catch (err) {
      console.log(err, "err");
    }
  };

  const deleteUsers = async (value) => {
    try {
      await axios.delete("http://localhost:1717/users/" + value.id);
      getUsers();
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleClickOpen = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (editData.name && editData.taskStatus) {
      putUsers(editData, setEditData);
      console.log(editData);
    } else {
      alert("please enter the value");
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: 900,
          },
        }}
      >
        <form onSubmit={submit}>
          <DialogTitle>Edit Users</DialogTitle>
          <DialogContent>
            <TextField
              id='standard-password-input'
              label='Name'
              type='text'
              onChange={handleChanges}
              value={editData.name}
              name='name'
              autoComplete='current-password'
              variant='standard'
              fullWidth
            />
            <br />
            <br />
            <br />
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>
                Task Status
              </FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                name='taskStatus'
                defaultValue='Complete'
                // name='radio-buttons-group'
                onChange={handleChanges}
                value={editData.taskStatus}
              >
                <FormControlLabel
                  value='Completed'
                  control={<Radio />}
                  name='taskStatus'
                  onChange={handleChanges}
                  label='Complete'
                  // value={editData.taskStatus}
                />
                <FormControlLabel
                  value='Incompleted'
                  control={<Radio />}
                  name='taskStatus'
                  label='Incomplete'
                  onChange={handleChanges}
                  // value={editData.taskStatus}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} type='submit'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <div className='table'>
        <TableContainer
          sx={{
            width: "100%",
          }}
          component={Paper}
        >
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align='right'>Task Status</StyledTableCell>
                <StyledTableCell sx={{ marginLeft: "10px" }} align='right'>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.taskStatus}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <IconButton
                      aria-label='edit'
                      size='small'
                      onClick={() => handleClickOpen(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      size='small'
                      onClick={() => deleteUsers(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
