import styled from "styled-components";
import SmallTweet from "./SmallTweet";




const ProfileFeed = ({status, tweetIds, tweetsById}) => {
    
    return (
    <Wrapper>
        {((status === "loading") &&
            <h3>loading!</h3>)}
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
    )
}

const Wrapper = styled.div`
`
export default ProfileFeed;


