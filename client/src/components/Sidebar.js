import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import logoSrc from "../assets/logo.svg";

const Sidebar = () => {
    return (
        <Wrapper>
            <Logo src={logoSrc} />
            <NavigationLink to="/" activeClassName="active" exact>Home</NavigationLink>
            <NavigationLink to="/profile/abc" activeClassName="active" exact>Profile</NavigationLink>
            <NavigationLink to="/notifications" activeClassName="active" exact>Notifications</NavigationLink>
            <NavigationLink to="/bookmarks" activeClassName="active" exact>Bookmarks</NavigationLink>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    
`
const Logo = styled.img`
`

const NavigationLink = styled(NavLink)`
    margin: 10px 0;
    font-weight: bold; 
    text-decoration: none;
    color: black;
    
    &.active {
        color: ${COLORS.primary};
    }
`

export default Sidebar;