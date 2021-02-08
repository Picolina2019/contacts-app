import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const useStyles = makeStyles({
    root:{
      marginTop: '24px'
    }
  });
  const useContacts = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getContacts = async () => {
        try {
          setLoading(true);
          const response = await fetch('https://randomuser.me/api/?results=20');
          const { results, error } = await response.json();
          if (error) {
            throw new Error(error);
          }
          setData(results);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(true);
        }
      };
      getContacts();
    }, []);
    return {
      data,
      loading,
      error,
    };
  };

  const contacts = useContacts();
  const classes = useStyles()

  if (contacts.loading) {
      return <div>....loading</div>;
    }

    if (contacts.error) {
      return <div>error!</div>;
    }
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          {contacts.data.map((contact) => {
            return <Paper xs={12}> {contacts && contact.name.first}</Paper>;
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
