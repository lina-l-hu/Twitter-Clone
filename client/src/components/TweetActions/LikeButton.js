import styled from "styled-components";
import Heart from "./Heart";
import PoppingCircle from "./PoppingCircle";

//like button with animation
const LikeButton = ({ isLiked }) => {
  
  const size = 30;
  const heartSize = size*0.6;
  
  return (
    <Wrapper style={{ width: size, height: size }}>
        {(isLiked && <PoppingCircle size={size} color="#E790F7" />)}
        <Heart width={heartSize} isToggled={isLiked} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
