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
  Button,
  List,
  Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";

const LocationCard = props => {
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const id = props.match.params.id;
  const url = `https://rickandmortyapi.com/api/location/${id}`;
  const [residents, setResidents] = useState([]);
  const [characterUrl, setCharacterUrl] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get(url).then(result => {
        const { data } = result;
        setLocation(data);
        setIsLoading(false);
        setResidents(data.residents);
        setFetched(true);
      });
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
      <Segment>


      
        
          <Header>{location.name}</Header>
        
        
          <Header>{location.type}</Header>

          <p>{location.dimension}</p>
        
        <Segment>
          {fetched && (
            <CharacterCard  characters={residents} />
          )}
        </Segment>
      </Segment>
    </Container>
  );
};

export default LocationCard;
