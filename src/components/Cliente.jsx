import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
    const {nombre, empresa, email, telefono, id}=cliente
    const navigate= useNavigate();
  return (
      <tr className='border-b hover:bg-gray-300'>
          <td className='p-3 tex'>{nombre}</td>
          <td className='p-3'>
              <p className='text-center'> <span className='text-gray-800 uppercase font-bold '>email:</span>{" "}{email}</p>
              <p className='text-center' > <span className='text-gray-800 uppercase font-bold '>telf:</span>{" "}{telefono}</p>
          </td>
          <td className='p-3'>{empresa} </td>
          <td>

              <button
                  type='button'
                  className='bg-green-600 hover:bg-green-700 block w-full mb-1 text-white p-2 uppercase font-bold text-xs rounded-md'
                  onClick={()=>navigate(`/clientes/${id}`)}
             >Ver</button>

                <button
                    type='button'
                    className='bg-blue-600 hover:bg-blue-700 block w-full mb-1 text-white p-2 uppercase font-bold text-xs rounded-md'
                    onClick={()=>navigate(`/clientes/editar/${id}`)}
                >Editar</button>

                <button
                    type='button'
                    className='bg-red-600 hover:bg-red-700 block w-full text-white mb-2 p-2 uppercase font-bold text-xs rounded-md'
                    onClick={()=>handleEliminar(id)}
              >Eliminar</button>
          
          </td>
          


      </tr>
    
  )
}

export default Cliente