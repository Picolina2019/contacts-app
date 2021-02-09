import { Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import './App.css';
import { ContactsTable } from './pages/Contacts/contactsTable';
import { useContacts } from './pages/Contacts/useContacts';

const VIEW_MODE = {
  TABLE: 'table',
  GRID: 'grid',
};

function App() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        marginTop: theme.spacing(4),
      },
      headContainer: {
        marginBottom: theme.spacing(3),
      },
      loader:{
        textAlign: 'center',
      }
    })
  );

  const contacts = useContacts();
  const classes = useStyles();
  const [dataViewMode, setDataViewMode] = useState(VIEW_MODE.TABLE);

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <Typography variant='h4' component='h4'>
            Contacts
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {(() => {
            if (contacts.loading) {
              return (
                <div className={classes.loader}>
                  <Loader
                    type='BallTriangle'
                    color='#00BFFF'
                    height={100}
                    width={100}
                  />
                </div>
              );
            }

            if (contacts.error) {
              return <div>error!</div>;
            }
            if (dataViewMode === VIEW_MODE.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }
            if (dataViewMode === VIEW_MODE.GRID) {
              return 'grid';
            }

            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
