import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from "react-hook-form";

 const CustomTextField = ({ control, 
 name, label, disabled, 
 type = 'text', valor = false, ...rest }) => {
    return (
        <Controller name={name} control={control} render={({ field: { onChange, value } }) => (
            <TextField
                margin='dense'
                id={name}
                label={label}
                variant="outlined"
                onChange={onChange}
                value={disabled ? '' : value}
                fullWidth
                size='small'
                disabled={disabled}
                type={type}
                {...rest}
            />
        )} />
    )
}
export default CustomTextField;