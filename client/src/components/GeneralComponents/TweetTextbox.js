import { useContext, useRef, useEffect, useState, useReducer } from "react";
import Avatar from "./Avatar";
import styled, { keyframes, css } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { CurrentUserContext } from "../CurrentUserContext";
import { HomefeedContext } from "../HomefeedContext";
import { COLORS, PADDING } from "../../constants";

//textarea to enter a new tweet on homepage and tippy in sidebar
const TweetTextbox = () => {
    
    const { state: { currentUser: { avatarSrc } } } = useContext(CurrentUserContext);
    const { state: { status }, setNewTweetCount} = useContext(HomefeedContext);
    
    const MAXNUMCHARS = 280;

    const textAreaRef = useRef();

    const initialState = {
        tweetText: "",
        charCountLeft: MAXNUMCHARS,
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

    //reducer to track state of tweet content and posting to server
    const [postTweet, dispatch] = useReducer(reducer, initialState);

    //add on keydown event listener to text area ref to get updated value and length of the tweet
    useEffect(() => {
        const updateInputtedText = () => {
            dispatch ({
                type: "update-tweet-text"
            })
        }

        //if tweet 
        if (status === "idle") {
            textAreaRef.current.addEventListener("keyup", updateInputtedText); 
        }
        //for some reason, there is an error every so often where react tries to unmount this though
        //it is not mounted, and I can't figure out why so I've taken out the return for now even
        //though I know this is good practice to unmount listeners
        // return () => {
        //     if (status === "idle") {
        //      textAreaRef.current.removeEventListener("keyup", updateInputtedText); 
        //    }
        // }
    }, [])
  
    //onClick function for Tweet submit button
    const sendTweet = () => {

        const data = { status: postTweet.tweetText }
        
        //if the tweet is 280 chars or less and not empty
        if (postTweet.charCountLeft >=0 && postTweet.charCountLeft !== MAXNUMCHARS) {
            //mark state as sending
            dispatch ({
                type: "sending-tweet-to-server",
            })

            //post to server
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
                    //this state variable is used to trigger the rerender of the homefeed
                    setNewTweetCount((newTweetCount) => (newTweetCount+1));
                    //clear text area input
                    textAreaRef.current.value = "";
                    //these two dispatches probably look silly, but I anticipate at some point
                    //it may be useful to separate these functions
                    dispatch ({
                        type: "successfully-posted-tweet-to-server",
                    })
                    dispatch ({
                        type: "reset-after-success"
                    })

                })
                .catch((err) => {
                    dispatch ({
                        type: "tweet-post-to-server-failed"
                    })
                    dispatch ({
                        type: "reset-after-fail"
                    })
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
        align-self: center;
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