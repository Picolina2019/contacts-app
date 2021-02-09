import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './App.css';
import { useContacts } from './Components/Contacts/useContacts';
import {ContactsTable} from './Components/contactsTable'

function App() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        marginTop: theme.spacing(4),
      },
      gridContainer: {
        marginBottom: theme.spacing(3),
      },
    })
  );

  const contacts = useContacts();
  console.log(contacts)
  const classes = useStyles();

  if (contacts.loading) {
    return <div>....loading</div>;
  }

  if (contacts.error) {
    return <div>error!</div>;
  }
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.gridContainer}>
          <Typography variant='h4' component='h4'>
            {' '}
            Contacts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ContactsTable data={contacts.data}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
