import { ErrorMessage } from 'formik'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
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
    <>
          <h1 className='font-black text-4xl text-blue-900 uppercase'>Editar CLiente</h1>
          <p className='mt-3'>Utilice este Formulario para editar los datos del Cliente:</p>
        
        {cliente?.nombre ? (

          <Formulario
            cliente={cliente}
            cargando={cargando}
          
          />
          ): <Alerta>{'Cliente no válido, ID no existe'}</Alerta>}
    </>
  )
}

export default EditarCliente