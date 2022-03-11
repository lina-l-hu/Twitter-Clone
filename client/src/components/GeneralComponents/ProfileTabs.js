import styled from "styled-components";
import { useRef, useState } from "react";
import {COLORS} from "../../constants";

//tab buttons used on profile and followers pages
const ProfileTabs = ({tabName1, tabName2, tabName3, setSelectedTab}) => {
    const buttonRef1 = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();

    const [button1State, setButton1State] = useState(false);
    const [button2State, setButton2State] = useState(false);
    const [button3State, setButton3State] = useState(false);

    const handleButton1Click = () => {
        setSelectedTab(tabName1);
        setButton1State(true);
        setButton2State(false);
        setButton3State(false);
 
    }

    const handleButton2Click = () => {
        setSelectedTab(tabName2);
        setButton1State(false);
        setButton2State(true);
        setButton3State(false);
    }

    const handleButton3Click = () => {
        setSelectedTab(tabName3);
        setButton1State(false);
        setButton2State(false);
        setButton3State(true);
    }

    return (
        <Wrapper>
            <button ref={buttonRef1} className={(button1State) ? "active" : undefined} onClick={handleButton1Click}>{tabName1}</button>
            <button ref={buttonRef2} className={(button2State) ? "active" : undefined} onClick={handleButton2Click}>{tabName2}</button>
            <button ref={buttonRef3} className={(button3State) ? "active" : undefined} onClick={handleButton3Click}>{tabName3}</button>
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
        /* border-bottom: ${props => props.active ? `4px solid ${COLORS.primary}`: "none"}; */
        
        &:hover {
            color: ${COLORS.primary};
            border-bottom: 4px solid ${COLORS.primary};
            cursor: pointer;
        }

        &.active {
            border-bottom: 4px solid ${COLORS.primary};
        }
    }
`

export default ProfileTabs;