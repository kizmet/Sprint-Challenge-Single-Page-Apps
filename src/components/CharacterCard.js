import React, { Fragment, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import axios from "axios";
import { Container, Loader, Image, Card, Grid, Reveal } from "semantic-ui-react";

const CharacterCard = props => {
  const [urls, setUrls] = useState(props.characters);
  const [url, setUrl] = useState(props.character1);
  const [characters, setCharacters] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [ids, setIds] = useState([]);
  const [viewIds, setViewIds] = useState([])



  useEffect(() => {
    const fetchDatas = async () => {
      const promiseArray = urls.map(url => axios.get(url));
      try {
        const data = (await Promise.all(promiseArray)).map(res => res.data);
      console.log(data)
      setCharacters(data);
        
        setIsLoading(false);
        setFetched(true);

      } catch (error) {
        console.error(error);
      }
    };



    fetchDatas()

    return () => console.log("The Effect Hook has been cleaned up.");
  }, [urls]);






  const styles = {

  };
  return (
    <Grid relaxed columns={4}>
          <style>
        {`
      .char_img {
            height: 100px;
    width: 100px; 
    border-radius: 50%!important;
      }
    }
    `}
      </style>
      {!fetched ? (
        <Fragment>
          <Loader active inline className="slow red" />
        </Fragment>
      ) : (
        
          <>
          {console.log(viewIds)}
          {characters.map(character => (
            <Grid.Column key={character.id}>
              
                <Card.Header>{`${character.name}`}</Card.Header>
                <Image className="char_img" src={character.image} />

            </Grid.Column>
            ))}
          </>
        
      )}
    </Grid>
  );
};

export default CharacterCard;




