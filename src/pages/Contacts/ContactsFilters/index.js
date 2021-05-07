import { Box, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NATIONALITIES_FULL_NAME } from '../../../constans/nationality';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    boxContainer: {
      '& > *': {
        marginRight: theme.spacing(2),
      },
      //  genContainer:{
      //   minWidth:180,
      // },
      // natContainer:{
      //   minWidth:190,
      // }
    },
  })
);
export const ContactsFilters = ({ filters, onChangeFilters,onClear }) => {
  const classes = useStyles();

  const handleChangeFilters = (e) => {
    onChangeFilters(e.target.name, e.target.value);
  };
  return (
    <Box display='flex' justifyContent='space-between'>
      <Box display='flex' className={classes.boxContainer}>
        <TextField
          name='fullname'
          label='fullname'
          variant='outlined'
          value={filters.fullname}
          onChange={handleChangeFilters}
        />
        <FormControl variant='outlined' className={classes.genContainer}>
          <InputLabel id='gender'>Gender</InputLabel>
          <Select
            labelId='gender'
            name='gender'
            value={filters.gender}
            onChange={handleChangeFilters}
            label='gender'>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='outlined' className={classes.natContainer}>
          <InputLabel id='nationality'>Nationality</InputLabel>
          <Select
            labelId='nationality'
            name='nationality'
            value={filters.nationality}
            onChange={handleChangeFilters}
            label='nationality'>
            <MenuItem value='all'>All</MenuItem>
            {Object.entries(NATIONALITIES_FULL_NAME).map(([key, value]) => (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
};
