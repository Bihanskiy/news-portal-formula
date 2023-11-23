import React from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

type SelectBlockProps = {
  parameter: string;
  options: {
    id: string;
    label: string;
  }[];
  onRequest?: () => void;
  value: string;
  onChange: (value: string, parameter: string) => Promise<void>;
}

const SelectBlock = ({
  parameter,
  options,
  onRequest,
  value,
  onChange
}: SelectBlockProps): JSX.Element => {

  return (
    <Select
      name={parameter}
      fullWidth
      displayEmpty
      value={value}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      size="small"
      renderValue={(selected) => {
        if (selected?.length === 0) {
          return <Typography component="span" sx={{ color: "#878B90" }}>Select</Typography>;
        }

        const selectedOption = options?.find(option => option.id === selected);
        return selectedOption?.label;
      }}
    >
      {options?.map(option => {
        return (
          <MenuItem value={option.id} key={option.id}>
            {option.label}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default SelectBlock;