import styled from "styled-components";
import { useReducer } from "react";
import { FiMessageCircle, FiRepeat, FiUpload } from "react-icons/fi";
import LikeButton from "./LikeButton";
import TweetAction from "./TweetAction";

//tweet actions below each tweet post -- the like button works fully (updates the server)
//and the retweet button value is only held in state
const TweetActionBar = ( {tweetId, isLiked, isRetweeted, numLikes, numRetweets}) => {
  
  const HIGHLIGHTSIZE = 30;
  
  const initialLikeState = {
    isLikedByUser: isLiked,
    numTweetLikes: numLikes,
    error: null, 
  }

  const likeReducer = (state, action) => {
    switch (action.type) {
      case ("liked"): 
      return {
        ...state, 
        isLikedByUser: true, 
        numTweetLikes: state.numTweetLikes+1, 
        error: null,
      }
      case ("unliked"): 
      return {
        ...state, 
        isLikedByUser: false, 
        numTweetLikes: state.numTweetLikes-1, 
        error: null,
      }
      case ("failed"): 
      return {
        ...state,
        error: action.error,
      }
    }
  }
  
  const initialRetweetState = {
    isRetweetedByUser: isRetweeted,
    numberRetweets: numRetweets,
    error: null, 
  }

  const retweetReducer = (state, action) => { 
    switch (action.type) {
      case ("retweeted"): 
        return {
        ...state, 
        isRetweetedByUser: true, 
        numberRetweets: state.numberRetweets+1, 
        error: null,
      }
      case ("unretweeted"): 
        return {
        ...state, 
        isRetweetedByUser: false, 
        numberRetweets: state.numberRetweets-1, 
        error: null,
      }
    }
  }

  //keeps track of the like state and put to server
  const [likeState, likeDispatch] = useReducer(likeReducer, initialLikeState);
  
  //keeps track of the retweet state
  const [retweetState, retweetDispatch] = useReducer(retweetReducer, initialRetweetState);

  //onClick function for the like button - puts to server
  const handleToggleLike = () => {
      //to unlike a post
      if (likeState.isLikedByUser === true) {
        fetch(`/api/tweet/${tweetId}/like`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
          },
          body: JSON.stringify({ like: false })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success === true) {
              likeDispatch ({
                type: "unliked", 
              })
            }
          })
          .catch((err) => {
            likeDispatch ({
              type: "failed",
              error: err,
            })
          })
      }
      //to like a post
      else {
        fetch(`/api/tweet/${tweetId}/like`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
          },
          body: JSON.stringify({ like: true })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success === true) {
              likeDispatch ({
                type: "liked", 
              })
            }
          })
          .catch((err) => {
            likeDispatch ({
              type: "failed",
              error: err,
            })
          })
      }
    }
  
    //onClick function for retweet button
    const handleToggleRetweet = () => {
      if (retweetState.isRetweetedByUser === true) {
        retweetDispatch ({
          type: "unretweeted", 
        })
      }
      else {
        retweetDispatch ({
          type: "retweeted", 
        })
      }
    }


  return (
    <Wrapper>

      <div>
        <TweetAction color="rgb(27, 149, 224)" size={HIGHLIGHTSIZE}>
          <FiMessageCircle className="icon"/>
        </TweetAction>
      </div>

      <div>
        <>
        <TweetAction color="rgb(23, 191, 99)" size={HIGHLIGHTSIZE} onClick={handleToggleRetweet}>
          <FiRepeat className="icon"/>
        </TweetAction>
        <span>{retweetState.numberRetweets}</span>
        </>
      </div>

      <div>
        <>
        <TweetAction color="rgb(224, 36, 94)" size={HIGHLIGHTSIZE} onClick={handleToggleLike}>
          <LikeButton isLiked={likeState.isLikedByUser}/>
        </TweetAction>
        <span>{likeState.numTweetLikes}</span>
        </>
      </div>

      <div>
        <TweetAction color="rgb(27, 149, 224)" size={HIGHLIGHTSIZE}>
          <FiUpload className="icon"/>
        </TweetAction>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 48px;

  div {
    flex: 1;
    display: flex;
    align-items: center;
  }

  span { 
    margin-left: 5px;
    color: black;
    z-index: 10;
  }
  
  .icon {
    width: 18px;
    height: 18px;
  }
`;

export default TweetActionBar;