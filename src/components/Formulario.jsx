import React from 'react'
import { Formik, Form, Field, isEmptyArray } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import { useNavigate, useNavigationType } from 'react-router-dom'
import Spinner from './Spinner'


const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate();
    //CREACION DEL ESQUEMA
    const NuevoClienteSchema= Yup.object().shape({
        nombre: Yup.string()
                   .min(3, 'El nombre es muy corto')
                   .max(30, 'El nombre es muy largo')
                   .required('El nombre del cliente es obligatorio'),

        empresa: Yup.string()
                    .required('el nombre de la empresa es obligatorio'),

         email: Yup.string()
                    .email('email no válido')
                    .required('el email es obligatorio'),

         telefono: Yup.number().typeError('No es un número válido')
                      .integer('No es un número válido')
                      .positive('No es un número válido'),
   
    })

    const handleSubmit = async (valores)=>{
         try {
             let respuesta
             if (cliente.id){
                 //editando un cliente
                 const url = `http://localhost:4001/clientes/${cliente.id}`;
                 respuesta = await fetch(url, {
                 method:'PUT',
                 body: JSON.stringify(valores),
                 headers:{'Content-Type':'application/json'}
             })}
             
             else{
                //registrando un cliente nuevo
                 const url = "http://localhost:4001/clientes";
                 respuesta = await fetch(url, {
                 method:'POST',
                 body: JSON.stringify(valores),
                 headers:{'Content-Type':'application/json'}
             })}

                const resultado = await respuesta.json();
                navigate('/clientes')
         } 
         catch (e) {
             console.log(e)
         }
    }

  return (

    cargando ? <Spinner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-400 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }</h1>

        <Formik
        initialValues={{
            nombre: cliente?.nombre ?? "", //es un ternario
            empresa: cliente?.empresa ?? "",
            email:cliente?.email ?? "",
            telefono:cliente?.telefono ?? "",
            notas:cliente?.notas ?? ""

        }}
        enableReinitialize={true} //tomar valores de una base de datos, prop de formik,envia la info a pantalla
        onSubmit={async (values, {resetForm})=>{
            await handleSubmit(values);
            resetForm();
          
        }}
        validationSchema={NuevoClienteSchema}
        >
            {({errors , touched})=> {
               
            return(

            <Form className='mt-10'>
                <div className='mb-4'>
                    <label className="text-gray-800"
                            htmlFor='nombre' >
                        Nombre: 
                    </label>
                    <Field
                    id='nombre'
                    type="text"
                    placeholder="Nombre del Cliente"
                    className='mt-2 block w-full p-3 bg-gray-50'
                    name="nombre"
                    />
                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ):null}
                </div>

                  <div className='mb-4'>
                      <label className="text-gray-800"
                          htmlFor='empresa' >
                          Empresa:
                      </label>
                      <Field
                          id='empresa'
                          type="text"
                          name="empresa"
                          placeholder="Empresa del Cliente"
                          className='mt-2 block w-full p-3 bg-gray-50'
                      />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null}
                  </div>

                  <div className='mb-4'>
                      <label className="text-gray-800"
                          htmlFor='email' >
                          Email:
                      </label>
                      <Field
                          id='email'
                          type="text"
                          name="email"
                          placeholder="Email del Cliente"
                          className='mt-2 block w-full p-3 bg-gray-50'
                      />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null}
                  </div>

                  <div className='mb-4'>
                      <label className="text-gray-800"
                          htmlFor='telefono' >
                          Teléfono:
                      </label>
                      <Field
                          id='telefono'
                          name="telefono"
                          type="tel"
                          placeholder="Teléfono del Cliente"
                          className='mt-2 block w-full p-3 bg-gray-50'
                      />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null}
                  </div>

                  <div className='mb-4'>
                      <label className="text-gray-800"
                          htmlFor='notas' >
                          Notas:
                      </label>
                      <Field
                          as='textarea'
                          id='notas'
                          type="text"
                          name="notas"
                          placeholder="Notas del Cliente"
                          className='mt-2 block w-full p-3 bg-gray-50 h-40'
                      />
                  </div>

                  <input 
                  className='bg-blue-800 p-3 rounded-md hover:bg-blue-600 cursor-pointer mt-5 w-full text-white uppercase font-bold text-lg'
                  type="submit" 
                  value={cliente.nombre ? 'Guardar Cambios' : 'Agregar Cliente'}/>
                  </Form>
              )}}
        </Formik>
    </div> )
  )

}
//en el caso de que se pida el form en nuevo cliente esta propiedad
//es igual a mandar en el props de nuevo cliente un objeto vacío
Formulario.defaultProps={
    cliente:{ },
    cargando:false
}

export default Formulario