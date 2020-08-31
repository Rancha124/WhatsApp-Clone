export const initialState = {
    user : null,
    loginStatus: false,
}

export const actionTypes = {
    SET_USER : "SET_USER",
    log_out: "LOG_OUT"
};

const reducer = (state, action) => {
    //console.log("reducer",action);
switch (action.type){
    case actionTypes.SET_USER :
        return {
            ...state,
            user: action.user,
            loginStatus: action.loginStatus,
        };
     case actionTypes.log_out :
        return {
            ...state,
            user: action.user,
            loginStatus: action.loginStatus,
        };
    default : 
        return state
 }
};

export default reducer;