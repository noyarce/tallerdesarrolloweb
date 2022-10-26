import React, { useState } from 'react';
import { Controller } from "react-hook-form";

import { TextField, Typography } from '@mui/material';
import es from 'date-fns/locale/es';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const CustomDatePicker = ({ control, name, label, rules, ...rest }) => {

    const [errorDate, setErrorDate] = useState(false);
/**https://mui.com/x/react-date-pickers/getting-started/ */
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                    <DatePicker
                        openTo="day"
                        views={['year', 'month', 'day']}
                        value={value}
                        label={label}
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        clearable
                        disableFuture
                        allowKeyboardControl
                        onError={(err, value) =>  err == "invalidDate" ? setErrorDate(true) : setErrorDate(false)}
                        autoOk
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(event, value) => {
                            onChange(event);
                        }}
                        
                        renderInput={(params) =>
                            <TextField
                                fullWidth
                                size={"small"}
                                {...params}
                                {...rest}
                            />}

                    />
                    {errorDate && <Typography variant="body2" color="red"> Fecha no válida </Typography> }
                </LocalizationProvider>
            )}
            rules={rules}
        />
    )
}
export default CustomDatePicker;