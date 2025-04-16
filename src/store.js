import { createStore } from "redux";
import { combineReducers } from "redux";
import alertasReducer from "./reducers/alertasReducer"; // Reducer para alertas

// Combina todos los reducers
const rootReducer = combineReducers({
    alertas: alertasReducer,
});

// Crea el store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Habilitar Redux DevTools (opcional)
);

export default store;