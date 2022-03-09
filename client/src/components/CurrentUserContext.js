import { createContext, useEffect, useReducer } from "react";

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
                 failureLoadingProfileDataFromServer}}}>
            {children}
        </CurrentUserContext.Provider>
    );
};