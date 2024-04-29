'use client'
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

export default function TimePicking({onTimeChange} : {onTimeChange:Function}) {
    const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >     
        <TimePicker
        className="bg-white justify-center w-[100%] rounded-md"
          label="--:--"
          ampm={false}
          value={value}
          onChange={(newValue) => {setValue(newValue); onTimeChange(newValue);}}
        />
    </LocalizationProvider>
  );
}