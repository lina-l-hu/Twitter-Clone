import styled from "styled-components";

const Avatar = ({imgSrc}) => {
    return <AvatarImg src={imgSrc}></AvatarImg>
}

const AvatarImg = styled.img`
    border-radius: 50%;
    width: 55px;
    height: 55px;
`;

export default Avatar;