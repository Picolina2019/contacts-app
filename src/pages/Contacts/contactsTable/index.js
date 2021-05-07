import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { CopyToClipBoardText } from '../../../Components/copyToClopBoardText';
import { NATIONALITIES_FULL_NAME } from '../../../constans/nationality';

const useStyles = makeStyles({
  table: {},
});
export const ContactsTable = ({ contacts }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='contacts table'>
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
          {contacts.map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component='th' scope='row'>
                <Avatar src={contact.picture.thumbnail} alt='' />
              </TableCell>
              <TableCell>
                {contact.name.title} {contact.name.first}
                {contact.name.last}
              </TableCell>
              <TableCell>
                {format(parseISO(contact.dob.date), 'MM/dd/yyyy')}
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipBoardText text={contact.email} />
              </TableCell>
              <TableCell>
                <CopyToClipBoardText text={contact.phone} />
              </TableCell>
              <TableCell>
                <Typography>{contact.location.country}</Typography>
                <Typography>
                  {contact.location.city}, {contact.location.street.name}
                  {contact.location.street.number}
                </Typography>
              </TableCell>

              <TableCell>{NATIONALITIES_FULL_NAME[contact.nat]} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
