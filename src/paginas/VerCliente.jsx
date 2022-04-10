import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'

const VerCliente = () => {
    const [cliente, setCliente] = useState ({})
    const [cargando, setCargando] = useState (true)
   const {id} = useParams();

   useEffect(() => {

        const  obtenerClienteAPI = async ()=>{
            try {
                const url = `http://localhost:4001/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente (resultado)
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                setCargando(!cargando) 
            }, 500);
        }
        obtenerClienteAPI();
   }, [ ])
   

  return (
    cargando ? <Spinner/>: 
        Object.keys(cliente).length === 0 ? 
        <p>No hay Resultados</p> : (
        
            <div>
                
                
                        <h1 className='font-black text-4xl text-blue-900 capitalice '>Ver Cliente: {cliente.nombre}</h1>
                        <p className='mt-3'>Información cliente:</p>

                            {/* <p className=' text-2xl text-gray-500 mb-3 mt-10'> 
                                <span className=' text-gray-700 uppercase font-bold '>Cliente: </span> 
                                {cliente.nombre}
                            </p> */}
                        {cliente.empresa && (<p className=' text-2xl text-gray-500 mb-3 mt-10'>
                            <span className=' text-gray-700 uppercase font-bold '>Empresa: </span>
                            {cliente.empresa}
                        </p>)}
                            
                        {cliente.email && (<p className=' text-2xl text-gray-500 mb-3'>
                            <span className=' text-gray-700 uppercase font-bold '>Email: </span>
                            {cliente.email}
                        </p>)}
                        

                        {cliente.telefono && (<p className=' text-2xl text-gray-500 mb-3'>
                            <span className=' text-gray-700 uppercase font-bold '>Teléfono: </span>
                            {cliente.telefono}
                        </p>)}
                        

                        {cliente.notas && (<p className=' text-2xl text-gray-500'>
                            <span className=' text-gray-700 uppercase font-bold '>Observaciones: </span>
                            {cliente.notas}
                        </p>)}
                    
                
            </div>
          )
    
)}
 

export default VerCliente