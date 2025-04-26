import { createStore, combineReducers } from "redux";
import alertasReducer from "./reducers/alertasReducer";
import mensajesReducer from "./reducers/mensajesReducer"; // 👈 Asegúrate de importar este reducer

// Combina todos los reducers
const rootReducer = combineReducers({
    alertas: alertasReducer,
    mensajes: mensajesReducer, // 👈 Agrega el reducer de mensajes aquí
});

// Crea el store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;