import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";


export default function MaterialDesignOne() {

  const names = [
    {name:"Alice", id: 1},
    {name: "Bob", id: 2}, 
    {name: "Charlie", id: 3},
    {name: "Diana", id: 4},
    {name: "Ethan", id: 5},
    {name: "Fiona", id: 6}
  ];

  const [value, setValue] = useState([]);

  useEffect(()=> {
    console.log(value);
  }, [value])

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        color="primary"
        onClick={() => alert("done")}
      >
        Delete
      </Button>

      <Autocomplete
        disablePortal
        multiple
        onChange={(e, newValue)=> setValue(newValue)}
        getOptionLabel={(option) => option.name}
        options={names}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </>
  );
}
