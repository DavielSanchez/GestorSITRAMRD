const initialState = {
    list: [],
    noLeidas: 0,
};

const alertasReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ALERT":
            return {
                ...state,
                list: [...state.list, action.payload],
                noLeidas: state.noLeidas + 1,
            };

        case "UPDATE_ALERT_COUNT":
            return {
                ...state,
                noLeidas: action.payload,
            };

        default:
            return state;
    }
};

export default alertasReducer;