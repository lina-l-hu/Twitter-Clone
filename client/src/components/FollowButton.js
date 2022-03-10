import styled from "styled-components";
import { useReducer } from "react";
import { COLORS } from "../constants";

//pass in from profile!!!
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

      const [followState, followDispatch] = useReducer(followReducer, initialFollowState);
      
      const handleToggleFollow = () => {
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
              console.log("unfollowed")
              if (data.success === true) {
                followDispatch ({
                  type: "unfollowed", 
                })
              }
            })
            .catch((err) => {
              console.log("error for unfollowing tweet", err);
              followDispatch ({
                type: "failed",
                error: err,
              })
            })
        }
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
              console.log("followed")
              if (data.success === true) {
                followDispatch ({
                  type: "followed", 
                })
              }
            })
            .catch((err) => {
              console.log("error for following", err);
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
`

export default FollowButton;