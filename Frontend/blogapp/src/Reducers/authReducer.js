export const authReducer=(state={userInfo:{}}, action)=>{

    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true };

      case "LOGIN_SUCESS":
        return { ...state, userInfo: action.payload, loading: false };

      case "LOGIN_FAILED":
        return { ...state, loading: false, error: action.payload };

      case "SIGNUP_REQUEST":
        return { ...state, loading: true };

      case "SIGNUP_SUCESS":
        return { ...state, userInfo: action.payload, loading: false };

      case "SIGNUP_FAILED":
        return { ...state, loading: false, error: action.payload };
      
      case "ERROR_REFRESH":
        return {...state, error:null}

      case "LOGOUT":
        return {userInfo:{}}
        
      default:
        return state;
    }

}