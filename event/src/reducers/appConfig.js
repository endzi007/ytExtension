const initialState = {
  selectionMode: "neutral",
  downloadMode: "mp3"
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'SELECT_MODE':
      newState.selectionMode = action.payload;
      break;
    case 'DOWNLOAD_MODE':
      newState.downloadMode = action.payload;
      break; 
    default:
      return newState;
  } 

  return newState;
};
