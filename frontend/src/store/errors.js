const SET_ERRORS = 'errors/setErrors'

const setErrors = (payload) => ({
    type: SET_ERRORS,
    payload
})

export const storeErrors = (errors) => dispatch => {
    dispatch(setErrors(errors));
}

const initialState = JSON.parse(sessionStorage.getItem("errors"))  || {}
  
const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload.errors;

    default:
      return state;
  }
};

export default errorsReducer;