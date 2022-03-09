import { NavLink } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { COLORS } from "../constants";
import { ReactComponent as CritterLogo } from '../assets/logo.svg';
import { CurrentUserContext } from "./CurrentUserContext";



const Sidebar = () => {

    const { state: { currentUser } } = useContext(CurrentUserContext);

    const currentUserHandle = currentUser.handle;
    
    return (
        <Wrapper>
            <CritterLogo style={{ width: "50px", marginLeft: "-10px", marginBottom: "-10px"}} />
            <NavDiv>
                <FiHome className="icon"/>
                <NavigationLink to="/" activeClassName="active" exact>Home</NavigationLink>
            </NavDiv>
            <NavDiv>
                <FiUser className="icon"/>
                <NavigationLink to={`/${currentUserHandle}`} activeClassName="active" exact>Profile</NavigationLink>
            </NavDiv>
            <NavDiv>
                <FiBell className="icon"/>
                <NavigationLink to="/notifications" activeClassName="active" exact>Notifications</NavigationLink>
            </NavDiv>
            <NavDiv>
                <FiBookmark className="icon"/>
                <NavigationLink to="/bookmarks" activeClassName="active" exact>Bookmarks</NavigationLink>
            </NavDiv>
            <NavDiv>
                <TweetButton className="largeButton">Meow</TweetButton>
            </NavDiv>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 20px;
    
`
const Logo = styled.img`
    margin: 20px 0;
`

const NavDiv = styled.div`
    margin: 10px 0;
    display: flex;

    .icon {
        margin-right: 10px;
        vertical-align: center;
        width: 20px;
        height: 20px;
    }
`


const NavigationLink = styled(NavLink)`
    font-size: 20px;
    font-weight: bold; 
    text-decoration: none;
    color: black;
    
    &.active {
        color: ${COLORS.primary};
    }
`

const TweetButton = styled.button`
    width: 100%;
`;

export default Sidebar;