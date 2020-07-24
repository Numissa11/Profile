const authReducer = (state  = {}, action) => {
      switch (action.type) {
        case  "CREATE_SESSION":
          return { ...state, token:  action.token}
        default:
          return  state;
      }
    }
    
    export default authReducer;