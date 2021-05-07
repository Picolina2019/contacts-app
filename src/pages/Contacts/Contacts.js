import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { VIEW_MODE } from './constans';
import { ContactsFilters } from './ContactsFilters';
import { ContactsTable } from './ContactsTable';
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
    filtersContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);
const defaultFilters = {
  fullname: '',
  gender: 'all',
  nationality:'all'
};
const filterByName = ({ first, last }, fullname) =>
  first.toLowerCase().includes(fullname.toLowerCase()) ||
  last.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (genderFilter, gender) => {
  if (genderFilter === 'all') {
    return true;
  }
  return gender === genderFilter;
};
const filterByNationality = (nationalityFilter, nat) => {
  if (nationalityFilter === 'all') {
    return true;
  }
  return nat === nationalityFilter;
};
export const Contacts = () => {
  const { error, loading, data } = useContacts();
  const classes = useStyles();
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const [filters, setFilters] = useState(defaultFilters);
  const onChangeFilters = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const filteredContacts = data
    .filter((c) => filterByName(c.name, filters.fullname))
    .filter((c) => filterByGender(filters.gender, c.gender))
    .filter((c) => filterByNationality(filters.nationality, c.nat));
  console.log(filteredContacts);
  const onClear=()=>{
    setFilters(defaultFilters);
  }
console.log(data);
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

        <Grid item xs={12} className={classes.filtersContainer}>
          <ContactsFilters
            filters={filters}
            onChangeFilters={onChangeFilters}
            onClear={onClear}
          />
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

            if (error && !filteredContacts) {
              return <div>error!</div>;
            }
            if (dataViewMode === VIEW_MODE.TABLE) {
              return <ContactsTable contacts={filteredContacts} />;
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
