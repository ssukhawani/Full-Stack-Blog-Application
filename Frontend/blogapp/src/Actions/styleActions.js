export const toggleNavbar=(val)=>(dispatch)=>{
    dispatch({ type: "NAVBAR_TOGGLE" , payload:val});
}
