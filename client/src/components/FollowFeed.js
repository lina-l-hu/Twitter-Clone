import ProfileTabs from "../components/GeneralComponents/ProfileTabs";
import PageHeader from "../components/GeneralComponents/PageHeader";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import { useReducer, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ErrorHandler from "./ErrorHandler";
import { COLORS, PADDING } from "../constants";
import Followers from "./FollowersPage/Followers";
import Following from "./FollowersPage/Following";
import FollowersYouKnow from "./FollowersPage/FollowersYouKnow";

const initialFollowerState = {
    followers: null,
    status: "loading", 
    error: null, 
  }
  
  const followerReducer = (state, action) => {
    switch (action.type) {
      case ("receive-follower-data-from-server"):
        return {
          ...state,
          followers: action.followers, 
          status: "idle",
        }
  
      case ("failure-loading-follower-data-from-server"):
        return {
          ...initialFollowerState,
          status: "failed",
          error: action.error,
        }
      }
  }

  const initialFollowingState = {
    following: null,
    status: "loading", 
    error: null, 
  }
  
  const followingReducer = (state, action) => {
    switch (action.type) {
      case ("receive-following-data-from-server"):
        return {
          ...state,
          following: action.following, 
          status: "idle",
        }
  
      case ("failure-loading-following-data-from-server"):
        return {
          ...initialFollowingState,
          status: "failed",
          error: action.error,
        }
      }
  }

const FollowFeed = () => {

    const { profileId } = useParams();

    //keep track of follower/following data and calls to server to get this data
    const [followerState, followerDispatch] = useReducer(followerReducer, initialFollowerState);
    const [followingState, followingDispatch] = useReducer(followingReducer, initialFollowingState);
    
    //state to keep track of which tab on the follower page is selected
    const [selectedTab, setSelectedTab] = useState(null);

    //state to indicate erro
    const [errorState, setErrorState] = useState(null);
    
    const history = useHistory();

    //fetch followers for this profileId
    useEffect(() => {
      fetch(`/api/${profileId}/followers`)
        .then((res) => res.json())
        .then((data) => {
          followerDispatch ({
            type: "receive-follower-data-from-server", 
            ...data, 
          });
        })
        .catch((err) => {
          setErrorState(true);
          followerDispatch ({
            type: "failure-loading-follower-data-from-server",
            error: err,
          });
        })
    }, [])

    //fetch following for this profileId
    useEffect(() => {
      fetch(`/api/${profileId}/following`)
        .then((res) => res.json())
        .then((data) => {
          followingDispatch ({
            type: "receive-following-data-from-server", 
            ...data, 
          });
        })
        .catch((err) => {
          setErrorState(true);
          followingDispatch ({
            type: "failure-loading-following-data-from-server",
            error: err,
          });
        })
    }, [])

    //handle errors
    if (errorState) {
      return <ErrorHandler />
    }

    return (
        <Wrapper>

            <PageHeader>
                <FiArrowLeft style={{marginRight: "10px", cursor: "pointer"}} onClick={history.goBack}/>
                {profileId}
            </PageHeader>

            <ProfileTabs tabName1="Followers You Know" tabName2="Followers" tabName3="Following"
                selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

            {(followerState.status === "loading" || followingState.status === "loading" && 
            <h3>Page is loading!</h3>)}

            {(followerState.status === "idle" && followingState.status === "idle" && 
              selectedTab === "Followers" && 
                  <Followers followers={followerState.followers} />
              )}

             {(followerState.status === "idle" && followingState.status === "idle" && 
              selectedTab === "Following" && 
                  <Following following={followingState.following} />
              )}
              
              {(followerState.status === "idle" && followingState.status === "idle" && 
              selectedTab === "FollowersYouKnow" && 
                  <FollowersYouKnow followers={followerState.followers} following={followerState.following}/> 
              )}
           
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLORS.outlineColor};
  margin-right: 0 ${PADDING};
`
export default FollowFeed;