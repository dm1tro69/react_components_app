import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import CopyToClipboardText from "../../../components/CopyToClipboardText";

const useStyles = makeStyles({
  table: {},
});

const ContactsTable = ({ data }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="" src={item.picture.thumbnail} />
              </TableCell>
              <TableCell>
                {item.name.title} {item.name.first} {item.name.last}
              </TableCell>
              <TableCell>
                <Typography>
                  {format(parseISO(item.dob.date), "MM/dd/yy")}
                </Typography>
                <Typography>{item.dob.age} years </Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={item.phone}></CopyToClipboardText>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={item.email}></CopyToClipboardText>
              </TableCell>
              <TableCell>6</TableCell>
              <TableCell>7</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ContactsTable;
