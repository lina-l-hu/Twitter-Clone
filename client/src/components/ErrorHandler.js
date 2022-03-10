import styled from "styled-components"
import { ReactComponent as Bomb} from '../assets/bomb.svg';

const ErrorHandler = ({error}) => {
    return (
        <Wrapper>
            <Bomb />
            <h2>An unknown error has occurred.</h2>
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
`
export default ErrorHandler;