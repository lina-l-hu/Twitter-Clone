import { createContext, useState, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
    currentUser: null, 
    status: "loading",
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ("receive-profile-data-from-server"): {
            return {
                ...state, 
                currentUser: action.profile, 
                status: "idle", 
            }
        }

        case ("failure-loading-profile-data-from-server"): {
            return {
                ...initialState, 
                status: "failed",
                error: action.error,
            }
        }
    }
}

export const CurrentUserProvider = ({children}) => {

    //state that updates every time the current user tweets
    const [ newTweetCount, setNewTweetCount ] = useState(0);

    const [state, dispatch] = useReducer(reducer, initialState);
    
 
    const receiveProfileDataFromServer = (data) => {
        dispatch({
            type: "receive-profile-data-from-server", 
            ...data,
        })
    }
    
    const failureLoadingProfileDataFromServer = (err) => {
        dispatch({
            type: "failure-loading-profile-data-from-server", 
            error: err,
        })
    }
    return (
        <CurrentUserContext.Provider 
        value={{ state, 
                 actions: {receiveProfileDataFromServer, 
                 failureLoadingProfileDataFromServer}, 
                 newTweetCount, setNewTweetCount}}>
            {children}
        </CurrentUserContext.Provider>
    );
};