import axios from 'axios'


export const authorizeUser=(tempLogin, history)=>async(dispatch)=>{

    try{

        dispatch({
          type: "LOGIN_REQUEST",
        });

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post("api/login", tempLogin, config);

        dispatch({
          type: "LOGIN_SUCESS",
          payload: data,
        });

        history.push("/");

        localStorage.setItem("userWithToken", JSON.stringify(data));

    }catch(error){
        dispatch({
          type: "LOGIN_FAILED",
          payload: error.response? error.response.data.detail : error.message
        });
    }
}



export const registerUser = (tempRegister, history) => async (dispatch) => {
  try {
    dispatch({
      type: "SIGNUP_REQUEST",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("api/register", tempRegister, config);

    dispatch({
      type: "SIGNUP_SUCESS",
      payload: data,
    });

    history.push("/");

    localStorage.setItem("userWithToken", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: "SIGNUP_FAILED",
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const refreshError=()=>(dispatch)=>{
  dispatch({
    type: "ERROR_REFRESH",
  });
}

// export const infoFromLocal=()=>async(dispatch)=>{
//           const userInfoFromLocal = await localStorage.getItem("userWithToken")
//             ? JSON.parse(localStorage.getItem("userWithToken"))
//             : {};

//             dispatch({
//               type: "USER_FROM_LOCAL_STORAGE",
//               payload: { userInfoFromLocal },
//             });
// }

export const logout =(history)=>async(dispatch)=>{

  localStorage.clear()
  history.push("/")

  dispatch({
    type: "LOGOUT"
  });

}