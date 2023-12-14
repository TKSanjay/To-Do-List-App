import TableData from "../Table/Table";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Home.css";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import EditUser from "../EditUser/EditUser";

function Home() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const [data, setData] = React.useState({ name: "", taskStatus: "" });

  const currentEditData = { name: "", taskStatus: "" };

  const [editData, setEditData] = React.useState(currentEditData);

  const [editing, setEditing] = React.useState(false);

  // console.log(data);

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

  const postUsers = async (value, editValue) => {
    const data = {
      id: users.length + 1,
      ...value,
    };
    try {
      await axios.post("http://localhost:1717/users", data);
      getUsers();
      editValue({ name: "", taskStatus: "" });
    } catch (err) {
      console.log(err, "err");
    }
  };

  const editUser = (value) => {
    setEditing(true);
    setEditData(value);
  };

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

  const handleClickOpen = () => {
    setOpen(true);
    setEditing(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sumbit = (e) => {
    e.preventDefault();
    if (data.name && data.taskStatus) {
      postUsers(data, setData);

      // console.log(data);
    } else {
      alert("please enter the value");
    }
  };

  return (
    <div>
      <React.Fragment>
        <div className='btn'>
          <Button variant='outlined' onClick={handleClickOpen}>
            Add Users
          </Button>
        </div>
        <div className='dialog'>
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
            {editing ? (
              <div>
                <EditUser
                  editData={editData}
                  setOpen={setOpen}
                  putUsers={putUsers}
                />
              </div>
            ) : (
              <div>
                <form onSubmit={sumbit}>
                  <DialogTitle>Add Users</DialogTitle>
                  <DialogContent>
                    <TextField
                      id='standard-password-input'
                      label='Name'
                      type='text'
                      onChange={handleChanges}
                      value={data.name}
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
                        value={data.taskStatus}
                      >
                        <FormControlLabel
                          value='Completed'
                          control={<Radio />}
                          name='taskStatus'
                          onChange={handleChanges}
                          label='Complete'
                        />
                        <FormControlLabel
                          value='Incompleted'
                          control={<Radio />}
                          name='taskStatus'
                          label='Incomplete'
                          onChange={handleChanges}
                        />
                      </RadioGroup>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} type='submit'>
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </div>
            )}
          </Dialog>
        </div>
      </React.Fragment>

      <br />
      <TableData
        users={users}
        editUser={editUser}
        setOpen={setOpen}
        deleteUsers={deleteUsers}
      />
    </div>
  );
}

export default Home;
