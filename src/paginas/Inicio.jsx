import React from 'react'
import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'



const Inicio = () => {
  const [clientes, setClientes]=useState([])



  useEffect(() => {
    const obtenerClientesApi = async ()=>{
      try {
        const url ='http://localhost:4001/clientes'
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado)
 
      } catch (error) {
        console.log(error)
      }
    }

    obtenerClientesApi();
  }, [ ])
  
  const handleEliminar = async id =>{
    const confirmar = confirm('Está seguro de eliminar el cliente')
    if (confirmar){
    try {
      const url = `http://localhost:4001/clientes/${id}`
      const respuesta = await fetch (url, {
          method:'DELETE'
      })

        await respuesta.json();
        const arrayClientes = clientes.filter(cliente => cliente.id !== id);
        setClientes(arrayClientes)
    } catch (error) {
      console.log (error)
    }
  }}

  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900 uppercase'> CLiente</h1>
      <p className='mt-3'>Administra tus clientes</p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
          <thead className='bg-blue-800 text-white  '>
              <tr>
                <th className='p-2 '>Nombre</th>
                <th className='p-2 text-center'>Contacto</th>
                <th className='p-2 text-left '>Empresa</th>
                <th className='p-2'>Acciones</th>
              </tr>
          </thead>
          
          <tbody>
            {clientes.map(cliente=>(
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))}
          </tbody>

      </table>

    </div>
  )
}

export default Inicio