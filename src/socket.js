import { io } from "socket.io-client";

// const socket = io(`${import.meta.env.VITE_API_LINK}`);
const socket = io(
    import.meta.env.VITE_API_LINK, {
        withCredentials: true,
        transports: ["websocket"], // Opcional: fuerza WebSocket si polling da problemas
    });

export default socket;