const initialState = "off";

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case 'SELECT_MODE':
      newState = action.payload;
      break;
    default:
      return newState;
  } 

  return newState;
};
