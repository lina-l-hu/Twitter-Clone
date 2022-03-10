import styled from "styled-components";
import { useReducer } from "react";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
//import each button with functionality
import LikeButton from "./LikeButton";
import TweetAction from "./TweetAction";

const TweetActionBar = ( {tweetId, isLiked, isRetweeted, numLikes, numRetweets}) => {
  const HIGHLIGHTSIZE = 30;
  
  const initialLikeState = {
    isLikedByUser: isLiked,
    numTweetLikes: numLikes,
    error: null, 
  }

  // const initialRetweetState = {
  //   numRetweets: numRetweets,
  //   isRetweetedByUser: isRetweeted,
  //   error: null, 
  // }

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

  // const retweetReducer = (state, action) => { 

  // }

  const [likeState, likeDispatch] = useReducer(likeReducer, initialLikeState);
  // const [retweetState, retweetDispatch] = useReducer(retweetReducer, initialRetweetState);
  
  const handleToggleLike = () => {
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
            console.log("disliked")
            if (data.success === true) {
              likeDispatch ({
                type: "unliked", 
              })
            }
          })
          .catch((err) => {
            console.log("error for disliking tweet", err);
            likeDispatch ({
              type: "failed",
              error: err,
            })
          })
      }
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
            console.log("liked")
            if (data.success === true) {
              likeDispatch ({
                type: "liked", 
              })
            }
          })
          .catch((err) => {
            console.log("error for liking tweet", err);
            likeDispatch ({
              type: "failed",
              error: err,
            })
          })
      }
  }
  
  // const handleToggleRetweet = () => {
  //     setIsRetweeted(!isRetweeted);
  //     (!isRetweeted) ? setNumOfRetweets((numOfRetweets)=>(numOfRetweets+1)) : setNumOfRetweets((numOfRetweets)=>(numOfRetweets-1));
  // }

  //add onClick to tweetactions!!! 
  return (
    <Wrapper>
      <div>
        <TweetAction color="rgb(27, 149, 224)" size={HIGHLIGHTSIZE}>
          <FiMessageCircle className="icon"/>
        </TweetAction>
      </div>
      <div>
        <>
        <TweetAction color="rgb(23, 191, 99)" size={HIGHLIGHTSIZE}>
          <FiRepeat className="icon"/>
        </TweetAction>
        <span>{numRetweets}</span>
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