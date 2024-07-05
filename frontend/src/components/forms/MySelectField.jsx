import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function MySelectField(props) {
  const { label, name, control, width, options } = props;
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <FormControl sx={{ width: { width } }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={onChange}
            error={!!error}
          >
            {options.map(option => (
              <MenuItem value={option.id}>{option.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: '#d32f2f' }}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
