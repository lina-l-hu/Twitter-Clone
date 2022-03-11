import styled from "styled-components";
import FollowPreview from "./FollowPreview";

//component that renders the users who the current user follows
//part of the followers page accessed via user profile
const Following = ({following}) => {
    return (
        <Wrapper>
        {
            following.map((user) => {
                return (
                    <FollowPreview key={user.handle} avatarSrc={user.avatarSrc} handle={user.handle} displayName={user.displayName} 
                        isBeingFollowedByYou={user.isBeingFollowedByYou} numFollowing={user.numFollowing} bio={user.bio}/>
                )
            })   
        }
        </Wrapper>
    )
}

const Wrapper = styled.div`
`
export default Following;