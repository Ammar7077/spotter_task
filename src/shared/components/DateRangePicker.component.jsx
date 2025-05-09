import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Stack } from "@mui/material";
import { format } from "date-fns";

export const DateRangePicker = ({ setStart, setEnd }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    setStart(newDate);
    if (endDate && newDate && endDate < newDate) {
      setEndDate(newDate);
    }
  };

  const handleEndDateChange = (newDate) => {
    if (startDate <= newDate) {
      setEndDate(newDate);
      setEnd(newDate);
    }
  };

  const formattedStartDate = startDate ? format(startDate, "MMM dd, yyyy") : "";
  const formattedEndDate = endDate ? format(endDate, "MMM dd, yyyy") : "";

  const daysInRange =
    startDate && endDate
      ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
          maxDate={endDate}
          minDate={new Date()}
          disabled={!startDate || (endDate && startDate && startDate > endDate)}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
          minDate={startDate}
          disabled={!startDate}
        />
      </Stack>

      {/* {startDate && endDate && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Selected Range: {formattedStartDate} to {formattedEndDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {daysInRange} day{daysInRange !== 1 ? "s" : ""} selected
          </Typography>
        </Box>
      )} */}
    </LocalizationProvider>
  );
};
