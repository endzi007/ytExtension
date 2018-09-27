const initialState = [];

export default (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD_VIDEO":
      newState.push(action.payload);
      break;
    case 'REMOVE_VIDEO':
      newState.splice(action.payload, 1);
      break;
    default:
      break;
  } 
  return newState;
};
