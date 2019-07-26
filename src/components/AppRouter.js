import React from 'react'
import { Switch, Route } from 'react-router-dom';
import CharacterList from './CharacterList'
import WelcomePage from './WelcomePage';
import LocationsList from './LocationsList';
import EpisodesList from './EpisodesList';
import CharacterCard from './CharacterCard';
import LocationCard from './LocationCard';


const RouteWithProps = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        
          return <Component {...routeProps} />;
        
      }}
    />
  );
};


export default function AppRouter() {
  return <div className="page-view ui bottom attached segment active tab">
    <Switch>
      <Route path='/characters' component={CharacterList} />
      <RouteWithProps path='/character/:id/:name' component={CharacterCard} />
      <Route path='/locations' component={LocationsList} />
      <RouteWithProps path='/location/:id' component={LocationCard} />
      <Route path="/episodes" component={EpisodesList} /> 
      <Route exact path="/" component={WelcomePage} />
      
    </Switch>
  </div>

}
