export const appConfig = (store)=>(next)=>(action)=>{
    console.log("appConfig", action);
    switch (action.type) {
        case "APP_CONFIG":
            action.type = action.payload.meta;
            action.payload = action.payload.payload;
            break;
        default:
            break;
    }
    next(action);
}