import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Loader from 'react-loader-spinner';
import { VIEW_MODE } from './constans';
import { ContactsTable } from './contactsTable';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { useContacts } from './useContacts';
import { useDataViewMode } from './UseDataViewMode';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
    loader: {
      textAlign: 'center',
    },
  })
);

export const Contacts = () => {
  const { error, loading, data } = useContacts();
  const classes = useStyles();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h4' component='h4'>
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          {(() => {
            if (loading) {
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

            if (error) {
              return <div>error!</div>;
            }
            if (dataViewMode === VIEW_MODE.TABLE) {
              return <ContactsTable data={data} />;
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
};
