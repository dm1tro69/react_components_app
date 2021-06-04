import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useContacts from "./useContacts";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ContactsTable from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";

import ToggleDataViewMode from "../ToggleDataViewMode";
import { DATA_VIEW_MODE } from "../constans";
import { useDataViewMode } from "./useDataViewMode";
import { useState } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
    filtersContainer: {
      marginBottom: theme.spacing(3),
    },
    fieldGender: {
      minWidth: 120,
    },
  })
);

const FiltersDefaultValues = {
  fullname: "",
  gender: "",
};

const FilterByFullName = ({ first, last }, fullname) => {
  return (
    first?.toLowerCase().includes(fullname.toLowerCase()) ||
    last?.toLowerCase().includes(fullname.toLowerCase())
  );
};

const filterByGender = (gender, filterGender) => {
  if (filterGender.length === 0) {
    return true;
  }
  return gender === filterGender;
};

export const Contacts = () => {
  const [filters, setFilters] = useState(FiltersDefaultValues);

  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  const handleChangeFilter = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredContacts = contacts.data
    .filter((c) => FilterByFullName(c.name, filters.fullname))
    .filter((c) => filterByGender(c.gender, filters.gender));

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"h4"} component={"h1"}>
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.filtersContainer}>
          <Box display={"flex"}>
            <TextField
              label="Full Name"
              variant="outlined"
              name={"fullname"}
              size={"small"}
              value={filters.fullname}
              onChange={handleChangeFilter}
            />
            <FormControl
              size={"small"}
              variant="outlined"
              className={classes.fieldGender}
            >
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId={"gender"}
                value={filters.gender}
                name={"gender"}
                onChange={handleChangeFilter}
                label="Gander"
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress data-testid={"contacts-loader"} />;
            }
            if (contacts.isError) {
              return <div data-testid={"contacts-error"}>...error</div>;
            }
            if (dataViewMode === DATA_VIEW_MODE.TABLE) {
              return <ContactsTable data={filteredContacts} />;
            }
            if (dataViewMode === DATA_VIEW_MODE.GRID) {
              return <div data-testid={"contacts-grid-container"}>GRID</div>;
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
