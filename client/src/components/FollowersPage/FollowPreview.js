import { COLORS, PADDING } from "../../constants";
import styled from "styled-components";
import FollowButton from "../GeneralComponents/FollowButton";
import Avatar from "../GeneralComponents/Avatar";

//component that displays summary details of a single follower of the current user
//part of the followers page accessed via user profile
const FollowPreview = ({avatarSrc, handle, displayName, isBeingFollowedByYou, numFollowing, bio}) => {
    return (
        <Wrapper>
            <div>
                <Avatar imgSrc={avatarSrc}/>
            </div>
            <Content>
                <UserHeader>
                    <NameDiv>
                        <p className="author">{displayName}</p>
                        <p className="handle">@{handle}</p>
                    </NameDiv>
                    <ButtonDiv>
                    <FollowButton handle={handle} isBeingFollowedByYou={isBeingFollowedByYou} 
                        numFollowing={numFollowing}/>
                    </ButtonDiv>
                </UserHeader>
                <div>
                    <p>{bio}</p>
                </div>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    padding: ${PADDING};
    border-top: 1px solid ${COLORS.outlineColor};
    border-bottom: 1px solid ${COLORS.outlineColor};
    height: 120px;
`

const Content = styled.div`
    width: 100%;
    padding-left: ${PADDING};
`

const UserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: inherit;
    margin-bottom: 10px;
`

const NameDiv = styled.div`
    .author {
        font-size: 18px;
        font-weight: bold;
    }

    .handle {
        color: ${COLORS.lightText};
    }
`

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    button {
        margin-top: 0;
    }
`

export default FollowPreview;