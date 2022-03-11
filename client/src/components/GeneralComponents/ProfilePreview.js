import styled from "styled-components";
import { COLORS } from "../../constants";
import Avatar from "./Avatar";

//preview of profile to be rendered inside of custom tippy component
const ProfilePreview = ({avatarSrc, authorName, authorHandle,
    bio, numFollowers, numFollowing}) => {

    return (
        <Wrapper>

            <div>
                <Avatar imgSrc={avatarSrc}/>
                <p className="author">{authorName}</p>
                <p className="handle">@{authorHandle}</p>
            </div>

            <div>
                <p>{bio}</p>
            </div>

            <div>
                <span><span>{numFollowing}</span> Following</span>
                <span><span>{numFollowers}</span> Followers</span>
            </div>

        </Wrapper>
    )

}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 14px;
    font-size: 16px;
    background-color: white;
    z-index: 10;
    width: 350px;
    box-shadow: 0 0 5px ${COLORS.outlineColor};

    .author {
        font-weight: bold;
    }
    
    .handle {
        color: ${COLORS.lightText};
        font-size: 14px;
    }

    div {
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

export default ProfilePreview;