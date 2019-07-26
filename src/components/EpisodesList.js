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

const EpisodesList = () => {
  // TODO: Add useState to track data from useEffect
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://rickandmortyapi.com/api/episode/";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url);
      const { data } = await result;
      setEpisodes(data.results);
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
          {episodes.map(episode => (
            <Card key={episode.id}>
              <Card.Content>
              <Link to={`/doctor/${episode.id}/${episode.name}`}>
                <Image floated="right">
                  <Icon name="world" size="large" color="green" />
                </Image>
                </Link>
                <Card.Header>{episode.name}</Card.Header>
                <Card.Meta>{episode.air_date}</Card.Meta>
                <Card.Description>{episode.episode}</Card.Description>
              </Card.Content>

            </Card>
          ))}
        </Card.Group>
      </Grid>
    </Container>
  );
};

export default EpisodesList;
