import { Box, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { memo, useCallback } from 'react';
import { NATIONALITIES_FULL_NAME } from '../../../constans/nationality';

const NameField = memo(({ onChange, fullname }) => {
  return (
    <TextField
      name='fullname'
      label='fullname'
      variant='outlined'
      value={fullname}
      onChange={onChange}
    />
  );
});
const GenderField = memo(({ gender, onChange }) => {
  return (
    <FormControl variant='outlined'>
      <InputLabel id='gender'>Gender</InputLabel>
      <Select
        labelId='gender'
        name='gender'
        value={gender}
        onChange={onChange}
        label='gender'>
        <MenuItem value='all'>All</MenuItem>
        <MenuItem value='male'>Male</MenuItem>
        <MenuItem value='female'>Female</MenuItem>
      </Select>
    </FormControl>
  );
});

const NationalityField = memo(({ nationality, onChange }) => {
  return (
    <FormControl variant='outlined'>
      <InputLabel id='nationality'>Nationality</InputLabel>
      <Select
        labelId='nationality'
        name='nationality'
        value={nationality}
        onChange={onChange}
        label='nationality'>
        <MenuItem value='all'>All</MenuItem>
        {Object.entries(NATIONALITIES_FULL_NAME).map(([key, value]) => (
          <MenuItem value={key} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
const useStyles = makeStyles((theme) =>
  createStyles({
    boxContainer: {
      '& > *': {
        marginRight: theme.spacing(2),
      },
    },
  })
);
export const ContactsFilters = memo(({ filters, onChangeFilters, onClear }) => {
  const classes = useStyles();

  const handleChangeFilters = useCallback(
    (e) => {
      onChangeFilters(e.target.name, e.target.value);
    },
    [onChangeFilters]
  );
  return (
    <Box display='flex' justifyContent='space-between'>
      <Box display='flex' className={classes.boxContainer}>
        <NameField onChange={handleChangeFilters} fullname={filters.fullname} />
        <GenderField onChange={handleChangeFilters} gender={filters.gender} />
        <NationalityField
          onChange={handleChangeFilters}
          nationality={filters.nationality}
        />
      </Box>
      <Button
        variant='outlined'
        color='secondary'
        size='small'
        onClick={onClear}>
        Clear
      </Button>
    </Box>
  );
});
