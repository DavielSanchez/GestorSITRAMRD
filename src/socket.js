import { io } from "socket.io-client";

// const socket = io(`${import.meta.env.VITE_API_LINK}`);
const socket = io(
    import.meta.env.VITE_API_LINK, {
        withCredentials: true,
        transports: ["websocket"],
    });

export default socket;