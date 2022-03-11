import styled from "styled-components";
import FollowPreview from "./FollowPreview";

//component that renders the users who follow the current user follows
//part of the followers page accessed via user profile
const Followers = ({followers}) => {
    return (
        <Wrapper>
        {
            followers.map((user) => {
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
export default Followers;