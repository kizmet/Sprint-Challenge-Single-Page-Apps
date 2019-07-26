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

const CharacterList = () => {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://rickandmortyapi.com/api/character/";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url);
      const { data } = await result;
      setCharacters(data.results);
      setIsLoading(false);
    };
    fetchData();
    return () => console.log("The Effect Hook has been cleaned up.");

    // TODO: Add AJAX/API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
  }, [url]);

  return (
    <Container>
      <style>
        {`
      html, body {
        background-color: #252839 !important;
      }
    }
    `}
      </style>
      {isLoading && (
        <Fragment>
          <Loader active inline className="slow red" />
        </Fragment>
      )}
      <Header as="h2" icon inverted textAlign="center">
        {console.log(characters)}
        <Icon name="grid layout" />
        Characters
        <Header.Subheader>Rick and Morty Show Characters</Header.Subheader>
      </Header>
      <Grid celled columns={2}>
        <Card.Group itemsPerRow={2} centered>
          {characters.map(character => (
            <Card key={character.id}>
              <Card.Content>
                <Link to={`/doctor/${character.id}/${character.name}`}>
                  <Image className="characterImg" src={character.image} />
                </Link>
                <Card.Header>{`${character.name}`}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                  <Button basic color="blue">
                    Page
                  </Button>


              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid>
    </Container>
  );
};

export default CharacterList;
