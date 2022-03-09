import { useContext, useRef, useEffect, useState } from "react";
import Tweet from "./Tweet";
import Avatar from "./Avatar";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS, PADDING } from "../constants";

const TweetTextbox = () => {

    const { state: { currentUser: { avatarSrc } } } = useContext(CurrentUserContext);
    
    const [tweetInput, setTweetInput] = useState("");
    const textAreaRef = useRef();

    const [charCount, setCharCount] = useState(0);

    //on keydown event listener
    useEffect(() => {
        const updateInputtedText = () => {
            setTweetInput(textAreaRef.current.value);
            setCharCount(textAreaRef.current.value.length);
        }

        textAreaRef.current.addEventListener("keyup", updateInputtedText); 

        return () => {
            textAreaRef.current.removeEventListener("keyup", updateInputtedText); 
        }
    }, [])

    const sendTweet = () => {
        
    }



    return (
        <Wrapper>
            <Avatar imgSrc={avatarSrc}/>
            <Main>
                <TweetBox ref={textAreaRef} id="newTweet" name="newTweet" rows="7" placeholder="What's happening?">
                </TweetBox>
                <ButtonArea>
                    <span>{280-charCount}</span>
                    <button type="submit">Meow</button>
                </ButtonArea>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    border: 1px solid ${COLORS.outlineColor};
    border-top: none;
    padding: ${PADDING};
    `;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px;
    `

const TweetBox = styled.textarea`
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
    width: 100%;
    font-size: 20px;
`

const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
       margin: 0 20px;
       color: ${COLORS.outlineColor};
    }
    button {
        background-color: ${COLORS.primary};
        border-radius: 40px;
        border: none;
        color: white;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
    }
    /* button has to have a gray filter after submit */
`;

export default TweetTextbox;