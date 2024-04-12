import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultiLineField(props) {
  const { label, placeholder, name, control } = props;
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
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          label={label}
          defaultValue={"Default"}
          placeholder={placeholder}
        />
      )}
    />
  );
}
