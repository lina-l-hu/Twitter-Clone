import React, { createContext, useState, useReducer, useEffect } from "react";

//context that holds the tweet data for the homefeed
export const HomefeedContext = createContext(null);

const initialState = {
    tweetIds: null, 
    tweetsById: null, 
    status: "loading",
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
      case ("receive-homefeed-data-from-server"):
        return {
          ...state,
          tweetIds: action.tweetIds,
          tweetsById: action.tweetsById, 
          status: "idle",
        }
  
      case ("failure-loading-homefeed-data-from-server"):
        return {
          ...initialState,
          status: "failed",
          error: action.error,
        }
      }
  }

export const HomefeedProvider = ({children}) => {
    
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const [errorState, setErrorState] = useState(false);

    //state that updates every time the current user tweets -- used to trigger 
    //rerender of homeffed
    const [ newTweetCount, setNewTweetCount ] = useState(0);
    
    //Fetch homefeed data from the API
    useEffect(() => {
        fetch("/api/me/home-feed")
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "receive-homefeed-data-from-server",
              ...data,
            })
          })
          .catch((err) => {
            setErrorState(true);
            dispatch({
              type: "failure-loading-homefeed-data-from-server",
              error: err,
            });
          })
        }, [newTweetCount])

        return (
          <HomefeedContext.Provider 
          value={{ state,
                   newTweetCount, setNewTweetCount, 
                   setErrorState, errorState}}>
              {children}
          </HomefeedContext.Provider>
      );
}