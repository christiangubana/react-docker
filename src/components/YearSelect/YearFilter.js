import React, { useContext } from 'react';
import YearContext from '../context/YearContext';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(yearArray, year, theme) {
  return {
    fontWeight:
      yearArray.indexOf(year) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function YearFilter() {
  const { year, setYear } = useContext(YearContext);
  const theme = useTheme();

  const thisYear = new Date().getFullYear();
  const filterSize = thisYear - 1950;
  const yearArray = Array(filterSize)
    .fill(0)
    .map((e, i) => i + 2005 + '');

  yearArray.push(thisYear);
  yearArray.reverse();

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className='mt-28'>
      <FormControl className="mt-16 w-48 mb-8 ml-8 md:ml-32 md:w-60">
        <InputLabel id="demo-multiple-name-label">Year</InputLabel>
        <Select
          id="demo-multiple-name"
          value={year}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {yearArray.map((year) => (
            <MenuItem key={year} value={year} style={getStyles(yearArray, year, theme)}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default YearFilter;
