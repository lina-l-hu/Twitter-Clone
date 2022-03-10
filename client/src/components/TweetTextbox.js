import { useContext, useRef, useEffect, useState } from "react";
import Avatar from "./Avatar";
import styled, { keyframes, css } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS, PADDING } from "../constants";

const TweetTextbox = () => {

    const MAXNUMCHARS = 280;

    const { state: { currentUser: { avatarSrc } }, newTweetCount, setNewTweetCount } = useContext(CurrentUserContext);
    
    const [tweetInput, setTweetInput] = useState("");
    
    const [charCountLeft, setCharCountLeft] = useState(MAXNUMCHARS);

    const textAreaRef = useRef();

    const [sendState, setSendState ] = useState(false);

    //on keydown event listener
    useEffect(() => {
        const updateInputtedText = () => {
            setTweetInput(textAreaRef.current.value);
            setCharCountLeft(MAXNUMCHARS - textAreaRef.current.value.length);
        }

        textAreaRef.current.addEventListener("keyup", updateInputtedText); 

        return () => {
            textAreaRef.current.removeEventListener("keyup", updateInputtedText); 
        }
    }, [])


    const sendTweet = () => {

        const data = { status: tweetInput }
        console.log(data);

        if (charCountLeft >=0 && charCountLeft !== MAXNUMCHARS) {
            setSendState(true);
            fetch("/api/tweet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
                
                })
                .then(res => res.json())
                .then(data => {
                    setSendState(false);
                    console.log(data);
                    setNewTweetCount((newTweetCount) => (newTweetCount+1));
                    textAreaRef.current.value = "";
                    setTweetInput("");
                    setCharCountLeft(MAXNUMCHARS);

                })
                .catch((err) => {
                    console.log("error for post tweet", err);
                    setSendState(false);

                })
        }
    }

    return (
        <Wrapper>
            <Avatar imgSrc={avatarSrc}/>
            <Main>
                <TweetBox ref={textAreaRef} id="newTweet" name="newTweet" rows="5" placeholder="What's happening?">
                </TweetBox>
                <ButtonArea>
                    <CharCount almostCharLimit={(charCountLeft <= 55 && charCountLeft >= 0)}
                                overCharLimit={(charCountLeft < 0)}>
                        {charCountLeft}
                    </CharCount>
                    <SubmitButton className="largeButton" type="submit" 
                        disabled={(charCountLeft < 0) || (sendState===true)} onClick={sendTweet}
                        >{(sendState) ? <FiLoader className="icon"/> : "Meow"}</SubmitButton>
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
    width: 100%;
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
    `;

const spinning = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const SubmitButton = styled.button`
    background-color: ${props => (props.disabled ? `${COLORS.outlineColor}` : `${COLORS.primary}`)};
    width: 90px;

    .icon {
        animation: ${spinning} 500ms infinite;
        animation-timing-function: linear;
    }
`

const CharCount = styled.span`
    margin: 0 20px;
    color: ${COLORS.outlineColor};
    ${props => props.almostCharLimit && css`
    color: #ffcc00;`}
    ${props => props.overCharLimit && css`
     color: red;`}
`

export default TweetTextbox;