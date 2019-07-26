import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Loader,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Card,
  Image,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const LocationsList = () => {
  // TODO: Add useState to track data from useEffect
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://rickandmortyapi.com/api/location/";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url);
      const { data } = await result;
      setLocations(data.results);
      setIsLoading(false);
    };
    fetchData();
    return () => console.log("The Effect Hook has been cleaned up.");

    // TODO: Add AJAX/API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  }, [url]);

  return (
    <Container>
      {isLoading && (
        <Fragment>
          <Loader active inline className="slow red" />
        </Fragment>
      )}
      <Header as="h2" icon inverted textAlign="center">
        Characters
        <Header.Subheader>Rick and Morty Show Characters</Header.Subheader>
      </Header>
      
      <Grid celled columns={2}>
        <Card.Group itemsPerRow={2} centered>
          {locations.map(location => (
            <Card key={location.id}>
              <Card.Content>
              <Link to={`/location/${location.id}`}>
                <Image floated="right">
                  <Icon name="world" size="large" color="green" />
                </Image>
                </Link>
                <Card.Header>{location.name}</Card.Header>
                <Card.Meta>{location.type}</Card.Meta>
                <Card.Description>{location.dimension}</Card.Description>
              </Card.Content>

            </Card>
          ))}
        </Card.Group>
      </Grid>
    </Container>
  );
};

export default LocationsList;
