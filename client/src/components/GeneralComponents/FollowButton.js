import styled from "styled-components";
import { useReducer } from "react";
import { COLORS } from "../../constants";

//follow button on profile page and followers page
//clicking it will toggle follow/unfollow
const FollowButton = ({handle, isBeingFollowedByYou, numFollowing}) => {
    
    const initialFollowState = {
        isFollowedByUser: isBeingFollowedByYou,
        numUsersFollowing: numFollowing,
        error: null, 
      }
    
    const followReducer = (state, action) => {
        switch (action.type) {
          case ("followed"): 
            return {
            ...state, 
            isFollowedByUser: true, 
            numUsersFollowing: state.numUsersFollowing+1, 
            error: null,
          }
          case ("unfollowed"): 
            return {
            ...state, 
            isFollowedByUser: false, 
            numUsersFollowing: state.numUsersFollowing-1, 
            error: null,
          }
          case ("failed"): 
            return {
              ...state,
              error: action.error,
            }
        }
      }

      //variables to keep track of follow state and put to server calls
      const [followState, followDispatch] = useReducer(followReducer, initialFollowState);
      
      //onClick function to toggle
      const handleToggleFollow = () => {
        //unfollowing user
        if (followState.isFollowedByUser === true) {
          fetch(`/api/${handle}/unfollow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({  })
            })
            .then(res => res.json())
            .then(data => {
              if (data.success === true) {
                followDispatch ({
                  type: "unfollowed", 
                })
              }
            })
            .catch((err) => {
              followDispatch ({
                type: "failed",
                error: err,
              })
            })
        }
        //following user
        else {
          fetch(`/api/${handle}/follow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ })
            })
            .then(res => res.json())
            .then(data => {
              if (data.success === true) {
                followDispatch ({
                  type: "followed", 
                })
              }
            })
            .catch((err) => {
              followDispatch ({
                type: "failed",
                error: err,
              })
            })
        }
    }
    
    return <Button className="largeButton" followed={followState.isFollowedByUser}
    onClick={handleToggleFollow}>{(followState.isFollowedByUser) ? "Following" : "Follow"}</Button>
}

const Button = styled.button`
    margin-top: 80px;
    border: 1px solid ${COLORS.primary};
    background-color: ${props => props.followed ? `${COLORS.primary}` : "white"};
    color: ${props => props.followed ? "white" : `${COLORS.primary}`};
    width: 120px;
    
    &:hover {
      cursor: pointer;
    }
`

export default FollowButton;