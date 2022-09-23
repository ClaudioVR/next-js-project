import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall({ sortByName, sortByAge }) {
  const [sortBy, setSortBy] = React.useState("");

  const handleChange = (event) => {
    let sortBy = event.target.value;
    setSortBy(sortBy);
    if (sortBy === "name") sortByName();
    if (sortBy === "age") sortByAge();
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sort by</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Sort by"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"name"}>Name</MenuItem>
        <MenuItem value={"age"}>Age</MenuItem>
        <MenuItem value={"favourite"}>Favourites</MenuItem>
      </Select>
    </FormControl>
  );
}
