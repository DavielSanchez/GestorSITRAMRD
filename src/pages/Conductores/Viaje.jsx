import React from 'react'
import { useText, usePrimaryColors, usePrimaryColorsBG } from '../ColorClass'
import { jwtDecode } from 'jwt-decode'

function Viaje() {

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const theme = 'light'

    // const textColor = useText(theme)
    const textPrimaryColor = usePrimaryColors(theme)
    const bgColor = usePrimaryColorsBG(theme)

    const scanQr = () => {
        alert('Hello')
    }
  return (
    <>
    <div className="flex justify-center">
    <h1 className={`${textPrimaryColor} text-4xl font-bold`}>Validación de Boletos</h1>
    </div>
    <div className={`flex justify-center mt-10`}>
        <div onClick={scanQr} className={`flex justify-center items-center bg-[#9a94f3] rounded-2xl h-100 w-100 hover:bg-[#6a62dc] cursor-pointer hover:h-110 hover:w-110 transition-all duration-300`}>
            <img src="../../src/assets/qrexample.png" alt="" className='h-60 w-60' />
        </div>
    </div>
    </>
  )
}

export default Viaje