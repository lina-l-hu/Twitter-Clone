import { useEffect, useState, useReducer, useContext } from 'react';
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import SmallTweet from './SmallTweet';
import TweetTextbox from './TweetTextbox';
import PageHeader from './PageHeader';
import { CurrentUserContext } from './CurrentUserContext';
import ErrorHandler from './ErrorHandler';
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

const HomeFeed = () => {

  const { newTweetCount } = useContext(CurrentUserContext);

  const [ feedState, dispatch ] = useReducer(reducer, initialState);

  const [errorState, setErrorState] = useState(false);

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
          setErrorState(true);
          dispatch({
            type: "failure-loading-homefeed-data-from-server",
            error: err,
          });
        })
      }, [newTweetCount])
    
      if (errorState) {
        return <ErrorHandler />
      }

    return (
      <Wrapper>
        <PageHeader>Home</PageHeader>
        <TweetTextbox /> 

        {(feedState.status === "loading" && 
            <LoadingDiv>
              <FiLoader className="loadingIcon"/>
            </LoadingDiv>)}
    
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
                  numLikes={tweet.numLikes} numRetweets={tweet.numRetweets}
                  isLiked={tweet.isLiked} isRetweeted={tweet.isRetweeted}
                  bio={tweet.retweetFrom.bio} numFollowers={tweet.retweetFrom.numFollowers} numFollowing={tweet.retweetFrom.numFollowing}
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
                  numLikes={tweet.numLikes} numRetweets={tweet.numRetweets}
                  isLiked={tweet.isLiked} isRetweeted={tweet.isRetweeted}
                  bio={tweet.author.bio} numFollowers={tweet.author.numFollowers} numFollowing={tweet.author.numFollowing}
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
  /* display: flex;
  flex-direction: column; */
  width: 100%;
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
  display: flex;
  justify-content: center;

  .loadingIcon {
    width: 30px;
    height: 30px;
    margin-top: 100px;
    animation: ${spinning} 500ms infinite;
    animation-timing-function: linear;
  }
`

// const PageTitle = styled.div`
//     padding: 10px;
//     padding-left: 20px;
//     border: 1px solid ${COLORS.outlineColor};
//     width: 100%;
// `
export default HomeFeed;