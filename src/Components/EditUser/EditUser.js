import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function EditUser(props) {
  const [data, setData] = React.useState(props.editData);

  console.log(data);

  React.useEffect(() => {
    setData(props.editData);
  }, [props.editData]);

  const handleChanges = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.name && data.taskStatus) {
      props.putUsers(data, setData);
    } else {
      alert("please enter the value");
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={submit}>
        <DialogTitle>Edit Users</DialogTitle>
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
                // value={data.taskStatus}
              />
              <FormControlLabel
                value='Incompleted'
                control={<Radio />}
                name='taskStatus'
                label='Incomplete'
                onChange={handleChanges}
                // value={data.taskStatus}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Cancel</Button>
          <Button onClick={() => props.setOpen(false)} type='submit'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default EditUser;
