import csrfFetch from "./csrf.js";

const ADD_TEAM = 'teams/addTeam';
const LIST_TEAMS = 'teams/listTeams';
const SET_CURRENT_USER = 'session/setCurrentUser';


export const addTeam = (payload) => ({
  type: ADD_TEAM,
  payload
});

const listTeams = (payload) => ({
  type: LIST_TEAMS,
  payload
});

export const fetchTeam = (id) => async dispatch => {
    const response = await csrfFetch(`/api/teams/${id}`);
    const data = await response.json();
    dispatch(addTeam(data));
}
export const requestAdd = (teamId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/requestAdd`, {
      method: 'PATCH',
      body: JSON.stringify({userId, teamId})
    });
    const data = await response.json();
    dispatch(addTeam(data));
}

export const requestRemove = ({teamId, userId}) => async dispatch => {
  const response = await csrfFetch(`/api/requestRemove`, {
      method: 'PATCH',
      body: JSON.stringify({userId, teamId})
    });
    const data = await response.json();
    dispatch(addTeam(data));
}


export const fetchTeams = (options = {}) => async dispatch => {
  let response;
  let url = '/api/teams?'

  response = await csrfFetch(url);
  const data = await response.json();
  dispatch(listTeams(data));
}


const initialState = JSON.parse(sessionStorage.getItem("teams")) || {}
  
  const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TEAM:
        return {...state, [action.payload.team.id] : action.payload.team }

      case LIST_TEAMS:
        return {...state, ...action.payload}

      case SET_CURRENT_USER:
        return { ...state, ...action.payload.teams };

      default:
        return state;
    }
}

export default teamsReducer;