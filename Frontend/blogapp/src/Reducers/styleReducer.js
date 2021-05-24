export const styleReducer = (state = {toggleNavbar:false}, action) =>{
    switch(action.type){
        case "NAVBAR_TOGGLE":
            return{...state, toggleNavbar:action.payload}
        
        default :
            return state
    }

}