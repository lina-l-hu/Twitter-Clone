import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import BigTweet from "./BigTweet";
import PageHeader from "./PageHeader";

const initialState = {
  tweetDetails: null,
  status: "loading", 
  error: null, 
}

const reducer = (state, action) => {
  switch (action.type) {
    case ("receive-tweet-data-from-server"):
      return {
        ...state,
        tweetDetails: action.tweet, 
        status: "idle",
      }

    case ("failure-loading-tweet-data-from-server"):
      return {
        ...initialState,
        status: "failed",
        error: action.error,
      }
    }
}

const TweetDetails = () => {

  const { tweetId } = useParams();

  const [tweetState, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();

  //fetch data for this tweetId
  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("loaded tweet", data)
        console.log("tweet status", tweetState.status)
        dispatch ({
          type: "receive-tweet-data-from-server", 
          ...data, 
        });
      })
      .catch((err) => {
        console.log("tweet load err", err);
        dispatch ({
          type: "failure-loading-tweet-data-from-server",
          error: err,
        });
      })
    }, [])

    return (
      <Wrapper>
      <PageHeader>
        <FiArrowLeft style={{marginRight: "10px"}} onClick={history.goBack}/>
        Meow
      </PageHeader>

      {(tweetState.status === "loading" && 
            <LoadingDiv>
              <FiLoader className="loadingIcon"/>
            </LoadingDiv>)}
        {(tweetState.status === "idle" && 
        <>
          {(Object.keys(tweetState.tweetDetails).includes("retweetFrom")) && (
              <BigTweet tweetId={tweetState.tweetDetails.id} isRetweetedPost={true} retweeterHandle={tweetState.tweetDetails.author.handle} 
                retweeterAuthor={tweetState.tweetDetails.author.displayName} avatarSrc={tweetState.tweetDetails.retweetFrom.avatarSrc}
                authorHandle={tweetState.tweetDetails.retweetFrom.handle} authorName={tweetState.tweetDetails.retweetFrom.displayName}
                status={tweetState.tweetDetails.status} date={tweetState.tweetDetails.timestamp} 
                mediaSrc={((tweetState.tweetDetails.media).length !== 0) ? (tweetState.tweetDetails.media[0]).url: undefined}
                numLikes={tweetState.tweetDetails.numLikes} numRetweets={tweetState.tweetDetails.numRetweets}
                isLiked={tweetState.tweetDetails.isLiked} isRetweeted={tweetState.tweetDetails.isRetweeted}
                />
          )}
          {!(Object.keys(tweetState.tweetDetails).includes("retweetFrom")) && (
              <BigTweet tweetId={tweetState.tweetDetails.id} isRetweetedPost={false} retweeterHandle="" 
              retweeterAuthor="" avatarSrc={tweetState.tweetDetails.author.avatarSrc}
                authorHandle={tweetState.tweetDetails.author.handle} authorName={tweetState.tweetDetails.author.displayName}
                status={tweetState.tweetDetails.status} date={tweetState.tweetDetails.timestamp} 
                mediaSrc={((tweetState.tweetDetails.media).length !== 0) ? (tweetState.tweetDetails.media[0]).url: undefined}
                numLikes={tweetState.tweetDetails.numLikes} numRetweets={tweetState.tweetDetails.numRetweets}
                isLiked={tweetState.tweetDetails.isLiked} isRetweeted={tweetState.tweetDetails.isRetweeted}
                />
          )}
        </>
        )}
      </Wrapper>
    )
  };

const Wrapper = styled.div`
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
export default TweetDetails;