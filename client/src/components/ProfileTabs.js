import styled from "styled-components";
import { useEffect, useRef } from "react";
import {COLORS} from "../constants";

const ProfileTabs = ({selectedTab, setSelectedTab}) => {
    const tweetsButtonRef = useRef();
    const likesButtonRef = useRef();

    const handleTweetsClick = () => {
        setSelectedTab("Tweets");
    }

    const handleLikesClick = () => {
        setSelectedTab("Likes");
    }

    return (
        <Wrapper>
            <button ref={tweetsButtonRef} onClick={handleTweetsClick}>Tweets</button>
            <button>Media</button>
            <button ref={likesButtonRef} onClick={handleLikesClick}>Likes</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    
    button {
        flex: 1;
        display: block;
        height: 60px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        background: white;
        border: none;
        border-bottom: 1px solid ${COLORS.outlineColor};
        border-radius: none;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        
        &:hover {
            color: ${COLORS.primary};
            border-bottom: 4px solid ${COLORS.primary};
        }
        
    }
`

export default ProfileTabs;