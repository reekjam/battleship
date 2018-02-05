import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SHIP_LENGTHS } from '../constants';

const boardReducer = (state = {
  orientation: '',
  board: Array(10).fill(Array(10).fill("")),
  playerOne: {},
  playerTwo: {},
  selecting: true,
  shipSelected: '',
  shipLength: '',
}, action) => {
  switch (action.type) {
    case 'SET_ORIENTATION':
      return {
        ...state,
        orientation: action.payload
      };
    case 'SELECT_SHIP':
      return {
        ...state,
        shipSelected: action.payload,
        shipLength: SHIP_LENGTHS[action.payload],
      };
    case 'SET_SHIP':
      return {
        ...state,
        [action.payload.player]: playerShips(state[action.payload.player], action),
        shipSelected: '',
        shipLength: '',
      };
    default:
      return state;
  }
};

const playerShips = (state, action) => {
  switch (action.type) {
    case 'SET_SHIP':
      return {...state, [action.payload.shipName]: action.payload.coordinates};
    default:
      return state;
  }
};

const gameReducer = (state = {
  activeGame: false,
  message: '',
  playerOneName: '',
  playerOne: [],
  playerTwoName: '',
  playerTwo: [],
  playerTurn: 'playerOne',
}, action) => {
  switch (action.type) {
    case 'PLAYER_ONE_ATTACK':
      return {
        ...state,
        playerOne: [
          ...state.playerOne,
          action.payload
        ]
      };
    case 'PLAYER_TWO_ATTACK':
      return {
        ...state,
        playerTwo: [
          ...state.playerTwo,
          action.payload
        ]
      };
    case 'SET_PLAYER_NAMES':
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo,
      };
    case 'TOGGLE_TURN':
      return {
        ...state,
        message: '',
        playerTurn: action.payload,
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  board: boardReducer,
  game: gameReducer,
  router: routerReducer,
});
