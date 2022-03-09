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



const initialState = {
  homefeedTweetIds: null,
  homefeedTweetsById: null, 
  status: "loading", 
  error: null, 
}

const reducer = (state, action) => {
  switch (action.type) {
    case ("receive-homefeed-data-from-server"):
      return {
        ...state,
        homefeedTweetIds: action.tweetIds,
        homefeedTweetsById: action.tweetsById, 
        status: "loaded",
      }

    case ("failure-loading-homefeed-data-from-server"):
      return {
        ...state,
        status: "failed",
        error: action.error,
      }
    }
}


const App = () => {
  
  const { state: { status }, 
    actions: {receiveProfileDataFromServer, failureLoadingProfileDataFromServer} } = useContext(CurrentUserContext);
  
  const [ feedState, dispatch ] = useReducer(reducer, initialState);

    //Fetch the user data from the API (/me/profile)
    useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.profile.handle)
        receiveProfileDataFromServer(data);
      })
      .catch((err) => {
        console.log("profile load err", err);
        failureLoadingProfileDataFromServer(err);
      })
    }, [])

    //Fetch homefeed data from the API
    useEffect(() => {
      fetch("/api/me/home-feed")
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          dispatch({
            type: "receive-homefeed-data-from-server",
            ...data,
          })
        })
        .catch((err) => {
          console.log("Error:", err);
          dispatch({
            type: "failure-loading-homefeed-data-from-server",
            error: err,
          });
        })
      }, [])

  return (
    <Wrapper>
      {(status === "loading" && 
          <h3>Page is loading!</h3>)}
      {(status !== "loading" && 
      <Router>
      <GlobalStyles />
      <Sidebar />
        <Switch>
          <Route exact path="/">
            <Homefeed status={feedState.status} tweetIds={feedState.homefeedTweetIds} tweetsById={feedState.homefeedTweetsById}/>
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
