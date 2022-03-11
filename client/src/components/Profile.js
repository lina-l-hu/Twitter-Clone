import { useReducer, useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FiCalendar, FiMapPin, FiLoader} from "react-icons/fi";
import moment from 'moment';
import { PADDING, COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import ProfileTabs from "./GeneralComponents/ProfileTabs";
import ProfileFeed from "./ProfilePage/ProfileFeed";
import LikeFeed from "./ProfilePage/LikeFeed";
import ErrorHandler from "./ErrorHandler";
import FollowButton from "./GeneralComponents/FollowButton";

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

  //manages the selected user data and the state of the load from server
  const [userProfile, profileDispatch] = useReducer(profileReducer, initialProfileState);

  //stores the selected user data and the state of the load from server
  const [userFeed, feedDispatch] = useReducer(feedReducer, initialFeedState);
  
  //error state for handling errors
  const [errorState, setErrorState] = useState(false);

  //selected tab of the homefeed page (tweets, media, likes)
  const [ selectedTab, setSelectedTab ] = useState("Tweets");

  //fetch profile data for the user
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        profileDispatch ({
          type: "receive-profile-data-from-server", 
          ...data, 
        });
      })
      .catch((err) => {
        profileDispatch ({
          type: "failure-loading-profile-data-from-server",
          error: err,
        });
      })
    }, [newTweetCount])

    //fetch tweets by this user
    useEffect(() => {
      fetch(`/api/${profileId}/feed`)
        .then((res) => res.json())
        .then((data) => {
          feedDispatch({
            type: "receive-userfeed-data-from-server",
            ...data,
          })
        })
        .catch((err) => {
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
            <LoadingDiv>
              <FiLoader className="loadingIcon"/>
            </LoadingDiv>)}

        {(userProfile.status === "idle" && 
        <Header>
          <Banner src={userProfile.user.bannerSrc}/>
          <HeaderInner>
      
          <ImageDiv>
            <ProfileImg src={userProfile.user.avatarSrc} width="100px" height="100px"/>
            <div>
              {(userProfile.user.handle !== handle && 
              <FollowButton handle={userProfile.user.handle} isBeingFollowedByYou={userProfile.user.isBeingFollowedByYou} numFollowing={userProfile.user.numFollowing}/>
              )}
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

            <FollowerLink to={`/${userProfile.user.handle}/followers`}><span><span>{userProfile.user.numFollowers}</span> Followers</span></FollowerLink>

          </div>

          </HeaderInner>

          <ProfileTabs tabName1="Tweets" tabName2="Media" tabName3="Likes"
          selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
        
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
  margin-right: 0 ${PADDING};
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
`

const Banner = styled.img`
  width: 100%;
  overflow: hidden;
  margin-bottom: -130px;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
   
  }
`

const ProfileImg = styled.img`
  display: inline;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid white;
`

const IsFollowing = styled.span`
  background-color: ${COLORS.outlineColor};
  border-radius: 7px;
  font-size: 13px;
  padding: 3px;

`
const FollowerLink = styled(Link)`
    text-decoration: none; 
    font-size: 16px;
    color: ${COLORS.lightText};
    margin-left: 0;
    padding-left: 0;
    display: inline;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: ${COLORS.lightText};
    }
`;

export default Profile;