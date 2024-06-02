import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { CircularProgress } from "@mui/material";

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
  selectedSpecialty: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedSpecialty?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSpecialtySelect = ({
  selectedSpecialty,
  setSelectedSpecialty,
  specialtyData,
}: any) => {
  const theme = useTheme();

  if (!specialtyData) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedSpecialty>) => {
    const {
      target: { value },
    } = event;
    setSelectedSpecialty(
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
        value={selectedSpecialty}
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
              const modifiedValue = specialtyData?.find(
                (item: any) => item.id === value
              );
              return <Chip key={value} label={modifiedValue.title} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {specialtyData?.map((item: any) => (
          <MenuItem
            key={item.id}
            value={item.id}
            style={getStyles(item.startDateTime, selectedSpecialty, theme)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSpecialtySelect;
