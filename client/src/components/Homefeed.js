import { useContext } from 'react';
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import SmallTweet from './GeneralComponents/SmallTweet';
import TweetTextbox from './GeneralComponents/TweetTextbox';
import PageHeader from './GeneralComponents/PageHeader';
import { HomefeedContext } from './HomefeedContext';
import ErrorHandler from './ErrorHandler';

//homepage with tweetfeed of users the current user follows
const HomeFeed = () => {

  const { newTweetCount, errorState, state: { tweetIds, tweetsById, status } } = useContext(HomefeedContext);

  //catch errors during the homefeed data load from server (located in context file)
  if (errorState) {
    return <ErrorHandler />
  }

  return (
      <Wrapper>

        <PageHeader>Home</PageHeader>

        <TweetTextbox /> 

        {(status === "loading" && 
            <LoadingDiv>
              <FiLoader className="loadingIcon"/>
            </LoadingDiv>)}
    
        {(status === "idle" &&
          <>
          {tweetIds.map((id) => {
            let tweet = tweetsById[id];
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
  width: 100%;
  `

const spinning = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

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

export default HomeFeed;