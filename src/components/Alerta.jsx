import React from 'react'

const Alerta = ({children}) => {
  return (
      <div className='text-center p-3 bg-red-600 text-white font-bold my-4 uppercase'>
          {children}
      </div>

  )
}

export default Alerta