import { createContext, useEffect, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
    currentUser: null, 
    status: "loading",
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
    }
}

export const CurrentUserProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Fetch the user data from the API (/me/profile)
    useEffect(() => {
        fetch("/api/me/profile")
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data)
            receiveProfileDataFromServer(data);
          });
      }, [])

    
    const receiveProfileDataFromServer = (data) => {
        dispatch({
            type: "receive-profile-data-from-server", 
            ...data,
        })
    }
    
    return (
        <CurrentUserContext.Provider value={{ state, 
                                            actions: {receiveProfileDataFromServer}}}>
            {children}
        </CurrentUserContext.Provider>
    );
};