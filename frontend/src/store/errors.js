const SET_ERRORS = 'errors/setErrors'

const setErrors = (response) => ({
    type: SET_ERRORS,
    payload: response.errors
})

export const storeErrors = (response) => dispatch => {
    dispatch(setErrors(response));
}

const initialState = JSON.parse(sessionStorage.getItem("errors")) || {}
  
const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;

    default:
      return state;
  }
};

export default errorsReducer;