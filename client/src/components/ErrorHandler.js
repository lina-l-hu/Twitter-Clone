import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Bomb} from '../assets/bomb.svg';

//support link to add

const ErrorHandler = ({error}) => {
    return (
        <Wrapper>
            <Bomb />
            <h2>An unknown error has occurred: {error}</h2>
            <p>Please try refreshing the page, or contact support if the problem persists.</p>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;

    * {
        margin: 20px 0;
    }

    p {
        font-size: 16px;
    }
`
export default ErrorHandler;