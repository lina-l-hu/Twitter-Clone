import { useContext, useRef, useEffect, useState } from "react";
import Tweet from "./Tweet";
import Avatar from "./Avatar";
import styled, {css} from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS, PADDING } from "../constants";

const TweetTextbox = () => {

    const { state: { currentUser: { avatarSrc } } } = useContext(CurrentUserContext);
    
    const [tweetInput, setTweetInput] = useState("");
    const textAreaRef = useRef();

    const [charCountLeft, setCharCountLeft] = useState(0);

    //on keydown event listener
    useEffect(() => {
        const updateInputtedText = () => {
            setTweetInput(textAreaRef.current.value);
            setCharCountLeft(280 - textAreaRef.current.value.length);
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
                    <CharCount almostCharLimit={(charCountLeft <= 55 && charCountLeft >= 0)}
                                overCharLimit={(charCountLeft < 0)}>
                        {charCountLeft}
                    </CharCount>
                    <button className="largeButton" type="submit">Meow</button>
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
    
    /* button has to have a gray filter after submit */
    `;

const CharCount = styled.span`
    margin: 0 20px;
    color: ${COLORS.outlineColor};
    ${props => props.almostCharLimit && css`
    color: #ffcc00;`}
    ${props => props.overCharLimit && css`
     color: red;`}
`

export default TweetTextbox;