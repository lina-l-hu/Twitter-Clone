import styled from "styled-components";
import { useReducer, useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import moment from 'moment';
import { PADDING, COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import ProfileTabs from "./ProfileTabs";
import ProfileFeed from "./ProfileFeed";
import LikeFeed from "./LikeFeed";
import ErrorHandler from "./ErrorHandler";
import FollowButton from "./FollowButton";

const initialProfileState = {
  user: null, 
  status: "loading",
  error: null,
}
const profileReducer = (state, action) => {
  switch (action.type) {
    case ("receive-profile-data-from-server"): {
      return {
        ...state, 
        user: action.profile, 
        status: "idle",
      }
    }
  }
  switch (action.type) {
    case ("failure-loading-profile-data-from-server"): {
      return {
        ...initialProfileState, 
        status: "failed", 
        error: action.error,
      }
    }
  }
}

const initialFeedState = {
  userFeedTweetIds: null,
  userFeedTweetsById: null, 
  status: "loading", 
  error: null, 
}

const feedReducer = (state, action) => {
  switch (action.type) {
    case ("receive-userfeed-data-from-server"):
      return {
        ...state,
        userFeedTweetIds: action.tweetIds,
        userFeedTweetsById: action.tweetsById, 
        status: "idle",
      }

    case ("failure-loading-userfeed-data-from-server"):
      return {
        ...initialFeedState,
        status: "failed",
        error: action.error,
      }
    }
}

const Profile = () => {

  const { profileId } = useParams();

  const { newTweetCount, state: { currentUser: { handle } }} = useContext(CurrentUserContext);

  const [userProfile, profileDispatch] = useReducer(profileReducer, initialProfileState);

  const [userFeed, feedDispatch] = useReducer(feedReducer, initialFeedState);
  
  const [errorState, setErrorState] = useState(false);

  const [ selectedTab, setSelectedTab ] = useState("Tweets");

  //fetch profile data for the user
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log("loaded profile", data.profile)
        console.log("userProfile status", userProfile.status)
        profileDispatch ({
          type: "receive-profile-data-from-server", 
          ...data, 
        });
      })
      .catch((err) => {
        console.log("profile load err", err);
        profileDispatch ({
          type: "failure-loading-profile-data-from-server",
          error: err,
        });
      })
    }, [])

    //fetch tweets by this user
    useEffect(() => {
      fetch(`/api/${profileId}/feed`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          feedDispatch({
            type: "receive-userfeed-data-from-server",
            ...data,
          })
        })
        .catch((err) => {
          console.log("Error:", err);
          setErrorState(true);
          feedDispatch({
            type: "failure-loading-userfeed-data-from-server",
            error: err,
          });
        })
      }, [newTweetCount])

      if (errorState) {
        return <ErrorHandler />
      }

    return (
      <Wrapper>
         {(userProfile.status === "loading" && 
          <h3>Page is loading!</h3>)}
      {(userProfile.status === "idle" && 
        <Header>
          <Banner src={userProfile.user.bannerSrc}/>
          <HeaderInner>
          <ImageDiv>
            <ProfileImg src={userProfile.user.avatarSrc} width="100px" height="100px"/>
            <div>
              <FollowButton handle={userProfile.user.handle} isBeingFollowedByYou={userProfile.user.isBeingFollowedByYou} numFollowing={userProfile.user.numFollowing}/>
            </div>
          </ImageDiv>
          <div>
            <h2>{userProfile.user.displayName}</h2>
            <span>@{userProfile.user.handle}</span>
            <>
            {((userProfile.user.isFollowingYou) && 
            <IsFollowing>Follows you</IsFollowing>
            )}
            </>
          </div>
          <div>
            <p>{userProfile.user.bio}</p>
          </div>
          <div>
            <span><FiMapPin /> {userProfile.user.location}</span>
            <span><FiCalendar /> Joined {moment(userProfile.user.joined).format("MMMM YYYY")}</span>
          </div>
          <div>
            <span><span>{userProfile.user.numFollowing}</span> Following</span>
            <span><span>{userProfile.user.numFollowers}</span> Followers</span>
          </div>
          </HeaderInner>
          <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        </Header>
      )}
      {(selectedTab === "Tweets" && 
        <ProfileFeed status={userFeed.status} tweetIds={userFeed.userFeedTweetIds} tweetsById={userFeed.userFeedTweetsById}/>
      )}
       {(selectedTab === "Likes" && 
        <LikeFeed status={userFeed.status} tweetIds={userFeed.userFeedTweetIds} tweetsById={userFeed.userFeedTweetsById}/>
      )}
      </Wrapper>
    )
  };

const Wrapper = styled.div`
  h2 {
    margin: 5px 0;
  }
  span {
    color: ${COLORS.lightText};
    margin-right: 20px;
  }

  span span {
    color: black;
    font-weight: bold;
    margin-right: 0;
  }
`;

const Header = styled.div`
  border: 1px solid ${COLORS.outlineColor};
  border-bottom: none;

  div {
    margin: 5px 0;
  }
`

const HeaderInner = styled.div`
  padding: ${PADDING};
  display: flex;
  flex-direction: column;
`;

const Banner = styled.img`
  width: 100%;
  overflow: hidden;
  margin-bottom: -130px;
  /* background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */

`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
   
  }
`;

const ProfileImg = styled.img`
  display: inline;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid white;
`
// const FollowButton = styled.button`
//   margin-top: 80px;
//   border: 1px solid ${COLORS.primary};
// `

const IsFollowing = styled.span`
  background-color: ${COLORS.outlineColor};
  border-radius: 7px;
  font-size: 13px;
  padding: 3px;

`

const UserTweets = styled.div`
`;



export default Profile;