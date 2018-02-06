import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SHIP_LENGTHS } from '../constants';
import {
  ATTACK_SHIP,
  END_GAME,
  PLAYER_ONE_ATTACK,
  PLAYER_TWO_ATTACK,
  SET_IS_PLAYING,
  SELECT_SHIP,
  SET_ORIENTATION,
  SET_PLAYER_NAMES,
  SET_SHIP,
  START_NEW_GAME,
  TOGGLE_TURN,
  UPDATE_MESSAGE,
} from '../actionTypes';

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
    case SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload
      };
    case SELECT_SHIP:
      return {
        ...state,
        shipSelected: action.payload,
        shipLength: SHIP_LENGTHS[action.payload],
      };
    case SET_SHIP:
      return {
        ...state,
        [action.payload.player]: setShipsCoordinates(state[action.payload.player], action),
        shipSelected: '',
        shipLength: '',
      };
    default:
      return state;
  }
};

const setShipsCoordinates = (state, action) => {
  switch (action.type) {
    case SET_SHIP:
      return {...state, [action.payload.coordinates]: action.payload.shipName};
    default:
      return state;
  }
};

const gameReducer = (state = {
  gameOver: false,
  isPlaying: true,
  message: '',
  playerOneName: '',
  playerOne: [],
  playerTwoName: '',
  playerTwo: [],
  playerTurn: 'playerOne',
}, action) => {
  switch (action.type) {
    case END_GAME:
      return {
        ...state,
        gameOver: true,
        winner: action.payload
      };
    case PLAYER_ONE_ATTACK:
      return {
        ...state,
        playerOne: [
          ...state.playerOne,
          action.payload
        ]
      };
    case PLAYER_TWO_ATTACK:
      return {
        ...state,
        playerTwo: [
          ...state.playerTwo,
          action.payload
        ]
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload
      };
    case SET_PLAYER_NAMES:
      return {
        ...state,
        playerOneName: action.payload.playerOne,
        playerTwoName: action.payload.playerTwo
      };
    case START_NEW_GAME:
      return {
        ...state,
      }
    case TOGGLE_TURN:
      return {
        ...state,
        message: '',
        playerTurn: action.payload,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

const shipsReducer = (state = {
  playerOne: {
    'Aircraft Carrier': 5,
    'Battleship': 4,
    'Destroyer': 3,
    'Submarine': 3,
    'Patrol Boat': 2,
  },
  playerTwo: {
    'Aircraft Carrier': 5,
    'Battleship': 4,
    'Destroyer': 3,
    'Submarine': 3,
    'Patrol Boat': 2,
  },
}, action) => {
  switch (action.type) {
    case ATTACK_SHIP:
      return {
        ...state,
        [action.payload.enemy]: updateEnemyShip(state[action.payload.enemy], action)
      };
    default:
      return state;
  }
};

const updateEnemyShip = (state, action) => {
  switch (action.type) {
    case ATTACK_SHIP:
      return {
        ...state,
        [action.payload.enemyShip]: state[action.payload.enemyShip] -= 1
      };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
  ships: shipsReducer,
  router: routerReducer,
});

// Passing undefined to the appReducer resets the
// state for each reducer and resets the game.
export const rootReducer = (state, action) => {
  if (action.type === START_NEW_GAME) {
    state = undefined;
  };

  return appReducer(state, action);
}
