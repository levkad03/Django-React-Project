import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultiLineField(props) {
  const { label, width, placeholder, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          sx={{ width: { width } }}
          id="outlined-multiline-flexible"
          onChange={onChange}
          value={value}
          multiline
          maxRows={4}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}
