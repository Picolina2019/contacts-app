import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { VIEW_MODE } from '../constans';

export const ToggleDataViewMode = memo(({ setDataViewMode, dataViewMode }) => {
  const handleDataViewMode = useCallback(
    (_, newMode) => {
      setDataViewMode(newMode);
    },
    [setDataViewMode]
  );
  return (
    <ToggleButtonGroup
      value={dataViewMode}
      exclusive
      onChange={handleDataViewMode}>
      <ToggleButton value={VIEW_MODE.TABLE} aria-label={VIEW_MODE.TABLE}>
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value={VIEW_MODE.GRID} aria-label={VIEW_MODE.GRID}>
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
});
ToggleDataViewMode.propTypes = {
  dataViewMode: PropTypes.oneOf([VIEW_MODE.GRID, VIEW_MODE.TABLE]),
  setDataViewMode: PropTypes.func.isRequired,
};
