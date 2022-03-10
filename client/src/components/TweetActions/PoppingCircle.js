import styled, { keyframes } from "styled-components";

const PoppingCircle = ({size, color}) => {
    const width = `40px`;
    const height = `${size}px`;
    return <Circle size={size} color={color}></Circle>

}

export default PoppingCircle;


const scale = keyframes`
    from {
        transform: scale(0%);
    }
    to {
        transform: scale(100%);
    }
`;

const fade = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const Circle = styled.div`
    position: absolute;
    z-index: 2;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${p => p.color};
    animation: ${scale} 300ms forwards, ${fade} 500ms forwards;
    transition-timing-function: cubic-bezier(.67,.3,.33,.78);
`;