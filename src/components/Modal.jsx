import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useBG, useBGForButtons, useText } from "../ColorClass";


export const Modal = ({ Title, isOpen, onClose, children, onAction, ButtonText }) => {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const theme = decodedToken.theme
    const bgColor = useBG(theme)
    const ButtonColor = useBGForButtons(theme)
    const textColor = useText(theme)

    if (!isOpen) return null;
    return (

        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className={`${bgColor} w-1/3 h-1/2  p-12 rounded-lg relative`} >
                <p className={`text-center ${textColor} font-semibold text-3xl`}>{Title}</p>
                {/*El children se usara para crear los imputs*/}
                {children}
                <div className='md:flex justify-center items-center gap-7'>
                    <button onClick={onAction}> <p className={`w-full ${ButtonColor} text-white px-12 py-4 rounded-xl  mt-8 font-semibold`}>{ButtonText}</p> </button>
                    <button onClick={onClose}><p className='w-full rounded-xl text-white bg-[#ff5353]  px-12 py-4 mt-8 font-semibold'>Cerrar</p></button>
                </div>
            </div>
        </div>
    );
};

