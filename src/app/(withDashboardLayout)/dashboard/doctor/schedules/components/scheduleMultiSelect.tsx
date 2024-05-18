import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";

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

function getStyles(
  name: string,
  selectedSchedule: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedSchedule.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ScheduleMultiSelect = ({
  selectedSchedule,
  setSelectedSchedule,
  scheduleData,
}: any) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedSchedule>) => {
    const {
      target: { value },
    } = event;
    setSelectedSchedule(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-multiple-time-label">Select time</InputLabel>
      <Select
        placeholder="Select time"
        labelId="Select_time"
        id="demo-multiple-time-label"
        multiple
        fullWidth={true}
        value={selectedSchedule}
        onChange={handleChange}
        input={
          <OutlinedInput
            label="Select time"
            fullWidth={true}
            size="small"
            id="select-multiple-time"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected?.map((value: string) => {
              const modifiedValue = scheduleData?.find(
                (item: any) => item.id === value
              );
              return (
                <Chip
                  key={value}
                  label={`${dayjs(modifiedValue.startDateTime).format(
                    "hh:mm a"
                  )} -
                  ${dayjs(modifiedValue.endDateTime).format("hh:mm a")}`}
                />
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {scheduleData?.map((item: any) => (
          <MenuItem
            key={item.id}
            value={item.id}
            style={getStyles(item.startDateTime, selectedSchedule, theme)}
          >
            {dayjs(item.startDateTime).format("hh:mm a")}-
            {dayjs(item.endDateTime).format("hh:mm a")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScheduleMultiSelect;
