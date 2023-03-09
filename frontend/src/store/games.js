import csrfFetch from "./csrf.js";

const ADD_GAME = 'games/addGame';
const LIST_GAMES = 'games/listGames';
const SET_CURRENT_USER = 'session/setCurrentUser';



const addGame = (payload) => ({
  type: ADD_GAME,
  payload
});

const listGames = (payload) => ({
  type: LIST_GAMES,
  payload
});

export const fetchGame = (id) => async dispatch => {
    const response = await csrfFetch(`/api/games/${id}`);
    const data = await response.json();
    dispatch(addGame(data));
}

export const fetchGames = (options = {}) => async dispatch => {
  let response;
  let url = '/api/games?'

  if(options.date){
    url = url + `date=${options.date}`;
  }

  response = await csrfFetch(url);
  const data = await response.json();
  dispatch(listGames(data));
}


const initialState = JSON.parse(sessionStorage.getItem("games")) || {}
  
  const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_GAME:
        return {...state, [action.payload.game.id] : action.payload.game}

      case LIST_GAMES:
        return {...state, ...action.payload}

      case SET_CURRENT_USER:
          return { ...state, ...action.payload.games };
  
      default:
        return state;
    }
}

export default gamesReducer;