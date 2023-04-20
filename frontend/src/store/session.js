import csrfFetch from "./csrf.js";
import { storeCSRF } from "./csrf.js";
import { storeErrors } from "./errors.js";


const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';


const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});


export const resetPassword = ({credential, password}) => async dispatch => {
  await csrfFetch("/api/reset", {
    method: "PATCH",
    body: JSON.stringify({credential, password})
  }).then(async response => {
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data));
  }).catch(async error => {
    const data = await error.json();
    dispatch(storeErrors(data));
  });
}
export const requestResetPassword = ({credential}) => async dispatch => {
  await csrfFetch("/api/reset", {
    method: "POST",
    body: JSON.stringify({credential})
  }).catch(async error => {
    const data = await error.json();
    dispatch(storeErrors(data));
  });
}

const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }
  else {
    sessionStorage.removeItem("currentUser");
}}

export const login = ({ credential, password }) => async dispatch => {
  await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  
  }).then(async response => {
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data));
  }).catch(async error => {
    const data = await error.json();
    dispatch(storeErrors(data));
  });
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  await storeCSRF(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data));
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })

  }).then(async response => {
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data))

  }).catch(async error => {
    const data = await error.json();
    dispatch(storeErrors(data));
  });

};

export const logout = () => async (dispatch) => {
  await csrfFetch("/api/session", {
    method: "DELETE"
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { user: action.payload.user };

    case REMOVE_CURRENT_USER:
      return { user: null };


    default:
      return state;
  }
};

export default sessionReducer;