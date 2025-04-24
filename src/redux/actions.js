export const addAlert = (alerta) => ({
    type: "ADD_ALERT",
    payload: alerta,
});

export const updateAlertCount = (count) => ({
    type: "UPDATE_ALERT_COUNT",
    payload: count,
});

export const updateMensajeCount = (count) => ({
    type: "UPDATE_MENSAJES_COUNT",
    payload: count,
});