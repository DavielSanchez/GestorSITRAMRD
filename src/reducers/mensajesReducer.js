const initialState = {
    list: [],
    noLeidos: 0,
};

const mensajesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_MENSAJE":
            return {
                ...state,
                list: [...state.list, action.payload],
                noLeidos: state.noLeidos + 1,
            };
        case "UPDATE_MENSAJES_COUNT":
            return {
                ...state,
                noLeidos: action.payload,
            };
        default:
            return state;
    }
};

export default mensajesReducer;