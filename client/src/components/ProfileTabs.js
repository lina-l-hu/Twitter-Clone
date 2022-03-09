import styled from "styled-components";
import {COLORS} from "../constants";

const ProfileTabs = () => {
    return (
        <Wrapper>
            <button>Tweets</button>
            <button>Media</button>
            <button>Likes</button>
        </Wrapper>
    )
}


//if we click button, bottom outline highlights purple

const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    
    *{
        box-sizing: border-box;
    }
    
    button {
        flex: 1;
        display: block;
        height: 60px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        background: white;
        border: none;
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