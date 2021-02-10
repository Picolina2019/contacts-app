import { useState, useEffect} from 'react';
import { VIEW_MODE } from './constans';

const getInitialDataViewMode = () => {
  return localStorage.getItem('dataViewMode' || VIEW_MODE.TABLE);
};

export const useDataViewMode = () => {
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  useEffect(() => {
    localStorage.setItem('dataViewMode', dataViewMode);
  }, [dataViewMode]);
  return [dataViewMode, setDataViewMode];
};
