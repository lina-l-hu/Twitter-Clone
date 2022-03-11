import { useContext, useRef, useEffect, useState, useReducer } from "react";
import Avatar from "./Avatar";
import styled, { keyframes, css } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";
import { HomefeedContext } from "./HomefeedContext";
import { COLORS, PADDING } from "../constants";



const TweetTextbox = () => {
    
    const MAXNUMCHARS = 280;
    const textAreaRef = useRef();
    const { state: { currentUser: { avatarSrc } } } = useContext(CurrentUserContext);
    const {newTweetCount, setNewTweetCount} = useContext(HomefeedContext);
    const initialState = {
        tweetText: "",
        charCountLeft: MAXNUMCHARS,
        // isSending: "idle",
        // postSuccess: false,
        isSending: false,
        postSuccess: true,
    
    }
    
    const reducer = (state, action) => {
        switch (action.type) {
            case ("update-tweet-text"): {
                return {
                    ...state,
                    tweetText: textAreaRef.current.value,
                    charCountLeft: MAXNUMCHARS - textAreaRef.current.value.length,
                }
            }
            case ("sending-tweet-to-server") : {
                return {
                    ...state, 
                    isSending: "sending",
                }
            }
            case ("successfully-posted-tweet-to-server") : {
                return {
                    ...state,
                    isSending: false,
                    postSuccess: true,
                }
            }
            case ("tweet-post-to-server-failed") : {
                return {
                    ...state,
                    isSending: false,
                    postSuccess: false,
                }
            }
            case ("reset-after-success") : {
                return {
                    ...initialState,
                }
            }
            case ("reset-after-fail") : {
                return {
                    ...state,
                    isSending: false,
                }
            }
        }
    }

    const [postTweet, dispatch] = useReducer(reducer, initialState);

   

    
    // const [tweetInput, setTweetInput] = useState("");
    
    // const [charCountLeft, setCharCountLeft] = useState(MAXNUMCHARS);


    // const [sendState, setSendState ] = useState(false);

    //error state needed to set a message to user to try again -- maybe should put everything in reducer

    //on keydown event listener
    useEffect(() => {
        const updateInputtedText = () => {
            dispatch ({
                type: "update-tweet-text"
            })
            // setTweetInput(textAreaRef.current.value);
            // setCharCountLeft(MAXNUMCHARS - textAreaRef.current.value.length);
        }

        textAreaRef.current.addEventListener("keyup", updateInputtedText); 

        return () => {
            textAreaRef.current.removeEventListener("keyup", updateInputtedText); 
        }
    }, [])


    const sendTweet = () => {

        const data = { status: postTweet.tweetText }
        console.log(data);
        
        if (postTweet.charCountLeft >=0 && postTweet.charCountLeft !== MAXNUMCHARS) {
            dispatch ({
                type: "sending-tweet-to-server",
            })
            
            // setSendState(true);
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
                    setNewTweetCount((newTweetCount) => (newTweetCount+1));
                    textAreaRef.current.value = "";
                    dispatch ({
                        type: "successfully-posted-tweet-to-server",
                    })
                    // setSendState(false);
                    // console.log(data);
                    dispatch ({
                        type: "reset-after-success"
                    })
                    // setTweetInput("");
                    // setCharCountLeft(MAXNUMCHARS);

                })
                .catch((err) => {
                    console.log("error for post tweet", err);
                    // setSendState(false);
                    dispatch ({
                        type: "tweet-post-to-server-failed"
                    })
                    dispatch ({
                        type: "reset-after-fail"
                    })

                })

                // if (postTweet.status === "posted") {
                //     dispatch ({
                //         type: "reset-after-success"
                //     })
                // }
                // else {
                //     dispatch ({
                //         type: "reset-after-fail"
                //     })
                // }
        }
    }

    return (
        <Wrapper>
            <Avatar imgSrc={avatarSrc}/>
            <Main>
                <TweetBox ref={textAreaRef} id="newTweet" name="newTweet" rows="5" placeholder="What's happening?">
                </TweetBox>
                <ButtonArea>
                    <ErrorMsg>
                        {(postTweet.postSuccess) ? "" : "An error occurred during post -- please try again!"}
                        </ErrorMsg>
                    <CharCount almostCharLimit={(postTweet.charCountLeft <= 55 && postTweet.charCountLeft >= 0)}
                                overCharLimit={(postTweet.charCountLeft < 0)}>
                        {postTweet.charCountLeft}
                    </CharCount>
                    <SubmitButton className="largeButton" type="submit" 
                        disabled={(postTweet.charCountLeft < 0) || (postTweet.isSending)} onClick={sendTweet}
                        >{(postTweet.isSending) ? <FiLoader className="icon"/> : "Meow"}</SubmitButton>
                </ButtonArea>
            </Main>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    border: 1px solid ${COLORS.outlineColor};
    padding: ${PADDING};
    width: 100%;
    background-color: white;
    `;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 20px;
    `

const TweetBox = styled.textarea`
    border: none;
    background-color: white;
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

const ErrorMsg = styled.span`
    color: ${COLORS.primary};
    font-style: italic;
    font-size: 14px;
`

export default TweetTextbox;