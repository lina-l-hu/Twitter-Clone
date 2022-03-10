import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useContext, useReducer } from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Sidebar";
import Homefeed from "./Homefeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import ErrorHandler from "./ErrorHandler";
import { CurrentUserContext } from "./CurrentUserContext";


const App = () => {
  
  const { state: { status, }, 
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
    <ErrorBoundary FallbackComponent={ErrorHandler}>
    <Wrapper>

      {(status === "loading" && 
            <LoadingDiv>
              <FiLoader className="loadingIcon"/>
            </LoadingDiv>)}

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
    </ErrorBoundary>
  )
};

const Wrapper = styled.div`
  display: flex;
  
  `

  const spinning = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
  `;

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 200px;
  
  .loadingIcon {
    width: 30px;
    height: 30px;
    margin-top: 100px;
    animation: ${spinning} 500ms infinite;
    animation-timing-function: linear;
 }
`

export default App;
