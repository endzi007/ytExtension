const initialState = [];

export default (state = initialState, action) => {
  let newState = [...state];
  console.log("[reducer] video.js", action.payload);
  switch (action.type) {
    case "ADD_VIDEO":
      newState.push(action.payload);
      break;
    case 'REMOVE_VIDEO':
      newState.splice(newState.indexOf(action.payload), 1);
      break;
    default:
      break;
  } 
  return newState;
};
