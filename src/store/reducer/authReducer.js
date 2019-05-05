const initState = {
    authError: null
};


const authReducer = (state = initState, action) => {

    switch (action.type){

        case 'LOGIN_ERROR':
            console.log("Error Logging in!")
            return {
                ...state,
                authError: 'Unable to Login! '
            }

        case 'LOGIN_SUCCESS':
            console.log("Successfully Logged in!");
            return {
                ...state,
                authError: null
            }
        
        case 'SIGNOUT_SUCCESS' :
            console.log('Signed Out Successfully!!');
            return state;

        case 'SIGNOUT_ERROR' :
            console.log('SignOut Error!');
            return { 
                ...state,
                authError: 'Unable to Signout'
            }

        case 'SIGNUP_SUCCESS' :
            console.log("Signed Up Successfully!");
            return {
                ...state,
                authError: null
            }

        case 'SIGNUP_ERROR' :
            console.log("Error Signing Up!");
            return {
                ...state,
                authError: action.err.message
            }            

        default:
            return state
    }

}


export default authReducer;