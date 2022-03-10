import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useContext, useReducer } from 'react';
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import Homefeed from "./Homefeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import { CurrentUserContext } from "./CurrentUserContext";


const App = () => {
  
  const { state: { status }, 
    actions: {receiveProfileDataFromServer, failureLoadingProfileDataFromServer} } = useContext(CurrentUserContext);

    //Fetch the user data from the API (/me/profile)
    useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        receiveProfileDataFromServer(data);
      })
      .catch((err) => {
        failureLoadingProfileDataFromServer(err);
      })
    }, [])

  return (
    <Wrapper>
      {(status === "idle" &&
      <Router>
        <GlobalStyles />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Homefeed />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;

`

export default App;
