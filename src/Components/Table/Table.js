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
import "./Table.css";

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

export default function TableData(props) {
  const handleChanges = (row) => {
    // console.log(row);
    props.setOpen(true);
    props.editUser(row);
  };

  return (
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
            {props.users.map((row) => (
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
                    // onClick={() => props.editUser(row)}
                    onClick={() => handleChanges(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='small'
                    onClick={() => props.deleteUsers(row)}
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
  );
}
