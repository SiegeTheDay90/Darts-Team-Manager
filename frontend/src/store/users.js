import csrfFetch from "./csrf.js";
import { storeErrors } from "./errors.js";
import { setCurrentUser } from "./session.js";
import { addTeam } from "./teams.js";


const ADD_USER = 'users/add'
const LIST_USERS = 'users/list'
const SET_CURRENT_USER = 'session/setCurrentUser';



const addUser = (user) => ({
    type: ADD_USER,
    user
})

const listUsers = (users) => {
    return {
        type: LIST_USERS,
        users
    }
}

export const fetchUser = (id) => async dispatch => {
    await csrfFetch(`/api/users/${id}`
    ).then( async response => {
        const user = await response.json();
        dispatch(addUser(user));
    }).catch(async response => { 
        const errors = await response.json();
        dispatch(storeErrors(errors))
    })
}

export const fetchUsers = (list = null) => async dispatch => {
    let params = new URLSearchParams();
    if(list){
        params.set("users", JSON.stringify(list))
    }
    
    const response = await csrfFetch(`/api/users?`+params);
    const users = await response.json();
    dispatch(listUsers(users));
}

export const updateUser = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`,{
        method: "PATCH",
        body: JSON.stringify({...user})
    });
    const data = await response.json();
    dispatch(setCurrentUser(data));
}


export const addToTeam = (userId, teamId) => async dispatch => {
    const response = await csrfFetch(`/api/memberAdd`,{
        method: "PATCH",
        body: JSON.stringify({teamId, userId})
    });
    const data = await response.json();
    dispatch(addUser(data.user));
    dispatch(addTeam(data));
}

const initialState = JSON.parse(sessionStorage.getItem("users")) || {}
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {...state, [action.user.id] : action.user}

        case LIST_USERS:
            return {...state, ...action.users}

        case SET_CURRENT_USER:
            return {...state, ...action.payload.users};
        
  
        default:
            return state;
    }
  };

  export default usersReducer;