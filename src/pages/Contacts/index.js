import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useContacts from "./useContacts";
import { Box, Typography } from "@material-ui/core";
import ContactsTable from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";

import ToggleDataViewMode from "../ToggleDataViewMode";
import { DATA_VIEW_MODE } from "../constans";
import { useDataViewMode } from "./useDataViewMode";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

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
              return <ContactsTable data={contacts.data} />;
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
