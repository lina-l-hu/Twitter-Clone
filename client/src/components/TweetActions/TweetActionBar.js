import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiUpload } from "react-icons/fi";
// import { useContext } from "react";
// import { TweetContext } from "./TweetContext"; 
//import each button with functionality
// import LikeButton from "../LikeButton";
import TweetAction from "./TweetAction";


const TweetActions = () => {
  // const { Tweet: {isRetweetedByCurrentUser}, handleToggleLike, handleToggleRetweet} = useContext(TweetContext);
 
  //add onClick to tweetactions!!! 
  return (
    <Wrapper>
      <TweetAction color="rgb(27, 149, 224)" size={40}>
        <FiMessageCircle />
      </TweetAction>
      <TweetAction color="rgb(23, 191, 99)" size={40}>
        <FiRepeat />
      </TweetAction>
      <TweetAction color="rgb(224, 36, 94)" size={40} >
        <FiHeart />
        {/* <LikeButton /> */}
      </TweetAction>
      <TweetAction color="rgb(27, 149, 224)" size={40}>
        <FiUpload />
      </TweetAction>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 48px;
`;

export default TweetActions;