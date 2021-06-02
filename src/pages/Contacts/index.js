import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("https://randomuser.me/api/?results=200");
        const { results, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        setData(results);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);
  return {
    data,
    isError,
    isLoading,
  };
};

export const Contacts = () => {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <div>...loading</div>;
  }
  if (contacts.isError) {
    return <div>...error</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>Contacts {contacts.data[0].name.first}</div>
        </Grid>
      </Grid>
    </Container>
  );
};
