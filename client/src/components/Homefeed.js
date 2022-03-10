import { useEffect, useState, useReducer, useContext } from 'react';
import styled from "styled-components";

import SmallTweet from './SmallTweet';
import TweetTextbox from './TweetTextbox';
import PageHeader from './PageHeader';
import { CurrentUserContext } from './CurrentUserContext';
import { COLORS } from '../constants';


const initialState = {
  tweetIds: null,
  tweetsById: null, 
  status: "loading", 
  error: null, 
}

const reducer = (state, action) => {
  switch (action.type) {
    case ("receive-homefeed-data-from-server"):
      return {
        ...state,
        tweetIds: action.tweetIds,
        tweetsById: action.tweetsById, 
        status: "idle",
      }

    case ("failure-loading-homefeed-data-from-server"):
      return {
        ...initialState,
        status: "failed",
        error: action.error,
      }
    }
}

// status={feedState.status} tweetIds={feedState.tweetIds} tweetsById={feedState.tweetsById}

const HomeFeed = () => {

  const { newTweetCount } = useContext(CurrentUserContext);

  const [ feedState, dispatch ] = useReducer(reducer, initialState);

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
      }, [newTweetCount])

    return (
      <Wrapper>
        <PageHeader>Home</PageHeader>
        <TweetTextbox /> 
        {(feedState.status === "loading" && 
            <h3>Feed is loading!</h3>)}
    
        {(feedState.status === "idle" &&
          <>
          {feedState.tweetIds.map((id) => {
            let tweet = feedState.tweetsById[id];
            if (Object.keys(tweet).includes("retweetFrom")) {
              return (
                <SmallTweet key={id} tweetId={tweet.id} isRetweetedPost={true} retweeterHandle={tweet.author.handle} 
                  retweeterAuthor={tweet.author.displayName} avatarSrc={tweet.retweetFrom.avatarSrc}
                  authorHandle={tweet.retweetFrom.handle} authorName={tweet.retweetFrom.displayName}
                  status={tweet.status} date={tweet.timestamp} 
                  mediaSrc={((tweet.media).length !== 0) ? (tweet.media[0]).url: undefined}
                  />
              )
            }
            else {
              return (
                <SmallTweet key={id} tweetId={tweet.id} isRetweetedPost={false} retweeterHandle="" 
                retweeterAuthor="" avatarSrc={tweet.author.avatarSrc}
                  authorHandle={tweet.author.handle} authorName={tweet.author.displayName}
                  status={tweet.status} date={tweet.timestamp} 
                  mediaSrc={((tweet.media).length !== 0) ? (tweet.media[0]).url: undefined}
                  />
              )
            }
          })
        }         
        </>  
        )}
        
      </Wrapper>
    );
};

const Wrapper = styled.div`
  `

// const PageTitle = styled.div`
//     padding: 10px;
//     padding-left: 20px;
//     border: 1px solid ${COLORS.outlineColor};
//     width: 100%;
// `
export default HomeFeed;