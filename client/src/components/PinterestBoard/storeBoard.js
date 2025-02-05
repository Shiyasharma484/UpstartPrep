import { headers } from '../../helpers/variables';
import { get_api_request, post_api_request, api_url } from '../../helpers/Common';
import { combineReducers, createStore } from 'redux';
import throttle from 'lodash.throttle';
import seedBoard from './seedBoard';

async function GetAllBoards() {
  const url = api_url.get_board_all;
  const response = await get_api_request(url, headers);
  if (response.status == 200) {
    const boardsdata = response?.data?.responsedata;
    storeBoard.dispatch({
      type: 'CLEAR_LIST',
      payload: {},
    });
    boardsdata.map((boardslist, index) =>
      storeBoard.dispatch({
        type: 'ADD_LIST',
        payload: { listId: boardslist.id + '_b', listTitle: boardslist.name },
      }),
    );
  } else {
    console.log('error');
  }
}
GetAllBoards();
GetAllPins();
var image_path = '150x150';
async function GetAllPins() {
  const url = api_url.get_pinall;
  const response = await get_api_request(url, headers);

  if (response.status == 200) {
    const pinsdata = response?.data?.responsedata;

    pinsdata.map((pinslist, index) =>
      storeBoard.dispatch({
        type: 'ADD_CARD',
        payload: {
          listId: pinslist.board_id + '_b',
          cardId: pinslist.id + '_p',
          cardText: pinslist.title,
          cardImage: pinslist?.media?.images[image_path].url,
        },
      }),
    );
  } else {
    console.log('error');
  }
}

const pinterest_board = (state = { plists: [] }, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const { listId } = action.payload;
      return { plists: [...state.plists, listId] };
    }
    case 'MOVE_LIST': {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.plists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { plists: newLists };
    }
    case 'DELETE_LIST': {
      const { listId } = action.payload;
      const filterDeleted = tmpListId => tmpListId !== listId;
      const newLists = state.plists.filter(filterDeleted);
      return { plists: newLists };
    }
    case 'CLEAR_LIST': {
      return { plists: [] };
    }
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    }
    case 'CHANGE_LIST_TITLE': {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    }
    case 'DELETE_LIST': {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case 'CLEAR_LIST': {
      const { listId } = action.payload;
      const {} = state;
      return state;
    }
    case 'ADD_CARD': {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    }
    case 'MOVE_CARD': {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }
    case 'DELETE_CARD': {
      const { cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = cardId => cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(filterDeleted),
        },
      };
    }
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { cardText, cardId, cardImage } = action.payload;
      return { ...state, [cardId]: { text: cardText, _id: cardId, Image: cardImage } };
    }
    case 'CHANGE_CARD_TEXT': {
      const { cardText, cardId } = action.payload;
      return { ...state, [cardId]: { ...state[cardId], text: cardText } };
    }
    case 'DELETE_CARD': {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it
    case 'DELETE_LIST': {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter(cardId => !cardIds.includes(cardId))
        .reduce((newState, cardId) => ({ ...newState, [cardId]: state[cardId] }), {});
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  pinterest_board,
  listsById,
  cardsById,
});

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const storeBoard = createStore(reducers, persistedState);

storeBoard.subscribe(
  throttle(() => {
    saveState(storeBoard.getState());
  }, 1000),
);

console.log(storeBoard.getState());
if (!storeBoard.getState().pinterest_board.plists.length) {
  console.log('SEED');
  seedBoard(storeBoard);
}

export default storeBoard;
