const authReducer = (state = {}, action) => {
  console.log("USER SIGNED IN: ", action)
  switch (action.type) {
    case "CREATE_SESSION":
      return { ...state, token: action.token, user: action.user}
    default:
      return state;
  }
}

export default authReducer;